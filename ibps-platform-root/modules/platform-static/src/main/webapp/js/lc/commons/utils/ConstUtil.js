/**
 * 	内置的验证规则。
 */
ConstUtil = {

		rules : [{
					name : "required",
					rule : function(v) {
						if (v == "" || v.length == 0)
							return false;
						return true;
					},
					title:"必填",
					formRule:true,
					msg :"必填"
				}, {
					name : "number",
					rule : function(v) {
						return /^-?[\$|￥]?((\d{1,3}(,\d{3})+?|\d+)(\.\d{1,5})?)$/
								.test(v.trim());
					},
					title:"数字",
					formRule:true,
					msg : "请输入一个合法的数字"
				}, {
					name : "variable",
					rule : function(v) {

						return /^[A-Za-z_][A-Za-z_]*$/.test(v.trim());
					},
					title:"字母或下划线",
					formRule:true,
					msg :"只能是字母、下划线"
				}, {
					name : "fields",
					rule : function(v){
						return /^[A-Za-z]{1}([a-zA-Z0-9_]{1,17})?$/gi.test(v.trim());
					},
					msg : "首字符为字母，其它只能为字母、数字或下划线，并且长度不超过18字符"
				},{
					name : "minLength",
					rule : function(v, b) {
						return (v.length >= b);
					},
					msg : "长度不少于{0}"
				}, {
					name : "maxLength",
					rule : function(v, b) {
						return (v.trim().length <= b);
					},
					msg : "长度不超过{0}"
				}, {
					name : "rangeLength",
					rule : function(v, args) {
						return (v.trim().length >= args[0] && v.trim().length <= args[1]);
					},
					msg : "长度必须在{0}之{1}间"
				}, {
					name : "date",
					rule : function(v) {
						var re = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/
								.test(v.trim());
						return re;
					},
					title:"日期",
					formRule:true,
					msg : "请输入一合法的日期"
				}, {
					name : "digits",
					rule : function(v) {
						return /^\d+$/.test(v.trim());
					},
					title:"整数",
					formRule:true,
					msg : "请输入整数"
				}, {
					name : "equalTo",
					rule : function(v, b) {
						var a = $("#" + b).val();
						return (v.trim() == a.trim());
					},
					msg :"两次输入不等"
				}, {
					name : "range",
					rule : function(v, args) {
						return v <= args[1] && v >= args[0];
					},
					msg : "请输入在{0}到{1}范围之内的数字"
				}, {
					name : "maxvalue",
					rule : function(v, max) {
						return v <= max;
					},
					msg : "输入的值不能大于{0}"
				},{
					name : "minvalue",
					rule : function(v, min) {
						return v >= min;
					},
					msg :"输入的值不能小于{0}"
				},{		// 判断数字整数位
					name : "maxIntLen",
					rule : function(v, b) {
						if(/^[\$|￥]/.test(v.trim())){
							return (v + '').split(".")[0].replaceAll(",","").replaceAll("￥|$","").length <= b+1;
						}else{
							return (v + '').split(".")[0].replaceAll(",","").length <= b;
						}
					},
					msg : "整数位最大长度为{0}"
				}, {
					// 判断数字小数位
					name : "maxDecimalLen",
					rule : function(v, b) {
						return (v + '').replace(/^[^.]*[.]*/, '').length <= b;
					},
					msg : "小数位最大长度为{0}"
				}, {
					name : "dateRangeStart",		// 判断日期范围{dateRangeStart:'xx'} xx：结束时间的日期的ID
					rule : function(v, b) {
						var end = $("#" + b).val();
						return daysBetween(v, end);
					},
					msg : "开始日期必须小于或等于结束日期"
				}, {
					name : "dateRangeEnd",// 判断日期范围{dateRangeEnd:'xx'} xx：开始时间的日期的ID
					rule : function(v, b) {
						var start = $("#" + b).val();
						return daysBetween(start, v);
					},
					msg : "开始日期必须小于或等于结束日期"
				},{
					name : "empty",
					rule : function(v, b) {
						return true;
					},
					msg : "不能以数字开头"
				},{
					name : "noDigitsStart",
					rule : function(v) {
						return /^(?!\d)\w+$/.test(v.trim());
					},
					title:"不以数字开头",
					formRule:true,
					msg:"不以数字开头"
				}, {
					name : "varirule",
					rule : function(v) {
						return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(v.trim());
					},
					title : "以字母开头",
					formRule:true,
					msg : "只能为字母开头,允许字母、数字和下划线"
				}, {
					name : "chinese",
					title : "汉字",
					formRule:true,
					rule : function(v) {
						return /^[\u4E00-\u9FA5]+$/i.test(v.trim());
					},
					msg : "请输入正确的汉字"
				}, {
					name : "name",
					title : "名称",
					formRule:true,
					rule : function(v) {
						return /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9]*[\u4E00-\u9FA5]*/i.test(v.trim());
					},
					msg : "请输入正确的名称"
				}, {
					name : "url",
					rule : function(v) {
						return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(v.trim());
					},
					title:"url",
					formRule:true,
					msg : "请输入一合法的网址"
				},
				{
					name : "QQ",
					title : "QQ号",
					formRule:true,
					rule : function(v) {
						return /^[1-9]*[1-9][0-9]*$/i.test(v.trim());
					},
					msg : "请输入正确的QQ号码"
				}, {
					name : "phone",
					title : "手机号码",
					formRule:true,
					rule : function(v) {
						return /^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$/.test(v.trim());
					},
					msg : "请输入正确的手机号码"
				},{
					name : "telephone",
					title : "电话号码",
					formRule:true,
					rule : function(v) {
						return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(v.trim());
					},
					msg : "请输入正确的电话号码"
				},{
					name : "zip",
					title : "邮政编码",
					formRule:true,
					rule : function(v) {
						return /^\d{6}$/.test(v.trim());
					},
					msg : "请输入正确的邮政编码"
				},{
					name : "idcard",
					title : "身份证号",
					formRule:true,
					rule : function(v) {
						return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(v.trim());
					},
					msg : "请输入正确的身份证号"
				},{
					name : "email",
					title : "邮箱",
					formRule:true,
					rule : function(v) {
						return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v.trim());
					},
					msg : "请输入正确的邮箱"
				}
				],
		isInDefaultRules:function(name){
			var tempRules = this.rules;
			for(var i=0;i<tempRules.length;i++){
				if(tempRules[i].name ==name){
					return true;
				}
			}
			return false;
		},
		getRuleByName:function(name){
			var tempRules = this.rules;
			for(var i=0;i<tempRules.length;i++){
				if(tempRules[i].name ==name){
					return tempRules[i];
				}
			}
			return null;
		}
};


