/**
 * 选择对话框
 * 
 * 
 * <br>
 * 
 * 2、在输入框输入支持 <input data-custom-dialog="subFlowSel"/>
 * 
 * 3、在输入框清空支持 <input data-toggle="clear"/>
 * 
 * <pre>
 * 作者:hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-11-02-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	$('[data-custom-dialog]').each(function() {
		var $el = $(this), 
			options = $el.data(),
			alias = options.customDialog,
			bind = options.bind? eval('('+options.bind+')'):null;
		
		// 绑定点击事件
		$el.click(function(){
			if(!bind){
				alert("请设置绑定对象！");
				return;
			}
			CustomDialogUtil.open(alias,{
				
			},function(data){
				if($.isEmpty(data))
					return;
				var  result = data[0];
				$.each(bind,function(key,v) {
					$(v).val(result[key]).blur();
				});
				$el.focus();
			});
			
			});
	});
});