var url=require('url')
	,path=require('path')
	,tpl=require('./node_modules/jqtpl')	//jquery 模版引挚
	,express=require('./node_modules/express')
	,blog=require('./web/controller/blog.js');

var db=require('./config.js');
var app = express.createServer();

//var svc_blogs=require('./service/blogs.js');


app.configure( function() {
	app.set('views', __dirname + '/web/views');
	app.set('view engine', 'html');
	app.set('view options', {
	    layout: false
	});
	app.register(".html", tpl.express);

	app.use(express['bodyParser']());
	app.use(express['methodOverride']());
	app.use(express['static'](__dirname + '/web'));
});

/*
app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});
app.configure('production', function() {
	app.use(express.errorHandler());
});
*/


//svc_blogs.register(app);



app.get('/', blog.index);


app.get('/admin',function(req,res){
	res.render('admin/index.html',{title:'管理后台'});	
});


app.listen(8080);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

	