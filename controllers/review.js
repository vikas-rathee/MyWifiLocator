var request = require("request");

var apiOptions = {
  server : "http://localhost:2000"
};
//
// if(process.env.NODE_ENV === production)
//   apiOptions.server = "https://mywifilocator.herokuapp.com/";

// console.log(apiOptions.server + "/api/locations");


module.exports.review = function(req, res){
  var path = "/api/locations/";
  var locationid = req.params.locationid;

  var getRequestOptions = {
    uri : apiOptions.server + path + locationid,
    method : "GET",
    json : {},
    qs : {}
  };

  var renderReviewpage = function(req, res, body){
      res.render("location-review", {title : body.location.name, locationid : body.location._id, error : req.query.err, url: req.originalUrl});
  };



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


  request(getRequestOptions, function(err, response, body){
    if(err){
      console.log(err);
    } else if(response.statusCode === 200){
        // console.log(body);
        renderReviewpage(req, res, body);
    } else {
      console.log(response.statusCode);
      errorHandler(req, res, response.statusCode);
    }



  });

}





module.exports.addReview = function(req, res){
  var locationid = req.params.locationid;
  var path = "/api/locations/" + locationid + "/reviews";
  console.log(req.body);
  var data = {
    name : req.body.name,
    details : req.body.review
  };
  // console.log(path);
  var postRequestOptions = {
    uri : apiOptions.server + path,
    method : "POST",
    json : data,
    qs : {}
  };

if(!data.details || !data.name){
  res.redirect("/location/" + locationid + "/review/new?err=val");
}else{
    request(postRequestOptions, function(err, response, body){
      console.log(response.statusCode);
      if(response.statusCode === 200){
        console.log(body);
        res.redirect("/locationinfo/" + locationid);
      } else if(response.statusCode === 400 && body.name && body.name === "ValidationError"){
        console.log(body);
        res.redirect("/location/" + locationid + "/review/new?err=val");
      } else {
        console.log(err);
        errorHandler(req, res, response.statusCode);
      }

   });
 }



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

};
