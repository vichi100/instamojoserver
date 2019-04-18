var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function (req, res) {
    res.json({error:'error'})
});

router.post('/', function (req, res) {




    if (!req.body.purpose || !req.body.amount || !req.body.email) {
        res.status(400).json({ success: false, message: 'Needed fields mismatch.', statusCode: 400 });
    } else {

        var headers = { 'X-Api-Key': 'd74246e64c7f1fcfd47cc8abb0c037e8', 'X-Auth-Token': '1b053dcb43b2aa9fca0f145a033ad3a2'  } // PROD
        //var headers = { 'X-Api-Key': 'test_31f84e0ead532c7633e69a2749c', 'X-Auth-Token': 'test_1dc1306d404d8519059beadbf32'  } // TEST
        var payload = {
            purpose: req.body.purpose,
            amount: req.body.amount,
            buyer_name: req.body.buyer_name,
            redirect_url: 'http://yoguestlist.com',
            send_email: false,
            email: req.body.email,
            allow_repeated_payments: false 
        }
        console.log(payload);
        
        request.post('https://www.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (error, response, body) {  // PROD
            // request.post('https://test.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (error, response, body) { //TEST
            if (!error && response.statusCode == 201) {
                let data = JSON.parse(response.body)
                console.log(data.payment_request.longurl)

                res.status(200).json({ success: true, message: 'Initiating payment gateway.', statusCode: 200, url : data.payment_request.longurl});

            }else{
                console.log(error)
            }
        })
    }
});

module.exports = router;
