# Bertie’s Books – Web App

A simple Node.js and Express web application built in the **Dynamic Web Applications** lab to demonstrate connecting a website to a MySQL database, using EJS templates, bcrypt for password hashing, dotenv for secure credentials, and handling routes for dynamic data display.

---

## Overview

**Bertie’s Books** is a fictional online bookshop that:

- Connects to a **MySQL** database to store and retrieve data.
- Displays a full list of all available books.
- Lets users **add new books** to the database via a form.
- Provides a **search** feature to find books by title (exact and partial matches).
- Includes a **bargain books** page showing all books priced under £20.
- Allows users to **register** by submitting a username, name, email, and password.
- Hashes passwords securely using **bcrypt** before storing them in the database.
- Allows users to **log in**, comparing the supplied password with the stored hash.
- Handles users trying to register with usernames/passwords that already exist.

The application demonstrates full-stack integration - combining Node.js server logic, EJS views, SQL queries, form handling, bcrypt hashing, and secure environment variable management.

---

## Technologies Used

- **Node.js** with **Express**
- **MySQL** (via the `mysql2` library)
- **EJS** (Embedded JavaScript templates)
- **bcrypt** for password hashing
- **dotenv** for securing database credentials
- **HTML5 / CSS**
- **JavaScript**

---

## Installation & Running Locally

1. **Install dependencies**

   ```bash
   npm install express ejs mysql2 bcrypt dotenv
   ```

2. **Create .env file**
   ```
   DB_HOST=localhost
   DB_USER=berties_books_app
   DB_PASSWORD=yourpassword
   DB_NAME=berties_books
   ```
3. **Run the app**
   ```
   node index.js
   ```
4. **Open in browser**
   http://localhost:8000/

---

## dotenv

To avoid storing sensitive information directly in the source code, the application uses the dotenv module. This allows all database credentials to be stored in a separate .env file rather than inside index.js.

**How it was implemented:**

- Installed using npm install dotenv.
- .env file was created in the project root containing the database host, username, password, and database name.
- require('dotenv').config(); was added at the top of index.js to load environment variables.
- The MySQL connection pool was updated to use process.env.DB_HOST, process.env.DB_USER, etc.
- .env was added to .gitignore so credentials are never uploaded to GitHub.

## Audit Logging

To track login activity and improve security, an audit logging system was implemented. This records both successful and failed login attempts.

**How it was implemented:**

1. I created a new database table called `audit_log` containing:

   - `username` (the supplied email)
   - `success` (true or false)
   - `timestamp` (automatically recorded)

2. In the `/users/loggedin` login route, an INSERT query is executed after each login attempt:

   - On correct password → a record is saved with `success = true`.
   - On incorrect password or unknown user → a record is saved with `success = false`.

3. A new route `/users/audit` was added.  
   This selects all audit records and displays them in a simple table for review.

This feature makes it possible to view login behaviour, detect suspicious activity, and keep a basic audit trail of authentication events.

## Access the live site:

The application can be accessed at:
http://www.doc.gold.ac.uk/usr/325/
