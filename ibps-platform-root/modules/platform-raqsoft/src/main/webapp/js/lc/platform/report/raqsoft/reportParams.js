
/**
 * 报表参数
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-06-28 14:32:41
 *</pre>
 */
$(function() {
	reportParams  = new ReportParams();
	reportParams.init();
	
	formUrl = reportParams.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#reportParamsGrid",// 列表对象
			PAGER : "#reportParamsPager",// 列表分页
			FORM : '#reportParamsForm'// 表单form
	};
	/**
	 * 报表参数 对象
	 * @returns {ReportParams}
	 */
	ReportParams = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	ReportParams.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.reportType = $("#reportType").val();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
			this._initBtn();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			me.formUrl = new com.lc.form.FormData(form);
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				var $el = $(this);
				$el.button('loading');
				me.formUrl.submit(me._showResponse, $el);
			});
		},
		/**
		 * 初始化数据
		 */
		_initData : function(){
			if(!$.isEmpty(frameElement) 
				&& !$.isEmpty(frameElement.dialog) 
				&& !$.isEmpty(frameElement.dialog.params)
				&& !$.isEmpty(frameElement.dialog.params.data)){
				var data = frameElement.dialog.params.data;
				this.formUrl.setData("[name^='m:']", data);
			}
			this.formUrl.validate();
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText),me=this;
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/platform/report/reportDef/list.htm?reportType='+me.reportType;
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		_initBtn:function(){
			this.addOption();
			this.delOption();
			this.changeOption();
			this.initOpt(controlType);
		},
		initControlOption:function(){
			var me = this,opt="{",type=$(".controlType-select").val(),tds;
			if(type=='select'){
				opt += '"option":[';
				var temp = '';
				$(".option-table tr").each(function(index,item){
					tds = $(this).find("td");
					temp += '{"checked":' + ($(tds[0]).find("input[type=radio]")).get(0).checked + 
						',"val":"' + $(tds[1]).find("input").val() + 
						'","label":"' + $(tds[2]).find("input").val() + '"},';
				});
				if(temp.length>0)
				temp = temp.substring(0,temp.length-1);
				opt += temp + "]";
			}else if(type=='datePicker'){
				var option = $(".option-datePicker option:selected");
				opt += '"datefmt_type":"'+ option.val() + '","datefmt":"'+option.attr("datefmt")+'"';
			}
			opt +="}";
			$("#controlOptions").val(opt);
			return opt;
		},
		addOption:function(){var me = this;
//			var template='<tr><td><input type="radio" name="optionRadio"></td><td><input type="text" class="fr-form-control" placeholder="选项key"></td><td><input type="text" class="fr-form-control" placeholder="展示值"></td><td><i data-role="remove_choice" class="js-remove-option fa fa-minus-circle"></i></td></tr>';
			$(document).on("click", ".add-option-button", function(){
				$(".option-table").append(template("s:reportParams:option",{}));
			});
		},
		delOption:function(){
			$(document).on("click", ".js-remove-option", function(){
				$(this).parent().parent().remove();
			});
		},
		changeOption:function(){
			var me = this;
			$(".controlType-select").on("change",function(){
				me.initOpt(this.value);
			});
		},
		initOpt: function(type,option){
			var form = $(".fr-form"),temp,selectOption='',data={},options = JSON.parse(controlOptions?controlOptions:"{}");
			//删除原有的控件选项
			temp = form.find(".options");
			if(temp.length>0) temp.remove();
			
			if(type=="select"){
				temp = template("s:reportParams:"+type, data);
				form.append(temp);
				for (var i = 0,obj,d={}; obj = options.option[i++]; ) {
					d.checked = obj.checked;
					d.value = obj.val;
					d.label = obj.label;
					selectOption += template("s:reportParams:option",d);
				}
				$(".option-table").append(selectOption);
			}else if(type=="datePicker"){
				data.dateType = options.datefmt_type;
				temp = template("s:reportParams:"+type, data);
				form.append(temp);
			}
		}
	};
})();


