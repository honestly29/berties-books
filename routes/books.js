// Create a new router
const express = require("express")
const router = express.Router()


// Render search page
router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', (req, res, next) => {
    // get the search text from the form
    const search_text = (req.query.search_text || '').trim();
    // if user didn't type anything, display empty results page
    if (!search_text) return res.render('searchresults.ejs', { availableBooks: [], search_text });

    // sql query to all books where the name contains the search word
    const sqlSearchBooks = 'SELECT name, price FROM books WHERE name LIKE CONCAT("%", ?, "%")';
    db.query(sqlSearchBooks, [search_text], (err, result) => {
        if (err) return next(err);
        res.render('searchresults.ejs', { availableBooks: result, search_text });
  });
});



// List current books in the database
router.get('/list', function(req, res, next) {
    const sqlSelectAllBooks = "SELECT * FROM books"; // query database to get all the books
    // execute sql query
    db.query(sqlSelectAllBooks, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks:result});
        });
});



// Add books to the database
router.get('/addbook', function(req, res, next) {
    res.render('addbook.ejs');
})

router.post('/bookadded', function (req, res, next) {
    // saving data in database
    const sqlInsertBook = "INSERT INTO books (name, price) VALUES (?,?)"
    // execute sql query
    const newrecord = [req.body.name, req.body.price]
    db.query(sqlInsertBook, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(' This book is added to database, name: '+ req.body.name + ' price '+ req.body.price)
    })
}) 


// Bargin books (< £20)
router.get('/barginbooks', function(req, res) {
    const sqlSelectBargainBooks = "SELECT name, price FROM books WHERE price<20"; // query database to get books which are priced less than £20
    db.query(sqlSelectBargainBooks, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("barginbooks.ejs", {availableBooks:result});
        });
});

// Export the router object so index.js can access it
module.exports = router
