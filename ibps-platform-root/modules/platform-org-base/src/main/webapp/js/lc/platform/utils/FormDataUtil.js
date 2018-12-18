var  Namespace;
if(!Namespace){
	 Namespace = new Object();

	Namespace.register = function(path) {
		var arr = path.split(".");
		var ns = "";
		for ( var i = 0; i < arr.length; i++) {
			if (i > 0)
				ns += ".";
			ns += arr[i];
			eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
		}
	};
}

Namespace.register("com.lc.form");

/**
 * 表单数据提交帮助类
 * <pre>
 * 作者:eddy
 * 邮箱:1546077710@qq.com
 * 日期:2017-03-8-下午3:29:34
 * 版权:广州流辰信息技术有限公司
 * </pre>
 */

/**
 * @param $form			表单对象，必填
 * @param $onValidate	表单校验前置动作，可选
 */
com.lc.form.FormData = function($form, onValidate){
	{
		this.form = $form;
		this.frm = $form.form();
		if(!$.isEmpty(onValidate) && $.isFunction(onValidate)){
			this.onValidate = onValidate;
		}
	}
	
	/**
	 * 获取表单数据
	 */
	this.getValue=function(){
		var data = {};
		// 获取主表数据
        data = this.getData("[name^='m:']", this.form);
        // 获取子表数据
        data = this.getSubData("table[name^='s:']", this.form, data);
		return data;
	};
	
	/**
	 * 触发表单校验
	 */
	this.validate=function(){
		if(!$.isEmpty(this.onValidate)){
			this.onValidate();
		}
		return this.frm.valid();
	};
	
	/**
	 * 子表操作初始化
	 */
	this.initSub=function(baseurl){
		this.baseurl = baseurl;
		var me = this;
		// 处理子表全选
		me.initChk();
		// 处理子表添加按钮
		$(document).on('click', 'table a.js-add-record', function() {
			var $table = $(this).parents().filter("table");
			me.editSub('add', $table, $(this));
			me.initChk();
		});
		// 处理子表查看按钮
		$(document).on('click', 'table a.js-detail-row', function() {
			var $table = $(this).parents().filter("table");
			me.detailDialog($table, $(this).parents().filter("tr"));
		});
		// 处理子表编辑按钮
		$(document).on('click', 'table a.js-edit-row', function() {
			var $table = $(this).parents().filter("table");
			me.editSub('edit', $table, $(this).parents().filter("tr"));
		});
		// 处理子表删除按钮
		$(document).on('click', 'table a.js-remove-record', function() {
			var $table = $(this).parents().filter("table");
			me.removeSubSelected($table);
		});
		// 处理子表删除按钮
		$(document).on('click', 'table a.js-remove-row', function() {
			$(this).parents().filter("tr").remove();
		});
	};
	
	/**
	 * 表格全选
	 */
	this.initChk = function(){
		var $table = $("table");
		$($table).each(function(){
			var $tabeName = $(this).attr("name");
			var $thead = $(this).find("thead");
			var $tbody = $(this).find("tbody");
			$(':checkbox[name="'+$tabeName+'"]', $thead).on('click',function(event){
				var $chkAll = $(this);
				var isChecked = $chkAll.is(':checked');
				var $chks = $(':checkbox[name="'+$chkAll.attr("name")+'"]', $tbody);
				$chks.each(function(){
					$(this).prop("checked", isChecked);
				});
			});
			$('tr', $tbody).on('click',function(event){
				//event.stopPropagation();
				var $chk = $(this).find(':checkbox[name="'+$tabeName+'"]');
				var isChecked = $chk.is(':checked');
				$chk.prop("checked", !isChecked);
			});
		});
	};
	
	/**
	 * 添加子表数据
	 */
	this.editSub = function(op, table, parent) {
		var options = $(table).data()
			,mode = $.isEmpty(options.mode)?"inner":options.mode
			;
		
		switch (mode) {
		case 'inner':
			this.editInner(table);
			break;
		case 'dialog':
			this.editDialog(op, table, parent);
			break;

		default:
			this.editInner(table);
			break;
		}
	};
	
	/**
	 * 子表表内添加一行数据
	 */
	this.editInner=function(table){
		var tableName = $(table).attr("name");
		// 表内编辑
		var templateId = tableName+":TrTemplate";
		var html = template(templateId, {idx : Math.ceil(Math.random()*10000000+1)});
		// 添加一行
		$(table).find("tbody").append(html);
	};
	
	this.detailDialog=function(table, parent){
		var data = this.getData("[name^='s:']", $(parent));
		var tableName = $(table).attr("name");
		var options = table.data()
			,pk = $.isEmpty(options.pk)?'id':options.pk;
		
		var subDoc = tableName.split(':')[1];
		var url = __ctx + this.baseurl + '/' + subDoc + '/get.htm?id='+data[pk];
		// 弹出框编辑
		DialogUtil.dialog({
			title:'查看子表数据',
			content:url,
			area:['66%','88%'],
			btn:[{
		    	label: '关闭',
		    	iconCls:'btn btn-danger fa fa-cancel',
		        action: function(dialog,index) {
		        	DialogUtil.close(index);
		        }
		    }]
		});
	};
	
	this.editDialog=function(op, table, parent){
		var data = 'edit' == op?this.getData("[name^='s:']", $(parent)):{};
		var tableName = $(table).attr("name");
		var subDoc = tableName.split(':')[1];
		var url = __ctx + this.baseurl + '/' + subDoc + '/edit.htm';
		// 弹出框编辑
		DialogUtil.dialog({
			title:'添加子表数据',
			content:url,
			params:{data:data},//传递参数
			area:['66%','88%'],
			btn:[{
				label: '确定',
				iconCls:'btn btn-primary fa fa-ok',
		        action: function(dialog,index) {
		      	  	var form = DialogUtil.getChildFrameWindow(index)[subDoc].formUrl;
		      	  	if(form.validate()){
		      	  		var data = form.getValue();
		          	  	if($.isEmpty(data)){
		          		  	DialogUtil.toastr("请正确输入！");
		          		  	return;
		          	  	}
		          	  	var templateId = tableName+":TrTemplate";
		          	  	data.idx = Math.ceil(Math.random()*10000000+1);
						var html = template(templateId, data);
						// 添加一行
						if('edit' == op){
							$(parent).before(html);
							$(parent).remove();
						}else{
							$(table).find("tbody").append(html);
						}
		          	  	DialogUtil.close(index);
		      	  	}
		        }
		    },  {
		    	label: '取消',
		    	iconCls:'btn btn-danger fa fa-cancel',
		        action: function(dialog,index) {
		        	DialogUtil.close(index);
		        }
		    }]
		});
	};
	
	/**
	 * 删除子表数据
	 */
	this.removeSubSelected = function(table) {
		var tableName = $(table).attr("name");
		// 删除选中数据
		var trArr = $(table).find("tbody").find(":checked[name='"+tableName+"']").parents().filter("tr");
		if(undefined == trArr || null == trArr || trArr.length == 0){
			DialogUtil.alert("请选择记录！");
			return;
		}
		
		$(trArr).each(function(){
			$(this).remove();
		});
	};
	
	/**
	 * 数据提交
	 */
	this.submit=function(callback, button, loading) {
		var action = $(this.frm[0]).attr('action');
		
		// 创建隐藏表单
        var $newForm = $("<form></form>");
        $($newForm).attr('action', action);
        $($newForm).attr('method', 'post');
        var data = {};
        
        // office提交
        //OfficePlugin.submit();
        
		// 获取主表数据
        data = this.getData("[name^='m:']", this.form);
        
        // 获取子表数据
        data = this.getSubData("table[name^='s:']", this.form, data);
        
        // 提交数据
        this.submit2($newForm, data, callback, button, loading);
	};
	
	/**
	 * 提交数据
	 * @param $newForm	隐藏表单
	 * @param $$frm		表单校验
	 * @param callback	回调函数
	 * @param data		JSON数据
	 */
	this.submit2=function($newForm, data, callback, button, loading){
		var dataStr = JSON2.stringify(data);
		$('textarea[name="json"]', $newForm).remove();
        var dataInput = "<textarea style='display:none;'  name='json'>" + dataStr + "</textarea>";
		$newForm.append(dataInput);
		$newForm.appendTo("body");
        $newForm.hide();
		$newForm.ajaxForm({
            success: function(responseText){
            	if(null != button) button.button('reset');
            	if(null != loading) DialogUtil.close(loading);
            	callback(responseText);
            },
            error:function(){
            	if(null != button) button.button('reset');
            	if(null != loading) DialogUtil.close(loading);
            }
        });
        if (this.frm.valid()) {
            $newForm.submit();
        }else{
        	if(null != button) button.button('reset');
        	if(null != loading) DialogUtil.close(loading);
        	DialogUtil.warn('数据校验不通过，请检查数据填写格式或必填项是否填写！');
        }
	};
	
	/**
	 * 读取表单数据
	 * @param dest 		表单控件name匹配值
	 * @param parent 	表单控件所在父容器
	 * @return JSON
	 */
	this.getSubData=function(dest, parent, data, mode){
		var me = this, mode = $.isEmpty(mode)?'s':mode;
		var profix = "PoList";
		
        $(dest, parent).each(function(){
        	var $table = $(this)
        		,options = $table.data()
        		,subName = $table.attr("name").split(":")[1]
        		,required = $.isEmpty(options.required)?false:options.required
        		,visible = $table.is(":visible");
        		;
        	
        	var subList = [];
        	var $tbody = $("tbody", $table);
        	
        	$("tr", $tbody).each(function(){
            	var $tr = $(this);
            	var sub = me.getData("[name^='s:']", $tr);
            	if(!$.isEmptyObject(sub)){
            		subList.push(sub);
            	}
            });
        	
        	if('s' == mode && visible && required && subList.length == 0){
        		var title = $("caption div:first", $table).text();
        		DialogUtil.warn(title+'数据不能为空！');
        		throw new error(title+'数据不能为空！');
        	}
        	
        	data[subName+profix] = subList;
        });
        
        return data;
	};
	
	/**
	 * 读取表单数据
	 * @param dest 		表单控件name匹配值
	 * @param parent 	表单控件所在父容器
	 * @return JSON
	 */
	this.getData=function(dest, parent){
		var data = {};
		
		$(dest, parent).each(function(){
        	var $data = $(this);
        	var name = $(this).attr("name").split(":")[2];
        	var value = $(this).val();
        	
        	// 单选框、复选框特殊处理 
        	if($(this).is('input') && "radio" == $(this).attr("type")){
        		if($(this).is(':checked') && !data[name]){
        			data[name] = value;
        		}
        	}else if($(this).is('input') && "checkbox" == $(this).attr("type")){
        		if($(this).is(':checked') && !data[name]){
        			data[name] = value;
        		}else if($(this).is(':checked') && data[name]){
        			data[name] = data[name]+  ',' + value;
        		}
        	}else{
        		data[name] = value;
        	}
        });
		
		return data;
	};
	
	/**
	 * 设置表单数据
	 * @param dest 		表单控件name匹配值
	 * @param parent 	表单控件所在父容器
	 * @param data 		表单数据
	 * @return JSON
	 */
	this.setData=function(dest, data, parent){
		if($.isEmpty(data) || $.isEmptyObject(data)){
			return;
		}
		
		if($.isEmpty(parent)){
			parent = this.form;
		}
		
		$(dest, parent).each(function(){
        	var $data = $(this);
        	var name = $data.attr("name").split(":")[2];
        	var value = data[name];
        	
        	if(undefined != value && !$.isEmpty(value)){
        		// 单选框、复选框特殊处理 
            	if($data.is('input') && "radio" == $data.attr("type") && $data.val() == value){
            		$data.prop("checked", true);
            	}else if($data.is('input') && "checkbox" == $data.attr("type") && value.indexOf($data.val())){
            		$data.prop("checked", true);
            	}else if($data.is('textarea')){
            		$data.text(value);
            	}else{
            		$data.val(value);
            	}
        	}
        });
	};
};
