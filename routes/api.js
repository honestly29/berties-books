// Create a new router
const express = require("express")
const router = express.Router();

// GET /api/books - return list of books as JSON
router.get('/books', function (req, res, next) {

    let search = req.query.search;

    // If a search term is provided
    if (search) {
        search = req.sanitize(search); 

        let sqlquery = `
            SELECT * FROM books 
            WHERE name LIKE CONCAT('%', ?, '%')
        `;

        db.query(sqlquery, [search], (err, result) => {
            if (err) {
                res.json(err);
                return next(err);
            } else {
                res.json(result);
            }
        });

    } else {
        // If no search term then return all books
        let sqlquery = "SELECT * FROM books";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.json(err);
                return next(err);
            } else {
                res.json(result);
            }
        });
    }

});

module.exports = router;

     

    