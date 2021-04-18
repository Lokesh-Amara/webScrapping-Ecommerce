import Express from "express" ;
import cors from "cors";
import mongoose from "mongoose";
import {webData} from "./models/webDats.js";
import {digitalData} from "./data.js" ;

const url = "mongodb://localhost/WebScrapper" ;

mongoose.connect(url, {useNewUrlParser : true});
const con = mongoose.connection;

con.on( "open" , function() {
  console.log("mongoDB connected...");
})

const app = Express();
const port = 3210;

app.use(cors());
app.use(Express.json());

// This methos is to get all the data from the DB

app.get("/", async (req, res) => {
  console.log("Request came to get method");

  try {
    const data = await webData.find();
    res.send(data);
  }catch (err) {
    res.send("Hello world error");
  }
});

// This method is for inserting data in DB
app.post("/", async (req, res) => {
  console.log("request came to Post method ");
  const techData = new webData({
    title : req.body.title,
    image :  req.body.image,
    price : req.body.price,
    fPrice : req.body.fPrice,
    rating : req.body.rating,
    tag : req.body.tag
  });

  try {
    const newInsertion  = await techData.save();
    res.send(newInsertion);
  }catch(err) {
    console.log(err)
  }
})

//This method is for search suggestions

app.post("/search",async(req, res) => {
  console.log("request came to Search method ");
  const key = String(req.body.searchkey);
  try {
    const resp = await webData.find({title : { $regex: key, $options: 'i' }}, {title : 1, _id : 0}).limit(10) ;
    var result = [];
    for(const v of resp){
      result.push(v.title)
    }
    res.send(result);
  }catch(err) {
    console.log(err)
  }
})

//This method is to initialize DB when the application loads

app.get("/onload", async(req, res) => {
  
  try {
    const resp = await webData.insertMany(digitalData) ;
    res.send(resp);
  }catch(err) { 
    console.log(err)
  }

})

// This methos is to get data based on title

app.post("/title", async(req, res) => {
  console.log("searching based on title");
  try {
    const resp = await webData.find({title : req.body.title}) ;
    res.send(resp);
  }catch (err) {
    console.log(err);
  }
})




app.listen(port, () => console.log("Server started...") );
