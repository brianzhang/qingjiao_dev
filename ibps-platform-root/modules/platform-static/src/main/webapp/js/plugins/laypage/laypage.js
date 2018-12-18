/*!
 
 @Name : layPage v1.3- 分页插件
 @Author: 贤心
 @Site：http://sentsin.com/layui/laypage
 @License：MIT
 
 */

;!function(){
" ";

function laypage(options){
    var skin = 'laypagecss';
    laypage.dir = 'dir' in laypage ? laypage.dir : Page.getpath + '/skin/laypage.css';
    new Page(options);
    if(laypage.dir && !doc[id](skin)){
        Page.use(laypage.dir, skin);
    }
}

laypage.v = '1.3';

var doc = document, id = 'getElementById', tag = 'getElementsByTagName';
var index = 0, Page = function(options){
    var that = this;
    var conf = that.config = options || {};
    conf.item = index++;
    that.render(true);
};

Page.on = function(elem, even, fn){
    elem.attachEvent ? elem.attachEvent('on'+ even, function(){
        fn.call(elem, window.even); //for ie, this指向为当前dom元素
    }) : elem.addEventListener(even, fn, false);
    return Page;
};

Page.getpath = (function(){
    var js = document.scripts, jsPath = js[js.length - 1].src;
    return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
}())

Page.use = function(lib, id){
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = laypage.dir;
    id && (link.id = id);
    doc[tag]('head')[0].appendChild(link);
    link = null;
};

//判断传入的容器类型
Page.prototype.type = function(){
    var conf = this.config;
    if(typeof conf.cont === 'object'){
        return conf.cont.length === undefined ? 2 : 3;
    }
};

//分页视图
Page.prototype.view = function(){
    var that = this, conf = that.config, view = [], dict = {};
    conf.pages = conf.pages|0;
    conf.curr = (conf.curr|0) || 1;
    conf.groups = 'groups' in conf ? (conf.groups|0) : 5;
    conf.first = 'first' in conf ? conf.first : '&#x9996;&#x9875;';
    conf.last = 'last' in conf ? conf.last : '&#x5C3E;&#x9875;';
    conf.prev = 'prev' in conf ? conf.prev : '&#x4E0A;&#x4E00;&#x9875;';
    conf.next = 'next' in conf ? conf.next : '&#x4E0B;&#x4E00;&#x9875;';
    conf.rows =  conf.rows ? conf.rows :20;
    conf.rowlist = conf.rowlist ? conf.rowlist :[ 10, 20, 50, 100 ] ;

    if(conf.groups > conf.pages){
        conf.groups = conf.pages;
    }
    
    //计算当前组
    dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0))/(conf.groups === 0 ? 1 : conf.groups));
    
    var first = conf.curr > 1 && conf.prev?'':'disabled';
    var prev =  ( conf.curr > 1 && conf.first)?'':'disabled';
    
    var next =  (conf.curr !== conf.pages && conf.next || dict.flow)?'':'disabled';
    var last = ( conf.curr !==conf.pages)?'':'disabled';
    //输出首页
    view.push('<a href="javascript:;" class="laypage_first glyphicon glyphicon-step-backward '+first+'" data-page="1"  title="'+ conf.first +'"></a>');
    //上一页
    view.push('<a href="javascript:;" class="laypage_prev glyphicon glyphicon-backward '+prev+'" data-page="'+ (conf.curr - 1) +'" title="'+conf.prev +'"></a>');
    //跳转n页。共多少页
    view.push( '<span class="laypage_total">第<input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip form-control" value="'+conf.curr+'">/共'+conf.pages+'页 <button type="button" class="laypage_btn hidden" >&#x786e;&#x5b9a;</button></span>');
    //下一页
    view.push('<a href="javascript:;" class="laypage_next glyphicon glyphicon glyphicon-forward '+next+'" data-page="'+ (conf.curr + 1) +'" title="'+conf.prev +'"></a>');
    
    //输出尾页
    view.push('<a href="javascript:;" class="laypage_last glyphicon glyphicon-step-forward '+last+'"  data-page="'+ conf.pages +'"  title="&#x5C3E;&#x9875;" ></a>');
    
    if(conf.rowlist){
        view.push('<select  class="laypage_rowlist form-control"  role="listbox" title="每页记录数">');
        for(var i = 0, len = conf.rowlist.length; i < len; i++){
            view.push('<option role="option" value="'+conf.rowlist[i]+'" '+(conf.rows ==conf.rowlist[i]?'selected="selected"':'' ) +'>'+conf.rowlist[i]+'</option>');
        }
        view.push('</select>');
    }
    
    if(conf.records){
    	if(conf.records > 0){
    		  view.push('<span>共&nbsp;'+conf.records+'&nbsp;条</span>');
    	}else{
    		  view.push('没有数据.');
    	}
    }
    
    
    return '<div name="laypage'+ laypage.v +'" class="laypage_main laypageskin_'+ (conf.skin ? (function(skin){
        return /^#/.test(skin) ? 'molv' : skin;
    }(conf.skin)) : 'default') +'" id="laypage_'+ that.config.item +'">'+ view.join('')  +'</div>';
};

//跳页
Page.prototype.jump = function(elem){
    if(!elem) return;
    var that = this, conf = that.config, childs = elem.children;
    var btn = elem[tag]('button')[0];
    var input = elem[tag]('input')[0];
    var select = elem[tag]('select')[0];
    for(var i = 0, len = childs.length; i < len; i++){
        if(childs[i].nodeName.toLowerCase() === 'a'){
            Page.on(childs[i], 'click', function(){
                var curr = this.getAttribute('data-page')|0;
                if(curr && curr <= conf.pages){
	                conf.curr = curr;
	                that.render();
                }
            });
        }
    }
    if(btn){
        Page.on(btn, 'click', function(){
            var curr = input.value.replace(/\s|\D/g, '')|0;
            if(curr && curr <= conf.pages){
                conf.curr = curr;
                that.render();
            }
        });
  
        $(input).keydown(function(e) {
        	if (e.keyCode == 13) {// 回车
        		e.preventDefault();
        		btn.click();
        	}
        });
    }
    
    Page.on(select, 'change', function(){
        conf.rows =parseInt( $(this).val(),10);
        that.render();
    });
    

};

//渲染分页
Page.prototype.render = function(load){
    var that = this, conf = that.config, type = that.type();
    var view = that.view();
    if(type === 2){
        conf.cont.innerHTML = view;
    } else if(type === 3){
        conf.cont.html(view);
    } else {
        doc[id](conf.cont).innerHTML = view;
    }
	conf.jump && conf.jump(conf, load);
	that.jump(doc[id]('laypage_' + conf.item));
    if(conf.hash && !load){
        location.hash = '!'+ conf.hash +'='+ conf.curr;
    }
};

//for 页面模块加载、Node.js运用、页面普通应用
"function" === typeof define ? define(function() {
    return laypage;
}) : "undefined" != typeof exports ? module.exports = laypage : window.laypage = laypage;

}();