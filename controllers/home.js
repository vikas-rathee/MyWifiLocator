// var request = require("request");
//
// var apiOptions = {
//   server : "http://localhost:2000"
// };
//
// if(process.env.NODE_ENV === production)
//   apiOptions.server = "https://mywifilocator.herokuapp.com/";

// console.log(apiOptions.server + "/api/locations");

//
//
// module.exports.home = function(req, res){
//
//
//   var path = "/api/locations";
//
//   var requestOptions = {
//     uri : apiOptions.server + path,
//     method : "GET",
//     json : {},
//     qs : {
//       lng : 77.316842,
//       lat : 28.369382,
//       maxdistance : 100000
//     }
//   };
//
//
//   request(requestOptions, function(err, response, body){    // response is the full response obj and body is the parsed body
//     // console.log(response.statusCode);
//     if(err){
//       console.log(err);
//     } else if(response.statusCode === 200){
//       // console.log(body);
//       if(body.length){
//         body.forEach(function(data){
//           data.distance = formatDistance(data.distance);
//         })
//       }
//       renderHomepage(req, res, body);
//     } else{
//       console.log(response.statusCode);
//       renderHomepage(req, res, body);
//     }
//   });
//
  var formatDistance = function(data){
    var unit;
    if(data > 1000){
      data = parseFloat(data / 1000).toFixed(1);
      unit = "km";
    } else {
      data = parseInt(data, 10);
      unit = "m";
    }
    return data + unit;
  };

  // var renderHomepage = function(req, res, body){
  //   var message;
  //   if(!(body instanceof Array)){
  //     message = "Api Error!";
  //     body = [];
  //   } else if(!body.length){
  //     message = "No Places found nearby!!";
  //     body = [];
  //   }
  //

  //   res.render("home-location", dataObj);
  // };
// };




// module.exports.home = function(req, res){
//   var obj = {
    // title : "WifiLocator",
    // pageHeader : {
    //   title: "WifiLocator",
    //   tagLine : "Find Wifis & Food near you!"
    // },
    // locations : [{
    //   name : "The Cool Cafe",
    //   distance : "100m",
    //   address : "126, Sector 11, Faridabad",
    //   facilities : ["Cold Coffee", "Cookies", "Wifi"]
    // },{
    //   name : "The Haveli",
    //   distance : "150m",
    //   address : "167, Sector 11, Faridabad",
    //   facilities : ["Indian", "Desi", "Wifi"]
    // },{
    //   name : "Hangout",
    //   distance : "500m",
    //   address : "16, Sector 10, Faridabad",
    //   facilities : ["Pizza", "Burger", "Wifi"]
    // }],
    // aside1 : "Hungry and want a place to use wifi ",
    // aside2 : "will help you to find the perfect destination."
//   };
//
// };
//



module.exports.home = function(req, res){
  res.render("home-location", {
        title : "WifiLocator",
        pageHeader : {
          title : "WifiLocator",
          tagLine : "Find Wifis & Food near you!"
        },
        aside1 : "Hungry and want a place to use wifi ",
        aside2 : "will help you to find the perfect destination."
  });
}
