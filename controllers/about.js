var request = require("request");



module.exports.about = function(req, res){
  var obj = {
    title : "About",
    paras : [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec sodales ex, vitae faucibus enim. Aenean facilisis quis metus quis cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nunc metus, molestie eget neque vitae, varius facilisis sapien. Cras maximus, sapien a iaculis pretium, elit sem pharetra elit, id ullamcorper erat felis non lorem. Nam mauris est, faucibus in pretium tristique, pellentesque a arcu. Quisque condimentum, eros vel placerat feugiat, arcu ante molestie magna, a mattis nulla nulla ac sapien. Mauris in elit eget diam tincidunt vulputate. Nunc accumsan dui sit amet urna vulputate, quis blandit turpis tincidunt. Donec fermentum laoreet placerat. Morbi libero ante, egestas non efficitur vel, sagittis id sapien. Nam feugiat aliquam enim, at efficitur libero volutpat tincidunt.",
      "Donec nec placerat orci. Donec eleifend leo massa, sed placerat mi imperdiet sit amet. Praesent commodo tristique elementum. Cras non tristique sem. Sed et metus at mi fermentum sagittis. In in metus nec ex volutpat maximus eget a ipsum. Pellentesque varius vulputate faucibus. Nullam velit nisl, dignissim sit amet lacus nec, hendrerit vulputate elit. Quisque at cursus ipsum, ac efficitur dui. In pharetra eros nec leo gravida varius. Nam pellentesque, felis sagittis pellentesque suscipit, eros libero placerat tellus, a efficitur quam odio nec lorem. Fusce lacinia lacinia arcu, in vestibulum erat placerat eget. Curabitur orci neque, tincidunt et dapibus quis, imperdiet sit amet eros. Suspendisse vel maximus quam, sit amet feugiat justo. Etiam tempor augue nisl, in efficitur nulla egestas viverra."
    ]
  };
  res.render("about-page", obj);
};
