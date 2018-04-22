var request = require("request");
var apiOptions = {
  server : "http://localhost:2000"
};
//
// if(process.env.NODE_ENV === production)
//   apiOptions.server = "https://mywifilocator.herokuapp.com/";


module.exports.location = function(req, res){
  var path = "/api/locations/";
  var locationid = req.params.locationid;
  var requestOptions = {
    uri : apiOptions.server + path + locationid,
    method : "GET",
    json : {},
    qs : {}
  };


  request(requestOptions, function(err, response, body){    // response is the full response obj and body is the parsed body
    if(err){
      console.log(err);
    } else if(response.statusCode === 200){
      // console.log(body);
      renderDetailsPage(req, res, body);
    } else{
      console.log(response.statusCode);
      errorHandler(req, res, response.statusCode);
    }
  });


  var errorHandler = function(req, res, status){
    var errorTitle, errorContent;
    if(status === 404){
      errorTitle = "Error 404 : Page not Found";
      errorContent = "Looks like something is wrong!"
    } else {
      errorTitle = status + ", Something is wrong";
      errorContent = "Sorry for the inconvenience";
    }

    res.status(status);
    res.render("error-page", {errorTitle : errorTitle, errorContent : errorContent});
  };


  var renderDetailsPage = function(req, res, body){
    // body.location.review.forEach(function(data){
    //   console.log(data.date.substring(0,10));
    // })

    var dataObj = {
      title : body.location.name,
      pageHeader : body.location.name,
      location : {
        name : body.location.name,
        address : body.location.address,
        facilities : {
          title : "Facilities",
          names : body.location.facilities},
        map : {
          name : "Location Map",
          lng : body.location.coords[0],
          lat : body.location.coords[1],
          api : "https://maps.googleapis.com/maps/api/staticmap?center=" + body.location.coords[1] + "," + body.location.coords[0] + "&zoom=17&size=400x350&scale=2&markers=" + body.location.coords[1] + "," + body.location.coords[0] + "&key=AIzaSyBNmqQ0NdFdoZahbmwcdtmx_PeJ8VlwNl8"
        },
        openingTime : body.location.openingTime,
        reviews : body.location.review,
        locid : req.params.locationid

      }
    };
    // console.log(dataObj);
    res.render("location-details", dataObj);
  }
}
