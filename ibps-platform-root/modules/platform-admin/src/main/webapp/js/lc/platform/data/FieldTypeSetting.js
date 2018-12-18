/**
 * 字段类型设置
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-12-30 16:21:52
 * </pre>
 */
FieldTypeSetting = {
		
	init : function() {
		this.initBindEvents();
	},
	
	initFieldTypeOptions : function(type){
		var field_type = this.DEFAULT_FIELD_TYPE[type];
		var options = []
		for(i in field_type){
			var key = field_type[i];
			options.push("<option value='" +key+ "'>" + this.FIELD_TYPE[key]+ "</option>");
		}
		$("#fieldType").empty().append(options.join(""));
	},
    DATE_FORMATS:{
  	  "date":"yyyy-MM-dd",
	  "datetime":"yyyy-MM-dd HH:mm:ss",
	  "time":"HH:mm:ss"
    },
    DEFAULT_FIELD_TYPE:{
    	"varchar":['hidden','text','radio','checkbox','select','datePicker','dictionary','selector','attachment','customDialog','linkdata','address'],
    	"date":['datePicker','text','hidden'],
    	"number":['number','text'],
    	"clob":['text','textarea','editor','hidden','linkdata','signature'],
    },
    FIELD_TYPE:{
   	  'hidden':'隐藏域',
  	  'text':'文本框',
  	  'textarea':'大文本框',
  	  'editor':'富文本框',
  	  'number':'数字',
  	  'radio':'单项选择',
  	  'checkbox':'多项选择',
  	  'select':'下拉框',
  	  'datePicker':'日期控件',
  	  'dateRange':'日期范围',
  	  'dictionary':'数据字典',
  	  'selector':'选择器',
  	  'attachment':'附件',
  	  'customDialog':'自定义对话框',
  	  'linkdata':'关联数据',
  	  'address':'地址',
      'signature':'签名'
    },
	setData:function(data){
		var _this = this,
			fieldType = data["field_type"],
			fieldOptions= data["field_options"];

		$("#fieldType").val(fieldType).trigger("change");
		
		
		if($.isEmpty(fieldType) || $.isEmpty(fieldOptions) )
			return;
		if(fieldType =='datePicker' || fieldType =='dateRange' ){
			var formatType =  fieldOptions["datefmt_type"];
			if(!formatType)
				return;
			$("#dateGroup").show();
			$("#datefmtType").val(formatType).trigger("change");
			$("#datefmt").val(fieldOptions["datefmt"]?fieldOptions["datefmt"]:this.DATE_FORMATS[formatType]);
		}	else if(fieldType =='number'){
			var numberType =  fieldOptions["number_type"];
			if(!numberType)
				return;
			$("#numberGroup").show();
			$("#numberType").val(numberType);
		} else if(fieldType =='select' || fieldType =='radio' || fieldType =='checkbox' ){
			var  options =  fieldOptions["options"];
			if(!options)
				return;
			var $tr= [];
			$.each(options, function(i, n) {
				$tr.push(_this._getEnumTr(n))
			});
			$('#enumTb').html($tr.join(""));
		} else if(fieldType =='dictionary'){
			var dictionary = fieldOptions['dictionary'];
			var dictionaryName = fieldOptions['dictionary_name'];
			$("#dicId").val(dictionary);
			if($.isEmpty(dictionary))
				dictionaryName ="";
			$("#dicName").val(dictionaryName );
		} else if(fieldType =='selector'){
			$("#selectorType").val(fieldOptions['selector_type'] );
			$("#store").val(fieldOptions['store'] );
		} else if(fieldType =='customDialog'){
			this.dialogData ={
					id:	fieldOptions['dialog']||'',
					text:fieldOptions['dialog_name']||''
			};
			$("#store").val(fieldOptions['store_mode'] );
			
			this.initCustomDialog();
		}
	},
	initBindEvents:function(){
		this._bindFieldType();
		this._bindDatefmtType();
		this._bindEnum();
		this._bindSame();
	},
	_bindSame:function(){
		$(document).on("change","#same",function() {
		      var $el = $(this),same=$el.val();
		      if(same == 'N'){
		    	  $("#fieldTypeGroup").show();
		      }else{
		    	  $("#fieldTypeGroup").hide();
			      $("#numberGroup").hide();
			      $("#dateGroup").hide();
			      $("#enumGroup").hide();
			      $("#dictionaryGroup").hide();
			      $("#selectorGroup").hide();
			      $("#storeGroup").hide();
		      }
		});	
	},
	_bindFieldType:function(){
		var _this = this;
		$(document).on("change","#fieldType",function() {
		      var $el = $(this),fieldType =$el.val();
		      $("#dateGroup").hide();
		      $("#numberGroup").hide();
		      $("#enumGroup").hide();
		      $("#dictionaryGroup").hide();
		      $("#selectorGroup").hide();
		      $("#storeGroup").hide();
		      $("#customDialogGroup").hide();
		      
		      //还原默认
		      $("#enumTb").html("");
		      
		      	if(fieldType =='datePicker' || fieldType =='dateRange'){// 日期
		         	$("#dateGroup").show();
		        }else if(fieldType =='number' ) {
		           	$("#numberGroup").show();
		        }else if(fieldType =='select'  || fieldType =='radio' || fieldType =='checkbox' ) {
		         	$("#enumGroup").show();
		        }else if(fieldType =='dictionary' ) {
		         	$("#dictionaryGroup").show();
		        }else if(fieldType =='selector'){
					$("#selectorGroup").show();
				     $("#storeGroup").show();
				}else if(fieldType =='customDialog'){
					$("#customDialogGroup").show();
				    $("#storeGroup").show();
					if($.isEmpty(_this.dialogData)){
						_this.dialogData ={};
					}
					_this.initCustomDialog();
				}
		});
	},
	_bindDatefmtType:function(){
		var _this = this;
		$(document).on("change","#datefmtType",function() {
		      var $el = $(this),val =$el.val();
		        if(val =='custom' ){
		        	$("#datefmt").removeClass("hidden");
		          	$("#datefmt").val("");
		        }else{// 自定义的
		        	$("#datefmt").addClass("hidden");
		          	$("#datefmt").val(	_this.DATE_FORMATS[val]);
		        }
		});
	},
	_bindEnum : function(){
		var _this = this;
	      //新增
	  	$(document).on("click", ".js-add-enum", function() {
	  		var tr= _this._getEnumTr();
	  		 $('#enumTb').append(tr);
	  	});
	  	//删除
	  	$(document).on("click", ".js-remove-enum", function() {
	  		$(this).parent().parent().remove();
	  	});
	  
	},
	_getEnumTr:function(d){
		d = d?d:{val:"",label:""};
		var tr=[];
		tr.push('<tr><td> <input type="text" name="val" class="form-control" value="'+d.val+'" /></td><td >'+ 
				'<input type="text" name="label" class="form-control" value="'+d.label+'" />'+ '</td><td><a href="javascript:void(0);" class="btn btn-danger  fa fa-remove js-remove-enum" title="删除"></a></td></tr>');
		
		return tr.join("");
	},
	//初始化自定义对话框
	initCustomDialog:function(){
		var _this =  this;
		var url =__ctx+ "/platform/data/dataTemplate/getSelectorData.htm?type=dialog",
			_key = 'key',
			_text = 'name',
	 	    rows = 20;
		var $el = $("#customDialog");
		
	//this.dialogData = {};
//	customDialog
    	$el.select2();
    	$el.select2('destroy');

	var placeholder = "请选择自定义对话框";
		var params = {
				theme: "bootstrap",
				language: "zh-CN",
				allowClear: true,
				placeholder:placeholder,
				formatSelection : function (item) {  //选择结果中的显示
					return item.text;
				},
	    		formatResult : function (item) {//【搜索】列表中的显示
					return (item != undefined && item.text != undefined)?item.text:"";  
	    		},
	    		createSearchChoice : function(term, data) {	//创建搜索结果（使用户可以输入匹配值以外的其它值）
			        return {id: term, text: term};
			    },
				escapeMarkup : function (markup) {
					return markup;
				},
				initSelection:function (element, callback) {
			       	return  callback(_this.dialogData);
	    		},
	    		templateSelection:function(item){
	    	    	if(!item || $.isEmpty(item.id))
			    		return  placeholder;
			    	return item? item.text:'';
	    		},
	    		templateResult: function (item) {
				    if (!item || !item.id) { 
				    	return "";
				    }
				    return item.text;
				},
				ajax : {
    				    url: url,
    				    dataType: 'json',
    				    delay: 250,
    				    data: function (_params) {
    				    	return {
    				    		queryName:_params.term,//查询
    				    		page : _params.page|| 1,// 第几页，分页哦
	                            rows : rows// 每页显示多少行
    				    	};
    				    }
    					,processResults: function (results,params) {
    			     		var data = results.data;
				            //重命名字段名
				            for (var i = 0; i < data.length; i++){
				            	var item =  data[i];
				                data[i].id = item[_key];
				                data[i].text = item[_text];
				            }
				            params.page = params.page || 1;
				            return {
				                results: data,
				                pagination : {
	                                more :  (params.page * rows) < results.totalCount// 总页数为10，那么1-9页的时候都可以下拉刷新
	                            }
				            };
    					 },
    				     cache: true
    				}
			};
		$el.select2(params);
		
		$el.on("change", function (e) {
    		var data = $el.select2("data"),value = "";
    		if($.isNotEmpty(data)){
    	  		_this.dialogData = {
    	  				id:data[0].id,
						text:data[0].text
    	  		}
    		}else{
    			_this.dialogData = "";
    		}
  
		});
		
	},
	/**
	 *  获取数据
	 * @returns
	 */
	getData:function(){
		var data = {},
			fieldType = $("#fieldType").val();
		
		data["field_type"]  =fieldType;
		
		var fieldOptions= this.getFieldOptions(fieldType);
		if($.isNotEmpty(fieldOptions))
			data["field_options"] = fieldOptions;
		
		return data;

	},
	getFieldOptions:function(fieldType){
		if($.isEmpty(fieldType))
			return;
		var field_options= {};
		if(fieldType =='datePicker' ||  fieldType =='dateRange' ){//日期格式
			field_options["datefmt_type"] = $("#datefmtType").val();
			field_options["datefmt"] = $("#datefmt").val();
		}else if(fieldType =='number' ){//日期格式
			field_options["number_type"] = $("#numberType").val();
		}else if( fieldType== 'select'  ||  fieldType== "radio" ||  fieldType== "checkbox" ||  fieldType== "enum"){//枚举
			var options = [];
			$('#enumTb tr').each(
					function(i, n) {
						var self = $(this);
						options.push({
							val :self.find("[name=val]").val(),
							label : self.find("[name=label]").val(),
						});
					});
			field_options['options'] = options;
		}else if(fieldType =='dictionary' ) {
			field_options['dictionary'] = $("#dicKey").val();
			field_options['dictionary_name'] = $("#dicName").val();
		}else if(fieldType =='selector' ) {
			field_options['selector_type'] = $("#selectorType").val();
			field_options['store'] = $("#store").val();
		}else if(fieldType =='customDialog' ) {
			field_options['store_mode'] = $("#store").val();
			field_options['dialog'] = this.dialogData?this.dialogData["id"]:'';
			field_options['dialog_name'] = this.dialogData?this.dialogData["text"]:'';
		}
		
		return field_options;
	}
	
};