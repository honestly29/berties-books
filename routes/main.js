// Create a new router
const express = require("express")
const router = express.Router();
const redirectLogin = require('../middleware/redirectLogin');
const request = require('request');

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/weather', function(req, res, next){
    let apiKey = process.env.WEATHER_API_KEY;
    let city = 'london'
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                    
    request(url, function (err, response, body) {
        if(err){
            next(err)
        } else {
            //res.send(body)
            var weather = JSON.parse(body)
            var wmsg = 'It is '+ weather.main.temp + 
            ' degrees in '+ weather.name +
            '! <br> The humidity now is: ' + 
            weather.main.humidity;
            res.send (wmsg);
        } 
    });
});

router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.send("You are now logged out. <a href='/'>Home</a>");
    });
});

// Export the router object so index.js can access it
module.exports = router