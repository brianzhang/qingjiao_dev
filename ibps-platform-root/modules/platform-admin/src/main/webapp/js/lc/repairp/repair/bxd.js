
/**
 * t_bxd
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:05
 *</pre>
 */
$(function() {
	bxd  = new Bxd();
	bxd.init();
	
	formUrl = bxd.formUrl;
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bxdGrid",// 列表对象
			PAGER : "#bxdPager",// 列表分页
			FORM : '#bxdForm',// 表单form
			FORMGET : '#bxdFormGet'// 表单form
	};
	/**
	 * t_bxd 对象
	 * @returns {Bxd}
	 */
	Bxd = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	Bxd.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			if ($(this.consts.GRID).length > 0){//列表
				this._initGridList();
				
			}
			if ($(this.consts.FORM).length > 0){//表单
				this._initForm();
				this._initData();
				this._initOffice('e');
			}
			if ($(this.consts.FORMGET).length > 0){// 明细页面office控件初始化
				this._initOffice('r');
			}
			this.initGdcz();
			this.selectOpt();
		},
		_initOffice : function(_rights){
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			var $gdzt= window.parent.getGdzt();
			var PostData={gdzt:$gdzt};
			var nameModel ={
					colNames: ['工单状态','报修单号','维修工','报修时间','报修项目','报修地址',/*'报修区域','报修详细','报修人','联系方式','上传图片','工单类型','创建时间','受理人','执行人','维修工','模板ID'*/'管理'],
					colSubNames: ['工单状态','报修单号','维修工','报修时间','报修项目','报修地址',/*'报修区域','报修详细','报修人','联系方式','上传图片','工单类型','创建时间','受理人','执行人','维修工','模板ID'*/'管理'],
			        colModel: [ {
					                 	   name:'gdzt',
					                	   index: 'gdzt'

					                	 					               	},
					            {
					                	   name:'id',
					                	   index: 'id_'
					                	 ,hidden:false,key:true
					                	 				                	},
					                	 				                	 {
					                	 					                	  name:'wxg',
					                	 					                	  index: 'wxg'
					                	 					                	,hidden:false,key:true
					                	 					                						               },  	
					                	 				                	 	
					           {
					                       name:'yysj2',
					                	   index: 'yysj2'
					                	   
					           					}	 					    ,	 					               	
					           	{
								            name:'bxxm2',
								            index: 'bxxm2'

								                	 					     }, 
								                	 					    {
								            name:'xxdz',
								            index: 'xiang_xi_de_zhi_'

								          				             },
								          				           /*{
			                 	   name:'bxqy',
			                	   index: 'bao_xiu_qu_yu_'

			                	 					                	 	}, {
			                 	   name:'bxxx',
			                	   index: 'bao_xiu_xiang_xi_'

			                	 					                	 	},  {
			                 	   name:'bxr',
			                	   index: 'bao_xiu_ren_'

			                	 					                	 	}, {
			                 	   name:'lxfs',
			                	   index: 'lian_xi_fang_shi_'

			                	 					                	 	},{
			                 	   name:'sctp',
			                	   index: 'sctp'

			                	 					                	 	}, {
			                 	   name:'gdlx',
			                	   index: 'gong_dan_lei_xing_'

			                	 					                	 	}, {
			                	 	   name:'createTime',
			                	 	   index: 'create_time_'
			                	 	,formatter: 'timestamp'
			                	 	}, {
			                 	   name:'slr',
			                	   index: 'shou_li_ren_'

			                	 					                	 	}, {
			                 	   name:'zxr',
			                	   index: 'zhi_heng_ren_'

			                	 					                	 	}, {
			                 	   name:'wxg',
			                	   index: 'wei_xiu_gong_'

			                	 					                	 	}, {
			                 	   name:'mbid',
			                	   index: 'mu_ban_i_d_'

			                	 					                	 	}*/  {
								name : '__manage',
								width : 30,
								sortable:false,
								classes:'rowOps',
								formatter : 'manage',
								formatoptions :[{
									label:'编辑',
									classes:'btn btn-primary fa fa-edit',
									action:'javascript:bxd.options(\'+{id}+\',\"+{gdzt}+\",\"+{wxg}+\")'
								},{
									label:'删除',
									classes:'btn btn-primary fa fa-remove',
									action:__ctx+'/repairp/repair/bxd/remove.htm?id={id}'
								},{
									label:'明细',
									classes:'btn btn-primary fa fa-detail',
									action: __ctx+'/repairp/repair/bxd/get.htm?id={id}'
								}]
							} ],
							colSubModel: [ {
			                 	   name:'gdzt',
			                	   index: 'gdzt'

			                	 					               	},
			            {
			                	   name:'subbh',
			                	   index: 'subbh'
			                	 ,hidden:false,key:true
			                	 				                	},
			            {
			                	  name:'wxg',
			                	  index: 'wxg'
			                	,hidden:false,key:true
			                						               }  	 				                	
			                	 				                	 	
			           ,{
			                       name:'yysj2',
			                	   index: 'yysj2'
			                	   
			           					}	 					    ,	 					               	
			           	{
						            name:'bxxm2',
						            index: 'bxxm2'

						                	 					     }, 
						                	 					    {
						            name:'xxdz',
						            index: 'xiang_xi_de_zhi_'

						          				             },
						          				           /*{
	                 	   name:'bxqy',
	                	   index: 'bao_xiu_qu_yu_'

	                	 					                	 	}, {
	                 	   name:'bxxx',
	                	   index: 'bao_xiu_xiang_xi_'

	                	 					                	 	},  {
	                 	   name:'bxr',
	                	   index: 'bao_xiu_ren_'

	                	 					                	 	}, {
	                 	   name:'lxfs',
	                	   index: 'lian_xi_fang_shi_'

	                	 					                	 	},{
	                 	   name:'sctp',
	                	   index: 'sctp'

	                	 					                	 	}, {
	                 	   name:'gdlx',
	                	   index: 'gong_dan_lei_xing_'

	                	 					                	 	}, {
	                	 	   name:'createTime',
	                	 	   index: 'create_time_'
	                	 	,formatter: 'timestamp'
	                	 	}, {
	                 	   name:'slr',
	                	   index: 'shou_li_ren_'

	                	 					                	 	}, {
	                 	   name:'zxr',
	                	   index: 'zhi_heng_ren_'

	                	 					                	 	}, {
	                 	   name:'wxg',
	                	   index: 'wei_xiu_gong_'

	                	 					                	 	}, {
	                 	   name:'mbid',
	                	   index: 'mu_ban_i_d_'

	                	 					                	 	}*/  {
						name : '__manage',
						width : 30,
						sortable:false,
						classes:'rowOps',
						formatter : 'manage',
						formatoptions :[{
							label:'编辑',
							classes:'btn btn-primary fa fa-edit',
							action:'javascript:bxd.options(\'+{id}+\',\"+{gdzt}+\",\"+{wxg}+\")'
						},{
							label:'删除',
							classes:'btn btn-primary fa fa-remove',
							action:__ctx+'/repairp/repair/bxd/remove.htm?id={id}'
						},{
							label:'明细',
							classes:'btn btn-primary fa fa-detail',
							action: __ctx+'/repairp/repair/bxd/get.htm?id={id}'
						}]
					} ]	
			};
			$(this.consts.GRID).GridList(
					{
						url :  __ctx+'/repairp/repair/bxd/listJson.htm',
						postData: PostData,
						pager :this.consts.PAGER,
						colNames: nameModel.colNames,
						colModel: nameModel.colModel,
								loadComplete: function(){
									try{
										$('.rowOps').each(function() {
											$(this).rowOps();
										});
									}catch(e){}
								},
								subGrid: true,
								caption: "Grid as Subgrid",
								subGridRowExpanded: function(subgrid_id, row_id) {	
									console.log(subgrid_id,row_id);
									var subgrid_table_id, pager_id;
									subgrid_table_id = subgrid_id+"_t";
									pager_id = "p_"+subgrid_table_id;
									$("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");
									jQuery("#"+subgrid_table_id).jqGrid({
										url:__ctx+'/repairp/repair/bxd/subListJson.htm?id='+row_id,
										datatype: "json",
										colNames: nameModel.colSubNames,
										colModel: nameModel.colSubModel,
									   	//rowNum:20,
									   	pager: pager_id,
									   	width: '100%',
									    height: '100%'
									    	
									});
									jQuery("#"+subgrid_table_id).jqGrid('navGrid',"#"+pager_id,{edit:false,add:false,del:false})
								}
	
					});
		},
		
		options: function(id,gdzt,wxg){
			alert("options");
			//var gdzt = '0';
			var url = __ctx+'/repairp/repair/bxd/edit.htm?id='+id+'&gdzt='+gdzt+'&wxg='+wxg;
			DialogUtil.dialog({
				   content: url,
				   title: '新增报修单',
				   area: ['600px', '550px'],
				   params:{},
				   shade:0,
				   id:"",//一个节点只能弹出一个窗口
				   resizing: function(layero){//窗口拉伸监听回调
//					   console.log(layero);
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
				// office提交
        		OfficePlugin.submit();
				me.formUrl.submit(me._showResponse);
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
			var msg = new com.lc.form.ResultMessage(responseText);
			if (msg.isSuccess()) {
				DialogUtil.confirm(msg.getMessage() + ',是否继续操作',
						function(rtn) {
						if(rtn)
							window.location.reload(true);
						else
							window.location.href = __ctx+'/repairp/repair/bxd/f.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		
		initGdcz : function(){
			
			$("div.fr_response_field.col-sm-12.wxg").addClass("importantToolbox");
			$("div.fr_response_field.col-sm-12.bz").addClass("importantToolbox");
			$("div.fr_response_field.col-sm-12.wxgs").addClass("importantToolbox");
			$("div.fr_response_field.col-sm-12.shy").addClass("importantToolbox");
			
			$("select.form-control.col-sm-12.selectOpt option[value='已受理']").remove();
			$("select.form-control.col-sm-12.selectOpt option[value='已派工']").remove();				
			$("select.form-control.col-sm-12.selectOpt option[value='多人派工']").remove();
			$("select.form-control.col-sm-12.selectOpt option[value='已暂停']").remove();
			$("select.form-control.col-sm-12.selectOpt option[value='已接单']").remove();
			$("select.form-control.col-sm-12.selectOpt option[value='已完工']").remove();
			$("select.form-control.col-sm-12.selectOpt option[value='已退回']").remove();
			$("select.form-control.col-sm-12.selectOpt option[value='已暂停']").remove();
			$("select.form-control.col-sm-12.selectOpt option[value='转单']").remove();	
			var gdzt = $("#gdzt").val();
			var roleName = $("#roleName").val();
			var isFinish = $("#isFinish").val();
			
			if(gdzt == ''|| gdzt=="已完工" || gdzt=="已退回" || gdzt=="已暂停"){
				//alert(gdzt);
				$("div.fr_response_field.col-sm-12.gdcz").addClass("importantToolbox");
				//$("div.gdcz").addClass("importantToolbox");
			}else if(gdzt == "未审核"){
				if(roleName =="报修审核员"){
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已受理'>受理</option>");
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已退回'>退回</option>");
				}				
			}else if(gdzt == "已受理"){
				if(roleName =="报修审核员"){
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已派工'>派工</option>");
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='多人派工'>多人派工</option>");
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已暂停'>暂停</option>");
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已转单'>转单</option>");
				}	
			}else if(gdzt == "已派工"){
				if(roleName =="报修审核员"){					
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已暂停'>暂停</option>");
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已转单'>转单</option>");
				}else if(roleName =="报修维修工"){
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='已接单'>接单</option>");
				}	
				
			}else if(gdzt == "已接单"){
				if(roleName =="报修维修工"){
					jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='完工申请'>完工申请</option>");
				}		
			}else if(gdzt == "完工申请"){
				if(roleName =="报修审核员"){	
					if(isFinish == "true"){
						jQuery("select.form-control.col-sm-12.selectOpt").append("<option value='完工确认'>完工确认</option>");
					}
				}
			}
			
		},
		
		selectOpt : function(){
			$(".form-control.col-sm-12.selectOpt").bind("change",function(){
				alert("select");
				 var dataname = $(this).val();
				 alert("select:"+dataname);
				if(dataname == "已派工"){
					$("div.fr_response_field.col-sm-12.wxg").removeClass("importantToolbox");
					$("div.fr_response_field.col-sm-12.bz").removeClass("importantToolbox");
					$("div.fr_response_field.col-sm-12.wxgs").addClass("importantToolbox");
					
				}else if(dataname == "已受理" || dataname == "已完工" || dataname == "已退回" || dataname == "已暂停"){
					$("div.fr_response_field.col-sm-12.wxg").addClass("importantToolbox");
				}else if(dataname == "已转单"){
					$("div.fr_response_field.col-sm-12.shy").removeClass("importantToolbox");
					$("div.fr_response_field.col-sm-12.wxgs").addClass("importantToolbox");
				}else if(dataname == "多人派工"){
					$("div.fr_response_field.col-sm-12.wxgs").removeClass("importantToolbox");
					$("div.fr_response_field.col-sm-12.shy").addClass("importantToolbox");
					$("div.fr_response_field.col-sm-12.wxg").addClass("importantToolbox");
				}
			})
		},
		
		getWorkType :function(){
			alert("getWorkType");
			//var flowIndex = $("#lcmc").val();
			 $.ajax({
				 url : __ctx+"/platform/org/partyEntity/getEntityStr.htm",
				 data : {'id':'427125802899865600'},
				 success : function(data){			
					 var itemObj =JSON.parse(data)
					 
					 for(var i=0;i<itemObj.length;i++){
						 $("select.fr-form-control.workType").append("<option value='"+itemObj[i].empId+"'>"+itemObj[i].name+"</option>");
					 }
						 
				 }
				 
			 })
		}
		
		
		
		
		
	};
})();


