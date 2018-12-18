/**
 * 参与者属性弹出框
 * 
 * <pre>
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年11月7日-上午11:13:21
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
var partyDialogAttr;
var single = window.isSingleSelector, partyOrgTree=null;
$(function() {
	partyDialogAttr = new PartyDialogAttr();
	partyDialogAttr.init();

});

(function() {
	var userTemplate = '<tr style="height:55px;"><td><label class="search-label">邮箱</label>:</td><td><input type="text" name="Q^EMAIL_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">微信账号</label>:</td><td><input type="text" name="Q^WC_ACCOUNT_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">地址</label>:</td><td><input type="text" name="Q^ADDRESS_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">QQ</label>:</td><td><input type="text" name="Q^QQ_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">电话</label>:</td><td><input type="text" name="Q^MOBILE_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">性别</label>:</td><td><select name="Q^GENDER_^S" class="form-control search-select"><option value=""></option><option value="male" select-male="">男</option><option value="female" select-female="">女</option></select></td></tr>';
	var employeeTemplate = '<tr style="height:55px;"><td><label class="search-label">账号</label>:</td><td><input type="text" name="Q^ACCOUNT_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">邮箱</label>:</td><td><input type="text" name="Q^EMAIL_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">微信账号</label>:</td><td><input type="text" name="Q^WC_ACCOUNT_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">地址</label>:</td><td><input type="text" name="Q^ADDRESS_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">QQ</label>:</td><td><input type="text" name="Q^QQ_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">电话</label>:</td><td><input type="text" name="Q^MOBILE_^SL" value="" class="form-control"></td></tr><tr style="height:55px;"><td><label class="search-label">性别</label>:</td><td><select name="Q^GENDER_^S" class="form-control search-select"><option value=""></option><option value="male" select-male="">男</option><option value="female" select-female="">女</option></select></td></tr>';
	var template = '<tr style="height: 55px;"><td><label class="search-label">#label#</label>:</td><td><input type="text" name="#name#" value="#value#" label="#label#" class="form-control" /></td></tr>';
	
	// 定义常量
	var _consts = {
		TABLE: '.tab-content .toolbar-body table',//内容主体
		FORM: '.tab-content .toolbar-body form'
	};
	
	/**
	 * 用户选择框 对象
	 * 
	 * @returns {PartyDialogAttr}
	 */
	PartyDialogAttr = function() {
		
	};

	/**
	 * 方法
	 */
	PartyDialogAttr.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			
			this.hasInit = true;
			//初始参数
			var params = frameElement.dialog.params;
			this.partyType = params.partyType;
			this.data = params.params;
			this.selectorType = params.selectorType;
			this.callback = params.callback;
			//初始化页面数据
			this._initOriginalAttr();
			this._initData();
		},
		_initOriginalAttr: function(){
			if(this.selectorType=='user'){
				$(this.consts.TABLE).append(userTemplate);
			}else if(this.selectorType=='employee'){
				$(this.consts.TABLE).append(employeeTemplate);
			}
		},
		/**
		 * 初始数据
		 */
		_initData:function(){
			if($.isEmpty(this.data))
				return;
			for(var i=0,c,e;c=this.data[i++];){
				e = $(this.consts.TABLE).find("input[name='"+c.name+"']");
				for(var j=0,el;el=e[j++];){
					if(el.type=="text"){
						$(el).val(c.value);
					}else if((el.type=="radio"||el.type=="checkbox")&&c.value!=""){
						e = $(this.consts.TABLE).find("input[name='"+c.name+"'][value='"+c.value+"']").attr("checked",true);
					}
				}
				if(e.length==0){
					e = $(this.consts.TABLE).find("select[name='"+c.name+"']");
					e.find("option[value='"+c.value+"']").attr("selected",true);
				}
				
			}
		},
		
		/**
		 * 获取数据
		 */
		getData: function(){
			return $(this.consts.FORM).serializeArray();
		},
		/**
		 * 清除数据
		 */
		clearData: function(){
			$(this.consts.FORM).not(':button,:submit,:reset,:hidden').val('').removeAttr('checked').removeAttr('selected'); 
		}

	};
})();