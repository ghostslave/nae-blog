/***
 * 如果开启了mongoDB,将下面代码注释去掉，
 * 并将dbUserName, dbPassword和dbName都
 * 替换成分配得到的值。即可查看 mongoDB
 * 测试程序。否则则开启hello world程序。
 ***/

var mongo = require("mongoskin");
var db_url = "RiKQVtOD4NQS:NU25ucS9uY@127.0.0.1:20088/AKjWzdYyIghu";
exports.db_url=db_url;
exports.db = mongo.db(db_url);

