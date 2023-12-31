const express = require('express')

const app = express()

const bodyparser = require('body-parser');
const https = require("https");

app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req,res){
    var firstname = req.body.fname
    var lastname = req.body.lname
    var email = req.body.email
    console.log(firstname,lastname,email)





var data = {
  members : [
    {
        email_address : email,
        status: "subscribed",
        merge_fields : {
            FNAME : firstname,
            LNAME : lastname
        }
    }
  ]  
};
const jsondata = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/acf856d8bf"


const options = {
    method: "POST",
    auth :"adi:8ea3ddea49d0152baf5b6f5f94721c29-us21"

};


const request = https.request(url,options,function(respone){
    
    if(respone.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }
    else{
        res.sendFile(__dirname + "/failure.html")
    }
    
    
    
    
    respone.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
 request.write(jsondata)
 request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/")
})



app.listen(process.env.PORT || 3000, function(){
    console.log('listening on port 3000')
})


//api key : 8ea3ddea49d0152baf5b6f5f94721c29-us21
//list id : acf856d8bf