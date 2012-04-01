var model=require('../model/blog.js').model;
var async=require('async');
function index(req, res) {
	model.articles.find().toArray(function(err,articles){
		if(err){
			res.render('blog/error.html',{title:'������������',error:err});	
		}else{
			res.render('blog/index.html',{
				layout:'master-blog.html',
				title:'blog.iisii.net',
				articles:articles,
				fday:function(date){
					return date.getDay()+1;
				},
				fmonth:function(date){
					var cDate=['һ','��','��','��','��','��','��','��','��','ʮ','ʮһ','ʮ��']
					return cDate[date.getMonth()];
				}
			});	
		}
	})
}

function article(req,res){
	
	model.articles.findById(req.query.id,function(err,article){
		if(err){
			res.render('blog/error.html',{title:'������������',error:err});	
		}else{
			var result=article;
			res.render('blog/article.html',{
				layout:'master-blog.html',
				title:'blog.iisii.net',
				article:result,
				
				fday:function(date){
					return date.getDay()+1;
				},
				fmonth:function(date){
					var cDate=['һ','��','��','��','��','��','��','��','��','ʮ','ʮһ','ʮ��']
					return cDate[date.getMonth()];
				}

			});	
		}
	});
}


exports.index=index;
exports.article=article;
