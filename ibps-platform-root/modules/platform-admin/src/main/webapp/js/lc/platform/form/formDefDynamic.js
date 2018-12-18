	


$(function(){
	formDefDynamic = new FormDefDynamic();
	formDefDynamic.init();
});

function getData(){
	return formDefDynamic.getValue();
}
		
(function() {
	/**
	 *动态脚本 对象
	 * @returns {FormDefDynamic}
	 */
	FormDefDynamic = function() {
		
	};

	/**
	 * 方法
	 */
	FormDefDynamic.prototype = {
	TABLE_SEPARATOR:".",
	init:function(){
		if (this.hasInit) // 是否已初始化
			return false;
		this.hasInit = true;
		
		var params =this.params=  frameElement.dialog.params;	
		 //布局
		this.initLayout();
		//输入
		this.initEditor();
		//bo对象
		this.initBoTree(params.bo);
	//	console.info(params.bo);
		$('.formula-name').text(params.label);
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
		$('body').layout({ applyDefaultStyles: true});  
	},
	initEditor:function(){
		var editor = this.editor = 
			CodeMirror.fromTextArea(document.getElementById("formula"), {
               textWrapping: true,
               lineWrapping: true, //是否自动换行
               lineNumbers: true,//是否显示行数
               specialChars: /[\u0000-\u001f\u007f\u00ad\u200c-\u200f\u2028\u2029\ufeff]/,
               mode: "groovy"
			 });
		
        editor.on("change", function(editor, b) {
 
        });
        
        editor.addKeyMap({
            Backspace: function(map) {
                var token = map.getTokenAt(map.getCursor());
                if ("field" == token.type ||  "keyword" == token.type) {//删除字段
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
	},
	initBoTree: function (bo){
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
		
		var tree = $.fn.zTree.init($('#boTree'), setting, bo);
		$(".ui-layout-west").css("overflow","auto");

		// 展开所有
		tree.expandAll(true);
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
     getValue: function() {
          return    this.editor.getValue();
     },
     setValue: function(val) {
         this.editor.setValue(val);
     }
	};
})();