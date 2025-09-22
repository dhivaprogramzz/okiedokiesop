# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# from textblob import TextBlob
# from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer



# app = Flask(__name__)
# #CORS(app)
 
# CORS(app, resources={r"/*": {"origins": "*"}})

# # ---- SQLite config ----
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mood.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# # ---- Database models ----
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(50), unique=True, nullable=False)
#     password = db.Column(db.String(50), nullable=False)

# class Mood(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(50), db.ForeignKey('user.username'), nullable=False)
#     mood = db.Column(db.String(50), nullable=False)
#     timestamp = db.Column(db.DateTime, default=datetime.utcnow)  # stores date+time

# # Create tables
# with app.app_context():
#     db.create_all()

# analyzer = SentimentIntensityAnalyzer()


# # ---- Routes ----

# import requests

# @app.route('/daily_quote', methods=['GET'])
# def daily_quote():
#     try:
#         # Use ZenQuotes instead of Quotable
#         response = requests.get("https://zenquotes.io/api/random", timeout=5)
#         if response.status_code == 200:
#             data = response.json()[0]  # ZenQuotes returns a list
#             return jsonify({"content": data["q"], "author": data["a"]})
#         else:
#             return jsonify({"content": "Failed to fetch quote", "author": ""}), 500
#     except Exception as e:
#         return jsonify({"content": "Error fetching quote", "author": str(e)}), 500



# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     username = data.get("username")
#     password = data.get("password")

#     if User.query.filter_by(username=username).first():
#         return jsonify({"success": False, "message": "Username already exists"}), 400

#     user = User(username=username, password=password)
#     db.session.add(user)
#     db.session.commit()
#     return jsonify({"success": True, "message": "Signup successful!"})

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data.get("username")
#     password = data.get("password")
#     user = User.query.filter_by(username=username, password=password).first()
#     if user:
#         return jsonify({"success": True, "message": "Login successful!"})
#     else:
#         return jsonify({"success": False, "message": "Invalid username or password"}), 401

# @app.route('/submit_mood', methods=['POST'])
# def submit_mood():
#     data = request.get_json()
#     username = data.get("username")
#     mood_text = data.get("mood")

#     # make sure user exists
#     if not User.query.filter_by(username=username).first():
#         return jsonify({"success": False, "message": "User not found"}), 404

#     mood_entry = Mood(username=username, mood=mood_text)
#     db.session.add(mood_entry)
#     db.session.commit()
#     return jsonify({"success": True})

# @app.route('/mood_history/<username>', methods=['GET'])
# def get_mood_history(username):
#     moods = Mood.query.filter_by(username=username).order_by(Mood.timestamp).all()
#     history = [{"datetime": m.timestamp.strftime("%Y-%m-%d %H:%M"), "mood": m.mood} for m in moods]
#     return jsonify({"history": history})

# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.get_json()
#     message = data.get("message")

#     # 1. Detect sentiment
#     vs = analyzer.polarity_scores(message)
#     compound = vs['compound']

#     # 2. Determine emotion
#     if compound >= 0.5:
#         emotion = "happy"
#         reply = "That's great to hear! Keep up the positive vibes! 😄"
#     elif compound <= -0.5:
#         emotion = "sad"
#         reply = "I'm sorry you're feeling down. Want to talk about it? 💛"
#     else:
#         emotion = "neutral"
#         reply = "I see. Can you tell me a bit more about how you feel? 🤔"

#     # 3. Optionally, store mood in DB
#     username = data.get("username")
#     if username and User.query.filter_by(username=username).first():
#         mood_entry = Mood(username=username, mood=emotion)
#         db.session.add(mood_entry)
#         db.session.commit()

#     return jsonify({"reply": reply, "emotion": emotion})


# if __name__ == "__main__":
#     app.run(debug=True)





# # the main purpose of this ai chatbot is to understand the emotions and then reply according to that 
# # AI Chat Support
# # user: hello
# # bot: Hi there! How are you?
# # user: hi bro
# # bot: Sorry, I don't understand that yet.
# # user: im feeling happy
# # bot: Sorry, I don't understand that yet.
# # Type here...
# # Send







from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random

# Hugging Face transformer for emotion detection
from transformers import pipeline

# ---- Flask app setup ----
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# ---- SQLite config ----
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mood.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# ---- Database models ----
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), db.ForeignKey('user.username'), nullable=False)
    mood = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Create tables
with app.app_context():
    db.create_all()

# ---- Hugging Face pipeline ----
emotion_analyzer = pipeline(
    "text-classification", 
    model="nateraw/bert-base-uncased-emotion", 
    return_all_scores=True
)

# ---- Conversation memory ----
user_context = {}  # stores previous messages per user

# ---- Keyword-based emotions ----
emotion_keywords = {
    "happy": ["happy", "glad", "good", "excited", "joy", "fun"],
    "sad": ["sad", "down", "depressed", "unhappy", "cry", "lonely"],
    "angry": ["angry", "mad", "frustrated", "annoyed"],
    "bored": ["bored", "tired", "meh", "dull"],
    "anxious": ["anxious", "nervous", "worried", "stressed"],
    "love": ["love", "affection", "care", "liked"]
}

def detect_emotion_keywords(message):
    message_lower = message.lower()
    for emotion, keywords in emotion_keywords.items():
        if any(word in message_lower for word in keywords):
            return emotion
    return None

def detect_emotion_hf(message):
    try:
        results = emotion_analyzer(message)[0]  # returns list of dicts with score
        # pick emotion with highest score
        best = max(results, key=lambda x: x['score'])
        return best['label'].lower()
    except:
        return None

# ---- Routes ----
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"success": False, "message": "Username already exists"}), 400

    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"success": True, "message": "Signup successful!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username, password=password).first()
    if user:
        return jsonify({"success": True, "message": "Login successful!"})
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

@app.route('/submit_mood', methods=['POST'])
def submit_mood():
    data = request.get_json()
    username = data.get("username")
    mood_text = data.get("mood")

    if not User.query.filter_by(username=username).first():
        return jsonify({"success": False, "message": "User not found"}), 404

    mood_entry = Mood(username=username, mood=mood_text)
    db.session.add(mood_entry)
    db.session.commit()
    return jsonify({"success": True})

@app.route('/mood_history/<username>', methods=['GET'])
def get_mood_history(username):
    moods = Mood.query.filter_by(username=username).order_by(Mood.timestamp).all()
    history = [{"datetime": m.timestamp.strftime("%Y-%m-%d %H:%M"), "mood": m.mood} for m in moods]
    return jsonify({"history": history})

# ---- Chatbot ----
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get("message")
    username = data.get("username")

    if username not in user_context:
        user_context[username] = []

    # store message in context
    user_context[username].append(message)

    # --- Detect emotion ---
    emotion = detect_emotion_keywords(message)  # first try keywords
    if not emotion:
        emotion = detect_emotion_hf(message)     # fallback to Hugging Face model
    if not emotion:
        emotion = "neutral"

    # --- Generate empathetic reply ---
    replies = {
        "happy": [
            "That's wonderful! 😊 What made you feel happy today?",
            "Glad to hear you're in a good mood 😄",
            "Happy vibes are contagious 🌟 Keep it up!"
        ],
        "sad": [
            "I'm really sorry you're feeling sad 💙 Want to share more?",
            "It’s okay to feel low sometimes. I’m here if you want to talk 💛",
            "That must be tough 😔. Do you want to talk it out?"
        ],
        "angry": [
            "I can sense your frustration 😠. Want to vent?",
            "It's normal to feel angry sometimes. Want to tell me what happened?",
            "Anger can be overwhelming 💢. Talking might help."
        ],
        "bored": [
            "Boring days can feel endless 😌. Want me to suggest something fun?",
            "I get it, boredom hits hard sometimes 😅",
            "Maybe trying something new could help break the boredom 🤔"
        ],
        "anxious": [
            "I hear you. Anxiety can be really tough 😟",
            "That sounds stressful 💜. Do you want to share what’s worrying you?",
            "It’s okay to feel anxious 🌿. Let’s take it one step at a time."
        ],
        "love": [
            "Aww, that’s sweet 💖 Love is beautiful!",
            "Love makes life so much brighter 🥰",
            "That’s heartwarming 💕 Want to tell me more?"
        ],
        "neutral": [
            "I see. Can you tell me a bit more about how you feel? 🤔",
            "Got it 👍. Want to share more?",
            "I’m listening 👂. Tell me more about your feelings."
        ]
    }
    reply = random.choice(replies.get(emotion, ["I see. Can you tell me a bit more about how you feel? 🤔"]))


    # store mood in DB
    if User.query.filter_by(username=username).first():
        mood_entry = Mood(username=username, mood=emotion)
        db.session.add(mood_entry)
        db.session.commit()

    return jsonify({"reply": reply, "emotion": emotion})

# ---- Main ----
if __name__ == "__main__":
    app.run(debug=True)
