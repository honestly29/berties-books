# Bertie’s Books – Web App

A simple Node.js and Express web application built in the **Dynamic Web Applications** lab to demonstrate connecting a website to a MySQL database, using EJS templates, and handling routes for dynamic data display.

---

## Overview

**Bertie’s Books** is a fictional online bookshop that:

- Connects to a **MySQL** database to store and retrieve book information.
- Displays a full list of all available books.
- Lets users **add new books** to the database via a form.
- Provides a **search** function to find books by title (both exact and partial matches).
- Includes a **bargain books** page showing all books priced under £20.

The application demonstrates full-stack integration — combining Node.js server logic, EJS views, and SQL queries to build a dynamic data-driven web application.

---

## Technologies Used

- **Node.js** with **Express**
- **MySQL** (via the `mysql2` library)
- **EJS** (Embedded JavaScript templates)
- **HTML5 / CSS**
- **JavaScript**

---

## Installation & Running Locally

1. **Install dependencies**
   ```bash
   npm install express ejs mysql2
   ```
2. **Run the app**
   ```
   node index.js
   ```
3. **Open in browser**
   http://localhost:8000/

---

## Access the live site:

The application can be accessed at:
http://www.doc.gold.ac.uk/usr/325/
