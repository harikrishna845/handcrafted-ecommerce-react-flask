from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_NAME = "database.db"

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT,
            items TEXT,
            address TEXT,
            total_price REAL,
            payment_mode TEXT,
            order_status TEXT,
            created_at TEXT
        )
    """)

    conn.commit()
    conn.close()

init_db()

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (name, email, password)
        )
        conn.commit()
        conn.close()
        return jsonify({"success": True})
    except:
        return jsonify({"success": False, "message": "Email exists"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email, password)
    )
    user = cur.fetchone()
    conn.close()

    if user:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

@app.route("/order", methods=["POST"])
def order():
    data = request.json

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO orders
        (user_email, items, address, total_price, payment_mode, order_status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("user_email"),
        json.dumps(data.get("items")),
        data.get("address"),
        data.get("total_price"),
        "COD",
        "Placed",
        datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ))
    conn.commit()
    conn.close()

    return jsonify({"success": True})
@app.route("/orders", methods=["GET"])
def get_orders():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM orders")
    rows = cur.fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])
@app.route("/profile/<email>", methods=["GET"])
@app.route("/profile/<email>", methods=["GET"])
def get_profile(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT name, email FROM users WHERE email=?",
        (email,)
    )
    user = cur.fetchone()
    conn.close()

    if user:
        return jsonify(dict(user))
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
