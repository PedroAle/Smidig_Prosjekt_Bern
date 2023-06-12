from flask import Flask, render_template, request, session, redirect
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'

def initialize_database():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 email TEXT NOT NULL,
                 password TEXT NOT NULL)''')
    c.execute("SELECT count(*) FROM users")
    count = c.fetchone()[0]
    if count == 0:
        c.execute("INSERT INTO users (email, password) VALUES (?, ?)", ('admin@example.com', 'admin123'))
        c.execute("INSERT INTO users (email, password) VALUES (?, ?)", ('user1@example.com', 'user123'))
        c.execute("INSERT INTO users (email, password) VALUES (?, ?)", ('user2@example.com', 'user456'))
    conn.commit()
    conn.close()

initialize_database()

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    email = request.form['email']
    password = request.form['password']

    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    c.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
    user = c.fetchone()

    if user:
        session['email'] = user[1]  # Store the email in the session
        conn.close()
        return redirect('/dashboard')
    else:
        conn.close()
        return render_template('login.html', error='Invalid email or password.')


@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'email' in session:
        if request.method == 'POST':
            new_email = request.form['new_email']
            new_password = request.form['new_password']

            conn = sqlite3.connect('database.db')
            c = conn.cursor()

            c.execute("SELECT * FROM users WHERE email = ?", (new_email,))
            existing_user = c.fetchone()

            if existing_user:
                conn.close()
                return render_template('dashboard.html', username=session['email'], show_register=True, error='Email already exists.')

            c.execute("INSERT INTO users (email, password) VALUES (?, ?)", (new_email, new_password))
            conn.commit()
            conn.close()

            session['email'] = new_email  # Update the session email to the newly registered email

            return redirect('/dashboard')

        return render_template('dashboard.html', username=session['email'], show_register=True)
    else:
        return redirect('/')

@app.route('/logout')
def logout():
    session.pop('email', None)
    return redirect('/')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        new_email = request.form['new_email']
        new_password = request.form['new_password']

        conn = sqlite3.connect('database.db')
        c = conn.cursor()

        c.execute("SELECT * FROM users WHERE email = ?", (new_email,))
        existing_user = c.fetchone()

        if existing_user:
            conn.close()
            return render_template('dashboard.html', username=session['email'], show_register=True, error='Email already exists.')

        c.execute("INSERT INTO users (email, password) VALUES (?, ?)", (new_email, new_password))
        conn.commit()
        conn.close()

        session['email'] = new_email  # Update the session email to the newly registered email

        return redirect('/dashboard')

    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
