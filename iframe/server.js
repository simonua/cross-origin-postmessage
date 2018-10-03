const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 40002;
const callerWhiteList = require('./caller-whitelist');

console.log('\nImported caller whitelist:');
console.log(callerWhiteList);

//https://codeforgeek.com/2014/09/handle-get-post-request-express-4/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/authorizesource', (req, res) => {
    console.log('Received request to /authorizesource.');
    console.log(`   req.body:`, req.body);
    let source = req.body.source;
    console.log(`   source: ${source}`);

    let index = callerWhiteList.findIndex(whiteListItem => source === whiteListItem);
    console.log(`   index: ${index}`);

    if (index > -1) {
        console.log('   Source is authorized!');
        res.send(true);
    } else {
        console.log('   Source is NOT authorized!');
        res.send(false);
    }

    console.log('------------------------------------------------------------------------');
});

app.listen(port, () => {
    console.log(`\nExample app listening on port ${port}!`);
    console.log('------------------------------------------------------------------------');
});
