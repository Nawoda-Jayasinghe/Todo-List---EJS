const express = require("express");
const bodyParser = require("body-parser");
const date = require("./date.js"); //requireing internal modules which created by our own
const { default: mongoose } = require("mongoose");
const _ = require("lodash");

// console.log(date());

const app = express();
app.set("view engine", "ejs");

//var item = ""; //the item have to declare here globally
// let items = ["Buy", "Cook", "Eat"];
// let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
//here we have to give the location for our static files (css)
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

//creating a new mongoos items schema
const itemSchema = {
  name: String
};

//have to create a new model using the above items chema
const Item = mongoose.model("Item", itemSchema);

//create a new document using mongoose
const item1 = new Item ({
    //this is a new document from our item model
    name : "First"
  })
  const item2= new Item ({
    //this is a new document from our item model
    name : "Second"
  })
  const item3 = new Item ({
    //this is a new document from our item model
    name : "Third"
  })

  const defaultItems = [item1, item2, item3];

  const listSchema = {
    name: String,
    items: [itemSchema]
  };

  //list model from list schema
  const List = mongoose.model("List", listSchema);


  //we haave to insert above items (array) to our collection
  // Item.insertMany(defaultItems, function(err){
  //   if(err){
  //     console.log(err)
  //   }else{
  //     console.log("Saved to document successfully");
  //   }
  // })


app.get("/", function (req, res) {

  Item.find({}, function(err, foundItems){

    if (foundItems.length==0){
      //we haave to insert above items (array) to our collection
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err)
        }else{
          console.log("Saved to document successfully");
        }
      });
      res.redirect("/");
    }
    else{
      res.render("list", { listTitle: "Today", kindOfItems: foundItems });
    }

    
  })
  
// let day = date.getDate();

   //othervise there are errors if we do not add the kindofitems here
  //now the item variable can not access from this point
});

// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", kindOfItems: workItems });
// });

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        // console.log("Doesnt exist");
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems

        });

        list.save();
        res.redirect("/"+ customListName)
      }else{
        // console.log("Exist");
        //show the list which is already exist
        res.render("list",{ listTitle: foundList.name, kindOfItems: foundList.items } )
      }
    }
  })
  //we use a document using list model
  
  // list.save();

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

  const itemName = req.body.newItem;
  const listName = req.body.list; //correspond to the name of the button on list.ejs file


  //create a new item document using the itemName
  const item = new Item({
    name: itemName //this came from list.ejs
  });

  if(listName == "Today"){
    item.save()
    res.redirect("/");

  }else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }
  // item.save();
  // res.redirect("/");

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }




  //items.push(item); //now we pass this entire array instead of an instance.
  //then the values will not replaced after adding new items
  //res.redirect("/");
});

app.post("/delete", function(req,res){
  const checkItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName == "Today"){
    Item.findByIdAndRemove(checkItemId, function(err){
      if(!err){
        console.log("Successfully removed the item");
        res.redirect("/");
      }
    })
  }
  else{
    List.findOneAndUpdate({namw: listName}, {$pull: {items: {_id: checkItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/"+ listName);
      }
    });
  }

  
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


// <!-- <%= kindOfItems.forEach(function(item){ %>
//   <div class="item">
//       <input type="checkbox" />
//       <p>
//           <%=item %>
//       </p>
//   </div>
//   <%=}) %> -->
