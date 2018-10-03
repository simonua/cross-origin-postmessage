const express = require('express');
const bodyParser = require('body-parser');
const callerWhiteList = require('./caller-whitelist');

const app = express();
const port = 40002;

console.log('\nImported caller whitelist:');
console.log(callerWhiteList);

//https://codeforgeek.com/2014/09/handle-get-post-request-express-4/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    //Enable CORS. This can be restricted further instead of using a wildcard, but that's not part of the current scope.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/authorizesource', (req, res) => {
    console.log('Received request to /authorizesource');
    console.log(`   req.body:`, req.body);
    let source = req.body.source.toLowerCase();
    console.log(`   source: ${source}`);

    //Check whether we have an exact match of the source url and a whitelist item.
    let index = callerWhiteList.findIndex(whiteListItem => source === whiteListItem);
    console.log(`   index: ${index}`);

    //If a match was identified, we return true; otherwise, false. As the request to the service itself is successful regardless of the result,
    //we return a 200 for either situation.
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
