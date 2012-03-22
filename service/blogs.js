var mongo = require("mongoskin");
var db_url = "192.168.65.80:5586/blog";
var db = mongo.db(db_url);

var service={
	name:"admin",
	description:"",
	version:"1.0.0"
}

db.bind("articles");


function add_article(req,res,next){
	
}


service.register=function(app){
	app.post("/svc/add-article/",add_article);
}


module.exports=service;