function friend(){
	
}

function Enum(data){
	var obj={}
	var data2=null;
	if($.isArray(data) || $.isPlainObject(data)){
		$.each(data,function(i,n){ obj[n]=i; })
	}
	
	
	obj.exchange=function(){
		if(data2==null){
			data2={};
			for(var key in obj){
				data2[obj[key]]=key;
			}
		}
		return data2
	}
	return obj;
}


function FriendsManager(){
	var Status=new Enum({
		ONLINE:1,
		INVISIBILITY:2,
		OFFLINE:3
	});
	var friends={
		"1000":{name:"changjie",icon:"aaa.png",status:Status.ONLINE,remark:"常杰"},
		"1001":{name:"changjie2",icon:"aaa2.png",status:Status.ONLINE,remark:"常杰2"},
		"1002":{name:"changjie3",icon:"aaa3.png",status:Status.ONLINE,remark:"常杰3"}
	}
	
	var store={
		me:1000,
		groups:[
			{id:1,name:"我的好友",remark:"我的好友",order:1,friends:[1001]},
			{id:1,name:"陌生人",remark:"陌生人",order:2,friends:[1002]}
		]
	};
	
	return {
		getMe:function(){
			return friends[store.me];
		},
		setMe:function(obj){
			friends[store.me]=obj;
		},
		searchFriends:function(keys){
			var reg=new RegExp(keys);
			return $.grep(friends,function(i,n){
				if(reg.test(n.name) || reg.test(n.remark)){
					return true;
				}else{
					return false;
				}
			});	
		},
		getStore:function(){
			return store
		}
	
	}	
}


