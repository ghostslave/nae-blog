var mongo = require("mongoskin");

//var db_url = "RiKQVtOD4NQS:NU25ucS9uY@127.0.0.1:20088/AKjWzdYyIghu";
var db_url = "127.0.0.1:5586/blog";
var db = mongo.db(db_url);

db.bind("articles");

exports.model=db;
