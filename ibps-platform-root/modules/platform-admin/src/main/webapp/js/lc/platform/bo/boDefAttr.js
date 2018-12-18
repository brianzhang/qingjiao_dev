/**
 * 业务实体字段（属性）
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-11-24 15:48:34
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	boDefAttr  = new BODefAttr();
	boDefAttr.init();
});


function getData(){
	return boDefAttr.getData();
}

function refresh(){
	window.location.href=window.location.href;
}

(function() {
	/**
	 * 业务实体包 对象
	 * @returns {BOPackage}
	 */
	BODefAttr = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BODefAttr.prototype = {
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.initChangeDataType();
			this.initData();
			this.initPinyin();
		},
		initPinyin : function(){
			$("#name").blur(function() {
				var pinyin = new ChineseToPinyin();
				pinyin.getPinyin({
					param : {
						type : 'spelling',
						mode : 'first',
						chinese : $(this).val()
					},
					callback : function(data) {
						if ('' === $("#code").val()) {
							if(data.length > 0){
								data = data.substring(0,1).toLowerCase() + data.substring(1);   
							}
							$("#code").val(data);
							var camel = new CamelToCase();
							camel.getCamel({
								param : {
									type : 'camel',
									underscore : data
								},
								callback : function(camelData) {
									if ('' === $("#fieldName").val()) {
										$("#fieldName").val(camelData);
									}
								}
							});
						}
					}
				});
			});
		},
		/**
		 * 初始化更改数据类型
		 */
		initChangeDataType:function(){
			var me =this;
			$("#dataType").on("change",function(){
				me.setDataType($(this).val());
			});
		},
		setDataType:function(val,data){
			var  attrLength = '',precision='',format='';
			if(val == 'varchar'){ //字符串
				$(".attrLength").show();
				$(".precision").hide();
				$(".format").hide();
				$(".precision-group").hide();
				attrLength = '64';
				precision = '';
			}else if(val == 'number'){ //数字
				$(".attrLength").show();
				$(".precision").show();
				$(".format").hide();
				$(".precision-group").show();
				attrLength = '18';
				precision = '0';
			}else if(val == 'date'){//日期
				$(".attrLength").hide();
				$(".precision").hide();
				$(".format").show();
				$(".precision-group").show();
				format ='yyyy-MM-dd';
			}else if(val == 'clob'){//大字段
				$(".attrLength").hide();
				$(".precision").hide();
				$(".format").hide();
				$(".precision-group").hide();
			}else{
				$(".attrLength").show();
				$(".precision").hide();
				$(".format").hide();
				$(".precision-group").hide();
				attrLength = '64';
				precision = '';
			}
			if(data){
				attrLength = data.attrLength;
				precision = data.precision;
				format = data.format;
			}
			$('#attrLength').val(attrLength);
			$("#precision").val(precision);	
			$("#format").val(format);
		},
		/**
		 * 初始化页面数据
		 */
		initData:function(){
			var attr = frameElement.dialog.params; 
			if($.isEmpty(attr))
				return;
			$('#id').val(attr.id);
			$('#name').val(attr.name);
			$('#code').val(attr.code);
			$('#fieldName').val(attr.fieldName);
			if(attr.fieldName=='ID_'||attr.fieldName=='IP_'||attr.fieldName=='PARENT_ID_'
				||attr.fieldName=='CREATE_BY_'||attr.fieldName=='CREATE_TIME_'
				||attr.fieldName=='UPDATE_BY_'||attr.fieldName=='UPDATE_TIME_'){
				$('#fieldName').attr("readonly","readonly");
			}
			$('#desc').val(attr.desc);
			$('#defValue').val(attr.defValue);
			var dataType = attr.dataType;
			$("#dataType").val(attr.dataType);
			$("input[type=radio][name='isNull'][value='"+attr.isNull+"']").prop("checked","checked");
			this.setDataType(dataType,attr);
			
			$.post(__ctx+'/platform/bo/boDef/checkAttrCode.htm',{
				id:attr.id
				}
				,function(responseText){
					var msg = new com.lc.form.ResultMessage(responseText);
					if (!msg.isSuccess()) {
						$("#dataType").attr("disabled", true);
					}
			});
		},
		guid : function () {
			var a = function() {
				return Math.floor(Math.random() * 0x10000).toString(16);
			};
			return (a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a());
		},
		getData :function	(){
			var form = $('#boDefAttrForm'), frm = form.form();
			if (!frm.valid())
				return;
			var attr = {};
			var id=  $('#id').val();
			if($.isEmpty(id))
				id= this.guid();
			attr.id = id;
			attr.name = $('#name').val();
			attr.code = $('#code').val();
			attr.fieldName = $('#fieldName').val();
			attr.desc = $('#desc').val();
			attr.defValue = $('#defValue').val();
			attr.isRequired =$('#isRequired').val(); ;
			var dataType = $('#dataType').val();
			attr.dataType = dataType;
			attr.isNull =$("input[name='isNull']:checked").val();
			var attrLength='0',
				precision = '0',
				format = '';
			if(dataType =='varchar'){
				attrLength =  $('#attrLength').val();
				precision = '0';
				format ='';
			} else if(dataType =='number'){	//小数格式处理
				attrLength =  $('#attrLength').val();
				precision = $('#precision').val();
				format ='';
			}	else if(dataType =='date'){//日期格式处理
				attrLength =  '0';
				precision = '0';
				format =$('#format').val();
			}	else if(dataType =='clob'){ //大文本格式处理
				attrLength =  $('#attrLength').val();
				format ='';
			}
			
			attr.attrLength = attrLength;
			attr.precision = precision;
			attr.format = format;
			return attr;
		}
	};
})();


