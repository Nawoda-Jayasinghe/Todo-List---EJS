//jashint esversion:6
// module.exports="Hooooooooooooooo";

// module.exports.getDate=getDate;
exports.getDate = function(){
    const today = new Date();
    
  
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
  
    const day = today.toLocaleDateString("en-US", options);
    return day;
}

// module.exports=getDate; //no paranthese because we dont call it here



exports.getDay = function(){
  const today = new Date();
  

  const options = {
    weekday: "long",
   
  };

  const day = today.toLocaleDateString("en-US", options);
  return day;
}
// module.exports.getDay=getDay;
