const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

const app = express();

// Data base connection 

main()
.then(console.log("Connected to database : "))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/elevate');
}

app.engine("ejs", ejsMate); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // for CSS/JS

// Sample route
app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







