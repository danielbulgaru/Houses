"use strict";
const express = require("express");
const path=require("path")

const app = express();
const PORT = 3001;

const cors = require("cors")  //Allows 'Cross Origin Resource Sharing (requests from other domains)'
app.use(cors())
app.use(express.json());  //'modern way' - (replaces 'bodyParser')

let houses=[]
houses.push({id:1,price:27500,area:"Handsworth",type:"Flat",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/108k/107051/78903606/107051_RS0730_IMG_11_0000_max_476x317.jpeg`})
houses.push({id:2,price:1450000,area:"Harbourne",type:"House",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/93k/92029/104484854/92029_581009_IMG_00_0000_max_476x317.jpeg`})
houses.push({id:3,price:165000,area:"Edgbaston",type:"Maisonette",image:`https://media.rightmove.co.uk/dir/crop/10:9-16:9/73k/72455/97846952/72455_107VC_IMG_00_0000_max_476x317.jpg`})
houses.push({id:4,price:300000,area:"Jewellery Quarter",type:"Town House",image:`https://media.rightmove.co.uk/167k/166586/106315295/166586_100714012691_IMG_00_0000.jpeg`})
houses.push({id:5,price:180000,area:"Harborne",type:"Semi-Detached",image:`https://media.rightmove.co.uk/100k/99080/106652267/99080_spectra_2046248119_IMG_00_0000.jpeg`})
houses.push({id:6,price:155000,area:"Hockley",type:"Terraced",image:`https://media.rightmove.co.uk/80k/79149/106651919/79149_103507000162_IMG_00_0000.jpeg`})

//var bodyParser = require('body-parser')
//app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));
//app.use(cors())

app.get("/houses", (req, res) => {

  res.type('application/json')
  //res.append('Access-Control-Allow-Origin', ['*']);
  res.send(JSON.stringify( houses ));
});

app.post("/sms", (req, res) => {

  let msg = `hello, we would like to make a booking for ${req.body.name} on date ${req.body.date} and time ${req.body.time} for house ID ${req.body.id}. His message is: ${req.body.msg}`
  sendSMS(msg, '07387228219') // agent number

  let cMsg = `Thank you for booking ${req.body.id}`
  sendSMS(cMsg, req.body.tel) // customer number
  
  res.type('application/json')
  res.send(JSON.stringify( "OK" ));

});

/*
app.get("/display", (req, res) => {
  res.type('application/json')
  res.append('Access-Control-Allow-Origin', ['*']);
  res.send(JSON.stringify(displayList));
});
app.get("/present", (req, res) => {
  const ticket = req.query.ticket;
  delete displayList[ticket];
  res.type('application/json')
  res.append('Access-Control-Allow-Origin', ['*']);
  res.status(200).send(JSON.stringify("OK")); //Nick added stringify 01/21
});

*/

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

function sendSMS (message, phoneNumber) {

  // Prerequisite: install the request package e.g. npm install request

const request = require('request');
const apiKey = 'sgU1EBOeN88gQEiZr10vFTuVugiJww'; 
const sendApiMessage = function(endpoint, messageArgs, callback) {
    return request.post(
        'https://www.firetext.co.uk/api/' + endpoint,
        { form: messageArgs },
        callback
    );
};

var endpoint = 'sendsms';
var urlArgs = {
    'apiKey' : apiKey,
    'to' : phoneNumber,
    'from' : 'Firetext',
    'message' : message
};

sendApiMessage(endpoint, urlArgs, function(error, response, body){
    if (error) {
        return console.log(error);
    }
    console.log(body);
});

}