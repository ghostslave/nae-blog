var model=require('../model/blog.js').model;

function index(req, res) {
	var context={};
	
	model.articles.find().toArray(function(err,articles){
		if(err){
			res.render('blog/error.html',{title:'出错啦！！！',error:err});	
		}else{
			res.render('blog/index.html',{
				layout:'master-blog.html',
				title:'blog.iisii.net',
				articles:articles
			});	
		}
	})
}

exports.index=index;