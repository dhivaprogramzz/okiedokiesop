from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

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

with app.app_context():
    db.create_all()

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
    return jsonify({"success": False, "message": "Invalid username or password"}), 401

@app.route('/submit_mood', methods=['POST'])
def submit_mood():
    data = request.get_json()
    username = data.get("username")
    mood_text = data.get("mood").strip().lower()
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

if __name__ == "__main__":
    app.run(debug=True)
