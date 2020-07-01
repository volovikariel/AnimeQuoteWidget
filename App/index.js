let request = require('request');

let makeRequest = function() {
    request("https://anime-chan.herokuapp.com/api/quotes/random", function(err, response, body){
        let bodyJson = JSON.parse(body);
        let randomQuote = `${bodyJson[0]["quote"]}<br> -${bodyJson[0]["anime"]}`;
        console.log(randomQuote);
        document.getElementById("quote").innerHTML= randomQuote;
    });
};

makeRequest();

setInterval(makeRequest, 20000); // 20 seconds