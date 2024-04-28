// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const {date:inputDate} = req.params;
  const resJson = {};
  let date_string = null;
  let date;
  if(inputDate === undefined){
    date = new Date();
  }else{
    if(inputDate.includes('-'))
      date_string = inputDate;
    else if(inputDate.includes('GMT'))
      date_string = Date.parse(inputDate);
    else
      date_string = parseInt(inputDate);
    
    date = new Date(date_string);
  }
  
  console.log(inputDate, date);
  if(isNaN(date)){
    resJson.error = 'Invalid Date';
  }else{
    resJson.unix = date.getTime();
    resJson.utc = date.toUTCString();
  }
    
  

  res.json(resJson);
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
