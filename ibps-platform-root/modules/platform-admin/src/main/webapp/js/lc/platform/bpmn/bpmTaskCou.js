/**
 * 流程任务
 * 
 * 
 * 
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：huangchunyan
 * 邮箱地址：370653110@qq.com
 * 创建时间：2017-01-06 09:26:18
 * </pre>
 */
$(function() {
	bpmTask = new BpmTask();
	bpmTask.init();
		$("#search").click(function(){
		   var procDefName=$("#procDefName").val();
		   $("#search").attr("href","cou.htm?proName="+procDefName); 
		});
//		$(function lick(obj, id） {
//			var td_content = $(obj).parents("tr").children("td");  //获取当前行中的所有td值
//			var key = td_content.eq(1).text(); //获取当前行第一个td的值
//			 alert(key);
//			  $("#"+id).attr("href","listCount.htm?type="+key); 
//			});
		});
		function lick(obj,id){
			debugger
			var procDefName=$("#procDefName").val();
			// alert(procDefName);
			var td_content=$(obj).parents("tr").children("td");
			var key=td_content.eq(1).text();
			//alert(key);
			$("#"+id).attr("href","listCount.htm?type="+key+"&proname="+procDefName);
			}
		
//		$("table").each(function(){  // 获取表格table中，第几个td的文本
//			var t1 =$(this).find('td').eq(1).text();
//			var t2 =$(this).find('td').eq(2).text();
//			alert(t1);
//			})
//		$("#detail"+t2).click(function(){
//			
//			 var key= $("#"+$("#val1").val()).val();
//			 alert(key);
//			  //$("#detail").
//			  $("#"+$("#val2").val()).attr("href","listCount.htm?type="+key); 
//			});
//});

(function() {
	// 定义常量
	var _consts = {
		GRID : "#bpmTaskGrid",// 列表对象
		PAGER : "#bpmTaskPager"// 列表分页
	};
	
	/**
	 * 流程任务 对象
	 * 
	 * @returns {BpmTask}
	 */
	BpmTask = function() {
		// 定义属性
	};

	/**
	 * 方法
	 */
	BpmTask.prototype = {
		consts : _consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0)// 列表
				this._initGridList();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID)
					.GridList(
							{
								url : __ctx+ '/platform/bpmn/bpmTask/listJson.htm',
								pager : this.consts.PAGER,
								colNames : [ 'ID', '请求标题', '任务名称', '候选人', '任务类型', '任务创建时间' ],
								colModel : [
										{
											name : 'id',
											hidden : true,
											key : true
										},
										{
											name : 'subject',
											index : 'subject_',
											formatter : function(val, opts,rowData) {
												return '<a href="javascript:bpmTask.doNext(\''+ rowData.id+ '\',\''+ val+ '\')">'+ val+ '</a>';
											},
											width : 100
										},
										{
											name : 'name',
											index : 'name_',
											width : 60
										},
										{
											name : 'ownerName',
											index : 'owner_id_',
											width : 40
										},
										{
											name : 'status',
											index : 'status_',
											width : 30,
											formatter : 'dataFormat',
											formatoptions : {
												value : [ {
													name : 'NORMAL',
													value : '普通',
													css : 'red'
												}, {
													name : 'AGENT',
													value : '代理',
													css : 'green'
												}, {
													name : 'DELIVERTO',
													value : '转交',
													css : 'red'
												}]
											}
										},
										{
											name : 'createTime',
											index : 'create_time_',
											formatter : "timestamp",
											formatoptions : "yyyy-MM-dd HH:mm:ss",
											width : 40
										} ],
								loadComplete : function() {
									try {
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									} catch (e) {
									}
								}

							});
		},
		
		/**
		 * 执行下一步
		 * @param id
		 * @param subject
		 */
		doNext:function(id,subject){
			subject= this.delHtmlTag(subject);
			DialogUtil.dialog({
				title:'任务办理--'+subject,
				content:__ctx+'/platform/bpmn/bpmTask/doNext.htm?id='+id,
			    area: ['100%', '100%'],
			    callback:function(){
			    	$(".fa-search").click();
			    }
			});
		},
		
		/**
		 * 去掉html标签
		 * @param str
		 * @returns
		 */
		delHtmlTag :function (str){
			  return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
		},
		
		/**
		 * 查看用户类型
		 * @param id
		 * @param type
		 */
		showInfo :function (id,type){
			if(type == "user"){
				UserInfoDialog(id).show();
			}else{
				alert("类型："+type+"   ID:"+id);
			}
		}
	};
})();
