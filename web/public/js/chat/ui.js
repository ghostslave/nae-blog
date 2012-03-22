function FriendsPanel(){
	var tpl=[];
	tpl.push('<div class="ui-widget">');
	tpl.push('	<div class="ui-widget-header">');
	tpl.push('		<dl><dt><img src="${me.icon}"></dt><dd><span>${me.remark}</span></dd></dl>');
	tpl.push('		<ul>');
	tpl.push('			<li>联系人</li>');
	tpl.push('			<li>群组</li>');
	tpl.push('		</ul>');
	tpl.push('	</div>');
	tpl.push('	<div class="ui-widget-search">');
	tpl.push('		<input type="text" value="搜索联系人" />');
	tpl.push('		<button>添加好友</button>');
	tpl.push('	</div>');
	tpl.push('	<dl class="ui-widget-friends">');
	tpl.push('	{{each(i,group) groups}}');
	tpl.push('		<dt>${i}.${name}</dt>');
	tpl.push('		<dd></dd>');
	tpl.push('	{{/each}}');
	tpl.push('	</dl>');
	tpl.push('</div>');
	
	var $tmpl=$(tpl.join(""));
	
	
	return {
		render:function(context){
			var html=[];
			
			return	$(tpl.join("")).tmpl(context)	
		},
		renderHeader:function(context){
			$tmpl.find(".ui-widget-header").tmpl(context)
		}
	}
	

}
