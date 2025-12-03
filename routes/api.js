// Create a new router
const express = require("express")
const router = express.Router();

// GET /api/books - return list of books as JSON
router.get('/books', function (req, res, next) {

    // Get filters
    let search = req.query.search ? req.sanitize(req.query.search) : null;
    let min = req.query.minprice ? parseFloat(req.query.minprice) : req.query.min_price ? parseFloat(req.query.min_price) : 
    null;
    let max = req.query.maxprice ? parseFloat(req.query.maxprice) : req.query.max_price ? parseFloat(req.query.max_price) : 
    null;
    let sort = req.query.sort ? req.sanitize(req.query.sort) : null;

    // Select all books initally
    let sqlquery = "SELECT * FROM books WHERE 1=1";
    let params = [];

    // Apply filters
    if (search) {
        sqlquery += " AND name LIKE CONCAT('%', ?, '%')";
        params.push(search);
    }

    if (min !== null && !isNaN(min)) {
        sqlquery += " AND price >= ?";
        params.push(min);
    }

    if (max !== null && !isNaN(max)) {
        sqlquery += " AND price <= ?";
        params.push(max);
    }

    // Apply sorting 
    if (sort === 'name') {
        sqlquery += " ORDER BY name ASC";
    } else if (sort === 'price') {
        sqlquery += " ORDER BY price ASC";
    }

    // Execute query
    db.query(sqlquery, params, (err, result) => {
        if (err) {
            res.json(err);
            return next(err);
        }
        res.json(result);
    });

});

module.exports = router;

     

    