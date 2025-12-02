// Create a new router
const express = require("express")
const router = express.Router();

// GET /api/books - return list of books as JSON
router.get('/books', function (req, res, next) {

    // Get query parameters
    let search = req.query.search ? req.sanitize(req.query.search) : null;
    let min = req.query.minprice ? parseFloat(req.query.minprice) : null;
    let max = req.query.maxprice ? parseFloat(req.query.maxprice) : null;

    // Select all books initially
    let sqlquery = "SELECT * FROM books WHERE 1=1";
    let params = [];

    // Search filter
    if (search) {
        sqlquery += " AND name LIKE CONCAT('%', ?, '%')";
        params.push(search);
    }

    // Min price filter
    if (min !== null && !isNaN(min)) {
        sqlquery += " AND price >= ?";
        params.push(min);
    }

    // Max price filter
    if (max !== null && !isNaN(max)) {
        sqlquery += " AND price <= ?";
        params.push(max);
    }

    db.query(sqlquery, params, (err, result) => {
        if (err) {
            res.json(err);
            return next(err);
        }
        res.json(result);
    });

});

module.exports = router;

     

    