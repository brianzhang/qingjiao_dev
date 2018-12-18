$(function() {
	dataTemplateDataTitle.init();
});


var dataTemplateDataTitle = {

	init : function() {
		this.fields = frameElement.dialog.params.fields;
		this.data = frameElement.dialog.params.data;
		this.bindEvent();
		this.initData();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on("click","[name='type' ]",function(e) {
			var self = 	$(this);
			if(self.val() == 'first'){
				$("#customGroup").hide();
			}else{
				$("#customGroup").show();
				_this.initEditor()
			}
		});
		
		var id = 'settingTitle';
		
	   var   varTree = new BpmFormVar('fieldsTree'+id,_this.fields,{
		   name:'label',
		   title:'label'
	   })
	 	.setCallback({onClick:function(event, treeId, node){
	 		var editor = 	_this.editor;
			_this. insertField(node,false);
	 		
			 	//varTree.hideMenu();
	 	}})
	 	.makeCombTree(id)
	 	.initZtree();
		
		
	},
	initEditor : function() {
		var _this = this;
		if(this.editor)
			return;
		var editor = this.editor = CodeMirror.fromTextArea(document
				.getElementById("customTitle"), {
			textWrapping : true,
			lineWrapping : false, // 是否自动换行
			lineNumbers : false,// 是否显示行数
		   specialChars: /[\u0000-\u001f\u007f\u00ad\u200c-\u200f\u2028\u2029\ufeff]/,
			mode:'field'
		});


		editor.setSize('100%', '30px');
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
		 var wg = "_widget_";
	     var start = this.editor.getCursor();
	     this.editor.replaceSelection("​" + obj.label + "​");
	     var end = this.editor.getCursor();
	     b ? this._markFieldName(start, end,wg+obj.name,wg+obj.id) : this._markFieldValue(start, end, wg+obj.name);
	     this.editor.focus();
	 },
	getFieldLabel:function(key){
			var fields = this.fields,_this=this,label ="";
			$.each(fields,function(i,n){
				if (("$_widget_"+n.name+"#") ==key){
					label=n.label;
					return false;
				}
			});
			
			return label;
		},
	 setEditorValue :function(val){
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
	                         var f = c.startWith("$ext") ? "扩展字段" : _this.getFieldLabel(c);
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
	         
	 },
	 getEditorValue :function(){
		  var b = [],
          d = $(this.editor.display.lineDiv).find(".CodeMirror-line-content"),
           k =[];
       
        $.each(d, function(d, e) {
           var f = [],j=[];
           $.each($(e).children("span"), function(b, d) {
          	 var me =$(d),
          	 	e = me.attr("data-field"),
          	 	g = me.attr("data-entry");
               if (me.hasClass("cm-field-name"))
                   f.push("$" + e + "#" + g);
               else if( me.hasClass("cm-field-value"))
                   f.push("$" + e + "#");
               else {
                   f.push(me.text());
               }
           });
           var g = f.join("").replace(/\u200b/g, "").replace(/\u00a0/g, " ");
           b.push(g);
       });
        
        
        return b.join("");
	 },
	
	initData : function() {
		var data =this.data;
		if(!data)
			data = {};
		var type = data.type?this.data.type:'first';
		
		 $("[name='type'][value='"+type+"']").prop("checked", true);
		 if(type == 'custom'){
			 $("[name='type'][value='"+type+"']").click();
			 this.setEditorValue(data.title);
		 }

	},
	getData : function() {
		var data = {};
		var type = $('[name="type"]:checked').val();
		if($.isEmpty(type)){
			DialogUtil.msg("请选择类型");
			return;
		}
		data.type =type;
		
		if(type == 'custom'){
			var title = this.getEditorValue();
			if($.isEmpty(title)){
				DialogUtil.msg("请设置标题");
				return;
			}
			data.title = title;
		}


		return data;
	}
};