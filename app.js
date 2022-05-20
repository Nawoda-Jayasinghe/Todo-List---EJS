const express = require("express");
const bodyParser = require("body-parser");
const date = require("./date.js"); //requireing internal modules which created by our own

// console.log(date());

const app = express();
app.set("view engine", "ejs");

//var item = ""; //the item have to declare here globally
let items = ["Buy", "Cook", "Eat"];
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
//here we have to give the location for our static files (css)
app.use(express.static("public"));

app.get("/", function (req, res) {
  
let day = date.getDate();

  res.render("list", { listTitle: day, kindOfItems: items }); //othervise there are errors if we do not add the kindofitems here
  //now the item variable can not access from this point
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", kindOfItems: workItems });
});

app.get("/about", function(req,res){
  res.render("about");
})

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/", function (req, res) {
  //item = req.body.newItem;
  //res.render("list", {kindOfItem:item}); //this gives error becuse the app.js do not know the kinofitems in list.ejs when
  //the cord executes for the first time. to get rid of this we include this line on get methoss and redirect from here
  //let day = "";
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

  //items.push(item); //now we pass this entire array instead of an instance.
  //then the values will not replaced after adding new items
  //res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

//   switch (currentDay) {
//     case 0:
//       day = "sunday";
//       break;
//     case 1:
//       day = "monday";
//       break;
//     case 2:
//       day = "tuesday";
//       break;
//     case 3:
//       day = "wednesday";
//       break;
//     case 4:
//       day = "thursday";
//       break;
//     case 5:
//       day = "friday";
//       break;
//     case 6:
//       day = "saturday";
//       break;
//     default:
//         console.log(currentDay);
//       break;
//   }

//   if (currentDay === 0 || currentDay === 6) {
//     day = "Weekday";
//     // res.send("<h1>Hello</h1>");
//   } else {
//     day = "weekend";
//     // res.send("<h1>Hello2Hello2</h1>");
//   }

//1. can send onyl one file
//or else have to write and finally send
//or else can keep as a separate file and senFile at the end
//or else its hard. this is the point we need templates.
