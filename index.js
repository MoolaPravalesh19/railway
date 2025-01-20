const { render } = require("ejs");
let express=require("express");
let app=express();
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const bookings=require("./models/bookings");
const login=require("./models/login");
let port=3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.set("view engine", "ejs");
// app.use(cors());

app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const MONGO_URL = "mongodb://127.0.0.1:27017/railway";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const trainDetails = {
    rajdhani: { name: 'Rajdhani Express', price: 1500 },
    shatabdi: { name: 'Shatabdi Express', price: 1200 },
    garibRath: { name: 'Garib Rath Express', price: 800 },
};
app.get("/",(req,res)=>{
  res.redirect("/login");
})
app.get("/login",(req,res)=>{
  res.render("home.ejs");
})
app.get("/reservation",(req,res)=>{
  res.render("index.ejs");
})
app.get("/cancellation",(req,res)=>{
  res.render("cancellation.ejs");
})
app.post('/details', (req, res) => {
    const { train, name, age, seats,from,To } = req.body;

    if (!train || !name || !age || !seats) {
        return res.status(400).json({ message: 'Please fill all fields!' });
    }

    const trainData = trainDetails[train];
    if (!trainData) {
        return res.status(400).json({ message: 'Invalid train selected!' });
    }

    const totalCost = trainData.price * seats;
    res.json({
      from,
      To,
        name,
        age,
        train: trainData.name,
        seats,
        totalCost,
    });
    console.log(req.body)
    
    
});
app.post('/reservation', (req, res) => {
  const reservationData = req.body; // Access the posted data
  // Process the reservationData
});
app.get("/bookings",async(req,res)=>{
   let booking=await bookings.find({});
   res.render("show.ejs",{booking});
})