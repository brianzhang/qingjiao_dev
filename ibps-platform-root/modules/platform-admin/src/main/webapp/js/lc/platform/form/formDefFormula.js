/**
 * 表单公式设计
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2016-10-01-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
$(function(){
	formDefFormula = new FormDefFormula();
	formDefFormula.init();
});

function getData(){
	var data  = formDefFormula.getFormula();
	  if($.isEmpty(data)){
  		  DialogUtil.msg("请设置公式值");
  		  return;
  	  }
	  return data;
}
		

function getVerifyData(){
	return formDefFormula.getVerifyData();
}

(function() {
	/**
	 *表单计算 对象
	 * @returns {FormDefFormula}
	 */
	FormDefFormula = function() {
		
	};

	/**
	 * 方法
	 */
	FormDefFormula.prototype = {
	TABLE_SEPARATOR:".",
	init:function(){
		if (this.hasInit) // 是否已初始化
			return false;
		this.hasInit = true;
		
		var params =this.params=  frameElement.dialog.params;	
		this.bo = params.bo;
		 //布局
		this.initLayout();
		//输入
		this.initEditor();
		//bo对象
		this.initBoTree();
		
		this.bindTreeEvent();
		
		$('.formula-name').text(params.label);
		var height = $(window).height(),flexHeight = 75;
		
		if($('[data-name="formVerify"]').length >0){
			flexHeight += 56;
		}
		$(".niceScroll").height(height-flexHeight);
		this._initScroll();
	},
	_initScroll:function(){
    	$(".niceScroll").niceScroll({
    		horizrailenabled : false,
    		cursorborder : "0",
    		cursorwidth : "6px",
    		cursorcolor : "#2A2A2A",
    		zindex : "5555",
    		autohidemode : true,
    		bouncescroll : true,
    		mousescrollstep : '40',
    		scrollspeed : '100',
    		background : "#999",
    		cursoropacitymax : "0.6",
    		cursorborderradius : "0"
    	});
    	$(".niceScroll").getNiceScroll().resize();
	},
	
	getBoLabel:function(key){
		var bo = this.params.bo,_this=this,label ="";
		$.each(bo,function(i,n){
			if (("$_widget_"+n.tableName+_this.TABLE_SEPARATOR+n.key+"#") ==key){
				label=n.name;
				return false;
			}
		});
		
		return label;
	},
	initLayout:function(){
		$('body').layout({ applyDefaultStyles: true,
			south__closable:false,
			south__spacing_open:0,
			south__resizable:			false});  
	},
	initEditor:function(){
		var editor = this.editor = 
			CodeMirror.fromTextArea(document.getElementById("formula"), {
			   keywords: this.params.keywords,
               textWrapping: true,
               lineWrapping: true, //是否自动换行
               lineNumbers: false,//是否显示行数
               specialChars: /[\u0000-\u001f\u007f\u00ad\u200c-\u200f\u2028\u2029\ufeff]/,
               mode: "formula"
			 });
		
        editor.on("change", function(editor, b) {
       	CodeMirror.showHint(editor, CodeMirror.formulaHint, {
                completeSingle: false
            });
        });
        
        editor.addKeyMap({
            Backspace: function(map) {
                var token = map.getTokenAt(map.getCursor());
                if ("field" == token.type ) {//删除字段 ||  "keyword" == token.type
                    var line = map.getCursor().line;
                    map.setSelection(new CodeMirror.Pos(line,token.start), new CodeMirror.Pos(line,token.end));
                    map.replaceSelection("", null , "+delete");
                } else{
                	map.execCommand("delCharBefore");
                }
            }
        });
		
		editor.setSize('100%','390px');
		
		if(!$.isEmpty(this.params.value))
			this.setValue(this.params.value);
		if(!$.isEmpty(this.params.msg))
			$("#msg").val(this.params.msg);
	},
	initBoTree: function (){
		var _this = this;
		var setting = {
				data : {
					key : {
						name : "name"
					},
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "parentId",
						rootPId : null
					}
				},
				view : {
					selectedMulti : false,
					showIconFont : true
				},
				callback : {
					onClick : function(e, treeId, treeNode) {
						_this. insertField(treeNode,false);
					}
				}
		};
		
		this.boTree = $.fn.zTree.init($('#boTree'), setting,this.bo);

		// 展开所有
		this.boTree.expandAll(true);

	},
	bindTreeEvent:function(){
		var _this = this;
		$('.tree-toolbar').on("click", "a.btn", function(){
			if($(this).hasClass("fa-refresh")){//刷新
				_this.initBoTree();
			}else	if($(this).hasClass("fa-expand")){//展开
				_this.boTree.expandAll(true);
			} else{
				_this.boTree.expandAll(false);	
			}
		});
	},
	_markFieldValue: function (start,end,key){
	    	this.editor.markText(start, end, {
	           className: "cm-field-value",
	           attr: {
	               "data-field": key
	           }
	    	});
	 },
	_markFieldName:function (start,end,key,id){
		this.editor.markText(start, end, {
           className: "cm-field-name",
           attr: {
               "data-field": key,
               "data-entry": id
           }
       });
   },
	 insertField: function  (obj, b) {
		 var wg = "_widget_"+obj.tableName+this.TABLE_SEPARATOR;
         var start = this.editor.getCursor();
         this.editor.replaceSelection("​" + obj.name + "​");
         var end = this.editor.getCursor();
         b ? this._markFieldName(start, end,wg+obj.key,wg+obj.id) : this._markFieldValue(start, end, wg+obj.key);
         this.editor.focus();
     },
     getVerifyData:function(){
    	 var val = this.getValue(),msg = $("#msg").val();
    	 val["msg"] = msg;
    	 if($.isEmpty(msg))
    		 $("#msg").focus();
    	return val;
     },
     getFormula:function(){
    	return  this.getValue()["formula"];
     },
     getValue: function() {
         var b = [],
            d = $(this.editor.display.lineDiv).find(".CodeMirror-line-content"),
             k =[];
         
          $.each(d, function(d, e) {
             var f = [],j=[];
             $.each($(e).children("span"), function(b, d) {
            	 var me =$(d),
            	 	e = me.attr("data-field")
                   , g = me.attr("data-entry");
                 if (me.hasClass("cm-field-name"))
                     f.push("$" + e + "#" + g);
                 else if( me.hasClass("cm-field-value"))
                     f.push("$" + e + "#");
                 else {
                     if (me.hasClass("cm-deprecate"))
                         return;
                     f.push(me.text())
                 }
                 j.push(me.text());
             });
             var g = f.join("").replace(/\u200b/g, "").replace(/\u00a0/g, " ");
             b.push(g);
             var t = j.join("").replace(/\u200b/g, "").replace(/\u00a0/g, " ");
             k.push(t);
         });
    
          
          return   {
              formula: b.join("\n"),
              show: k.join("\n")
          };
     },
     setValue: function(val) {
         var _this = this,
            c = [],
           d = [];
         if (val) {
             var valAry = val.split("\n");
             
             $.each(valAry, function(a, b) {
                 var e = "",
                    f = b.split(/(\$[0-9a-zA-Z\._]+#[0-9A-Fa-f]*)/g);
                 
                 $.each(f, function(b, c) {
                     if (/^\$(_widget_|_formula_|ext)/.test(c)) {
                         var f = c.startWith("$ext") ? "扩展字段" : _this.getBoLabel(c);
                         var g = c.replace("$", "").split("#"),
                           h = g[0]
                           , i = g[1]
                           , j = CodeMirror.Pos(a, e.length);
                         e += "​" + f + "​";
                         var k = CodeMirror.Pos(a, e.length);
                         d.push({
                             from: j,
                             to: k,
                             field: h,
                             entry: i
                         });
                     } else{
                    	 e += c
                     }
                        
                 }),
                 c.push(e)
             });
         }
         this.editor.setValue(c.join("\n")),
         $.each(d, function(a, c) {
             c.entry ? _this._markFieldName(c.from, c.to, c.field, c.entry) : _this._markFieldValue(c.from, c.to, c.field);
         });
     }
	};
})();