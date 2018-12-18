
/**
 * t_course_param_modal
 * 
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：guanxinyu1997@outlook.com
 * 创建时间：2017-06-16 03:43:01
 *</pre>
 */
$(function() {
	courseParamModal  = new CourseParamModal();
	courseParamModal.init();
	formUrl = courseParamModal.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#courseParamModalGrid",// 列表对象
			PAGER : "#courseParamModalPager",// 列表分页
			FORM : '#courseParamModalForm'// 表单form
	};
	/**
	 * t_course_param_modal 对象
	 * @returns {CourseParamModal}
	 */
	CourseParamModal = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	CourseParamModal.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)//列表
				this._initGridList();
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
			}
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/gradp/course/courseParamModal/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['主键','分值模板名称','分值参数','管理'],
				        colModel: [{
				                 	   name:'id',
				                	   index: 'id_'

				                	 	,hidden:true,key:true
				                	 	}, {
				                 	   name:'name',
				                	   index: 'name'

				                	 					                	 	}, {
				                 	   name:'param',
				                	   index: 'param'

				                	 					                	 	},  {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/gradp/course/courseParamModal/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/gradp/course/courseParamModal/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/gradp/course/courseParamModal/get.htm?id={id}'
									}]
								} ],
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								}
	
					});
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
				var modelName = $('#cname').val();
				var id = $('#id').val();
				var url=__ctx+'/gradp/course/courseParamModal/save.htm';
				var courseParamPoList = [];
				var courseParamTable = $('body').find("table[name='courseParamPoList']");
				var trList = $(courseParamTable).find("tbody").find("tr");
				var totalScore = 0;
				$(trList).each(function(){
					var courseParamPo = {};
					var inps = $(this).find("input,select");
					var scorePower;
					var scorePower;
					$(inps).each(function(){
						var name = $(this).attr("name");
						var value = $(this).val();
						if(name=='scorePower'){
							scorePower = value;
							if(value <= 0 || value > 100){
								DialogUtil.error("分值有误！请检查分值");
								return;
							}
						}else if(name=='count'){
							var count = value;
							//console.log("scorePower:"+scorePower+",count:"+count)
							totalScore += scorePower;
							perScorePower = scorePower / count;
							courseParamPo['scorePower'] = perScorePower;
						}
						courseParamPo[name] = value;
					});
					courseParamPoList.push(courseParamPo);
				});
				var strJson = JSON2.stringify(courseParamPoList);
				
				$.post(url,{id:id,modelName:modelName,param:strJson},function(responseText){
					var resultMessage = new com.lc.form.ResultMessage(responseText);
				    if (resultMessage.isSuccess()) {
				    	DialogUtil.confirm(resultMessage.getMessage() + ',是否继续操作',
								function(rtn) {
								if(rtn)
									window.location.reload(true);
								else
									window.location.href=__ctx + "/gradp/course/courseParamModal/list.htm";
								});
					} else {
						DialogUtil.error(resultMessage.getMessage());
					}
				});	
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
			try{
				$('.clockpicker').clockpicker();
				$('.spinner').spinner({ 
				    max:100, 
				    min:1, 
				    step:1 
				}); 
			}catch(e){
				
			}
		},
		/**
		 * 表单成功返回信息
		 * 
		 * @param responseText
		 */
		_showResponse : function(responseText) {
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/gradp/course/courseParamModal/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		/**
		 * 删除子表数据
		 */
		addSub : function(tableName) {
			var me = this;
			var table = $("table[name='"+tableName+"']");
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val();
			if(undefined == subSize || null == subSize) subSize = 0;
			subSize = parseInt(subSize)+1;
			$(subSizeObj).val(subSize);
			$(table).find("tfoot").find("tr").find("td").html("共" + (subSize) + "条");
			
			// 添加一行
			var templateId = tableName+"TrTemplate";
			var html = template(templateId, {index:subSize});
			
			$(table).find("tbody").append(html);
			try{
				$('.clockpicker').clockpicker();
				$('.spinner').spinner({ 
				    max:100, 
				    min:1, 
				    step:1 
				}); 
			}catch(e){
				
			}
		},
		/**
		 * 删除子表数据
		 */
		removeSub : function(tableName,obj) {
			var me = this;
			// 删除一行
			var trObj = $(obj).parent().parent();
			$(trObj).nextAll().each(function(){
				var firstObj = $(this).find("td:first");
				var index = $(firstObj).html();
				$(firstObj).html(parseInt(index) - 1);
			});
			$(trObj).remove();
			
			// 修改记录数
			var table = $("table[name='"+tableName+"']");
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val();
			if(undefined == subSize || null == subSize) subSize = 0;
			subSize = parseInt(subSize)-1;
			$(subSizeObj).val(subSize);
			$(table).find("tfoot").find("tr").find("td").html("共" + (subSize) + "条");
		},
		/**
		 * 删除子表选中数据
		 */
		removeSubSelected : function(tableName) {
			var me = this;
			// 删除一行
			var table = $("table[name='"+tableName+"']");
			
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val();
			if(undefined == subSize || null == subSize) subSize = 0;
			subSize = parseInt(subSize)-1;
			$(subSizeObj).val(subSize);
			$(table).find("tfoot").find("tr").find("td").html("共" + (subSize) + "条");
		},
		/**
		 * 删除子表选中数据
		 */
		removeSubAll : function(tableName) {
			var me = this;
			// 删除一行
			var table = $("table[name='"+tableName+"']");
			$(table).find("tbody").html("");
			
			// 修改记录数
			var subSizeObj = $(table).find("tfoot").find("input[name='subSize']");
			var subSize = $(subSizeObj).val("0");
			$(table).find("tfoot > tr > td").html("共0条");
		},
		editParam:function(cateId,cateKey){
			var me=this;
			var url=__ctx+'/platform/basic/deviceCate/editParam.htm?cateId='+cateId+"&cateKey="+cateKey;
			DialogUtil.dialog({
				title:'设备参数',
				content:url,
				index:'editParam',
				area: ['90%', '90%'],
				btn:[{
						label:'保存',
						iconCls:'btn btn-success fa fa-ok',
						action:function(dialog,index){
							me.saveParams(cateKey,index);
						}
					},{
						label:'取消',
						iconCls:'btn btn-success fa fa-cancel',
						action:function(dialog,index){
							DialogUtil.close(index);
						}
						
					}
					]
				
			});
			
		},
		saveParams:function(cateKey,index){
			var win=DialogUtil.getChildFrameWindow(index);
			var url=__ctx+'/platform/basic/deviceCate/saveParam.htm';
			var deviceParamPoList = [];
			var deviceParamTable = $(win.document).find("table[name='deviceParamPoList']");
			var trList = $(deviceParamTable).find("tbody").find("tr");
			$(trList).each(function(){
				var deviceParamPo = {};
				var inps = $(this).find("input,select");
				$(inps).each(function(){
					var name = $(this).attr("name");
					var value = $(this).val();
					deviceParamPo[name] = value;
				});
				deviceParamPoList.push(deviceParamPo);
			});
			var strJson = JSON2.stringify(deviceParamPoList);
			
			$.post(url,{cateKey:cateKey,data:strJson},function(responseText){
				var resultMessage = new com.lc.form.ResultMessage(responseText);
			    if (resultMessage.isSuccess()) {
			    	DialogUtil.confirm(resultMessage.getMessage() + ',是否继续操作',
							function(rtn) {
							if(rtn)
								window.location.reload(true);
							else
								DialogUtil.closeAll();
							});
				} else {
					DialogUtil.error(resultMessage.getMessage());
				}
			});	
		}
		
	};
})();

function cg(){
	$('a.fa-search').click();
}
