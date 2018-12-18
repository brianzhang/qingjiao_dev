/**
 * 流程分管授权
 * 
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-02-06 15:02:11
 *</pre>
 */
$(function() {
	bpmAuth  = new BpmAuth();
	bpmAuth.init();
});

(function() {
	//定义常量
	var 	_consts = {
			GRID : "#bpmAuthGrid",// 列表对象
			PAGER : "#bpmAuthPager",// 列表分页
			FORM : '#bpmAuthForm',// 表单form
			GET_FORM : '#getBpmAuthForm'// 表单form
	};
	/**
	 * 流程分管授权 对象
	 * @returns {BpmAuth}
	 */
	BpmAuth = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	BpmAuth.prototype = {
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
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
			if ($(this.consts.GET_FORM).length > 0)
				this._initGetForm();
		},
		/**
		 * 初始列表
		 */
		_initGridList : function() {
			var me = this;
			$(this.consts.GRID).GridList({
						url :  __ctx+'/platform/bpmn/auth/bpmAuth/listJson.htm',
						pager :this.consts.PAGER,
						colNames: ['ID','授权名称','授权人员','授权流程','授权类型','管理'],
				        colModel: [{
				                 	   	name:'id',
				                	 	hidden:true,
				                	 	key:true
				                	 }, {
				                		 name:'name',
				                		 index: 'NAME_',
				                		 width : 80
				                	 },{
				                		 name:'rightsOwnerList',
				                		 width :80,
			                			formatter : function(val,row,index){
			                				if($.isEmpty(val)){
					       						return '<span class="owner-span">暂无授权人员</span>';
					       					}
			                	    	 	var returnStr = '';
            					    	 	for(var i=0;i<val.length;i++){
            									var owner=val[i];
            				                    returnStr += '<span class="owner-span">';
            				                    if(owner.type=='all'){
            				                    	returnStr += '所有人 ';
            				                   	}else if(owner.type=='user'){
            				                   		returnStr += '<a ownerId="'+owner.rightsId+'" hrefstr="'+__ctx+'/platform/bpm/bpmDefAuthorize/userDetail.htm?userId='+owner.rightsId+'" href="javaScript:void(0)">'+owner.rightsName+'</a>';
            				                   		//returnStr += '<a onclick="openDetailEvent(this)" ownerId="'+owner.rightsId+'" hrefstr="'+__ctx+'/platform/bpm/bpmDefAuthorize/userDetail.htm?userId='+owner.rightsId+'" href="javaScript:void(0)">'+owner.rightsName+'</a>';
            				                   	}else{
            				                   		returnStr += owner.rightsName;
            				                   	}
            				                    returnStr += '</span>';
            								} 
            								return returnStr; 
			                			}
				                	 }, {
				                		name:'rightsDefList',
				                		width : 80,
				                		formatter : function(val,row,index){
			                				if($.isEmpty(val)){
					       						return '<span class="owner-span">暂无授权流程</span>';
					       					}
	                			    	 	var returnStr = '';
	                			    	 	for(var i=0;i<val.length;i++){
	                							var owner=val[i];
	                		                    returnStr += '<span class="owner-span">';
	                		                    returnStr += ' <a defKeyId="'+owner.defKey+'" href="javaScript:void(0)">'+owner.defName+'</a>';
	                		                    //returnStr += ' <a onclick="openActDetailEvent(\''+owner.defKey+'\')" defKeyId="'+owner.defKey+'" href="javaScript:void(0)">'+owner.defName+'</a>';
	                		                    returnStr += '</span>';
	                						} 
	                						return returnStr; 
			                			}
				                	 }, {
			                		name:'type',
			                	   	width : 30,
				       				formatter : function(val,row,index){
				       					if($.isEmpty(val)){
				       						return '<span class="owner-span">暂无授权类型</span>';
				       					}
				       				var r = val.split(","),returnStr="";
			       					for (var i = 0; i < r.length; i++) {
		       							 var type=r[i];
		       							returnStr += '<span class="owner-span">';
		       		                    if(type=='task'){
		       		                    	returnStr += '任务';
		       		                   	}else if(type=='start'){
		       		                   		returnStr += '启动';
		       		                   	}else if(type=='instance'){
		       		                   		returnStr += '实例';
		       		                   	}else if(type=='manage'){
		       		                   		returnStr += '定义';
		       		                   	}else{
		       		                   		returnStr += '暂时未明';
		       		                   	}
		       		                 returnStr += '</span>';
		       						 }
				       					return returnStr; 
				       				}
			                	 }, {
									name : '__manage',
									width : 30,
									sortable:false,
									classes:'rowOps',
									formatter : 'manage',
									formatoptions :[{
										label:'编辑',
										classes:'btn btn-primary fa fa-edit',
										action:__ctx+'/platform/bpmn/auth/bpmAuth/edit.htm?id={id}'
									},{
										label:'删除',
										classes:'btn btn-primary fa fa-remove',
										action:__ctx+'/platform/bpmn/auth/bpmAuth/remove.htm?id={id}'
									},{
										label:'明细',
										classes:'btn btn-primary fa fa-detail',
										action: __ctx+'/platform/bpmn/auth/bpmAuth/get.htm?id={id}'
									}]
								} ]
	
					});
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			var me = this, form = $(this.consts.FORM), frm = form.form();
			// 触发表单验证
			frm.valid();
			// 处理表单保存
			$(document).on('click', 'a.fa-save', function() {
				frm.ajaxForm({
					success : me._showResponse
				});
				if (frm.valid()){
					var rightsDef = me.getRightsDefVal();
					$('#rightsDef').val(JSON.stringify(rightsDef));
					form.submit();
				}
				
			});
			
			me.rightsTypes = $.parseJSON($('#rightsTypes').val());
			
			me.initData();
			//处理类型
			me.handerAuthTypes();
			//处理授权人员
			me.handerOwner();
			//流程授权
			me.handerFlow();
			//处理快捷设置
			me.handerQuickSetting();
		},
		_initGetForm : function() {
			var me = this, form = $(this.consts.get_FORM), frm = form.form();
			me.rightsTypes = $.parseJSON($('#rightsTypes').val());
			
			me.initData();
			//处理类型
			me.handerAuthTypes();
			//处理授权人员
			me.handerOwner();
			//流程授权
			me.handerFlow();
			//处理快捷设置
			me.handerQuickSetting();
			$(":checkbox").each(function(i){
				$(this).attr("disabled", "disabled");
			});
		},
		getRightsDefVal:function(){
	    	var rightsDef= new Array();
	    	$(".myDefKey",$("#rightsDefItem")).each(function(index) {
	    		var self = $(this), tr = self.closest("tr");
	    		
	    		var rights= {	 
	    		  };
    			$("input[name='m_right']",tr).each(function(){
        			var rightMe = $(this),keyStr =  rightMe.val(),valueStr = rightMe.is(":checked")?"Y":"N";
        			rights[keyStr] = valueStr;
        		});
			    			
    			$("input[name='i_right']",tr).each(function(){
        			var rightMe = $(this),keyStr =  rightMe.val(),valueStr = rightMe.is(":checked")?"Y":"N";
        			rights[keyStr] = valueStr;
        		});
	    		
	    		var obj = {
	    				defKey:self.val(),
						defName:self.attr("defName"),
						rights:rights
				};
	    		rightsDef.push(obj);
	    	});
	    	return rightsDef;
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
							window.location.href = __ctx+'/platform/bpmn/auth/bpmAuth/list.htm';
						});
			} else {
				DialogUtil.error(msg.getMessage());
			}
		},
		handerAuthTypes:function(){
			$(document).on("click", "input[name='authorizeTypes']", function() {
		    	var bpmDefActTable = $("#bpmDefActTable");
				$("input[name='authorizeTypes']").each(function(){
		    		var me = $(this);
	                var authorizeType = me.val();
	                var myChecked = me.is(":checked");
	                if(authorizeType=="management"){
			            if(myChecked){
			            	$("div[name='m_right_div']",bpmDefActTable).show();
						//	$("#am_right_div").show();
			            }else{
			            	$("div[name='m_right_div']",bpmDefActTable).hide();
						//	$("#am_right_div").hide();
			            }
						
					}else if(authorizeType=="instance"){
						if(myChecked){
							$("div[name='i_right_div']",bpmDefActTable).show();
						//	$("#ai_right_div").show();	            	
						}else{
							$("div[name='i_right_div']",bpmDefActTable).hide();
						//	$("#ai_right_div").hide();
						}
					}else{
						/* $("div[name='m_right_div']",bpmDefActTable).hide();
						$("#am_right_div").hide();
						$("div[name='i_right_div']",bpmDefActTable).hide();
						$("#ai_right_div").hide(); */
					}
				});
			});
		},
		handerOwner:function(){
			var me=this;
			//设置权限
			$(document).on("click", "#addOwner", function() {
				var data = "",rightsOwner =  $("#rightsOwner").val();
				if(!$.isEmpty(rightsOwner))
					data =  eval('(' + rightsOwner +')');
				new RightsDefDialog({
					title:'设置权限',
					key:'bpmAuth',
					data:data,
					callback:function(data){
						$('#rightsOwner').val(JSON.stringify(data));
						me.setRightsOwner(data);
					}
				}).show();
			});
			//重置权限
			$(document).on("click", "#resetOwner", function() {
				DialogUtil.confirm( '确定重置权限吗？',function(rtn) {
						if(rtn){
							$('#rightsOwner').val("");
							me.setRightsOwner([]);
						}
				});
			});
		
		},
		setRightsOwner:function(data){
			data= 	this.convertRights(data);
			template.helper('ower', function (val) {
				if($.isEmpty(val))
					return val;
				var r = val.split(","),returnStr="";
				for (var i = 0; i < r.length; i++) {
					returnStr += '<span class="owner-span">'+r[i]+'</span>';
				 }
				return returnStr;
			});
			var html = template('rightsOwnerTem', {list:data});
			$("#rightsOwnerItem").html(html);
		},
		convertRights:function(data){
			if($.isEmpty(data))
				return data;
			var rightsTypes = this.rightsTypes;
			 for (var i = 0; i < data.length; i++) {
 				 for (var j = 0; j < rightsTypes.length; j++) {
    				 if(data[i].type ==rightsTypes[j].key ){
    					 data[i].label=rightsTypes[j].label;
    					 }
    				 }
 			 }
			 return  data;
		},
		initData:function(){
			var rightsOwnerJSON = $('#rightsOwner').val();
			if(!$.isEmpty(rightsOwnerJSON)){
				var rightsOwner = $.parseJSON(rightsOwnerJSON);
				this.setRightsOwner(rightsOwner);
			}
			var rightsDefSON = $('#rightsDef').val();
			if(!$.isEmpty(rightsDefSON)){
				var rightsDef = $.parseJSON(rightsDefSON);
				this.setRightsDef(rightsDef);
			}
			
		},
		//=====================处理授权流程================
		handerQuickSetting:function(){
			$(document).on("click", "[name='rightsDefSet']", function() {
				var self = $(this),val = self.val();
				var checkboxNameArry = $("."+val);
				var checked=self.is(":checked");
				if(checked){
					checkboxNameArry.prop("checked","checked"); 		
				}else{
					checkboxNameArry.removeAttr("checked"); 
				}
			});
		},
		handerFlow:function(){
			var me=this;
			this.reset = false;
			
			//设置权限
			$(document).on("click", "#addFlow", function() {
				new BpmDefinitionDialog({
					callback:function(data,index){
						me.setRightsDef(data,true);
						DialogUtil.close(index);
						me.handerCheckbox();
					}
				}).show();
			});
			
			//删除权限
			$(document).on("click", "#delFlow", function() {
				var $aryId = $("input[type='checkbox'][disabled!='disabled'][class='myDefKey']:checked");
				
				if($aryId.length == 0){
					DialogUtil.msg("请选择记录！");
					return false;
				}
				
				DialogUtil.confirm( '确定删除流程授权吗？',function(rtn) {
					$aryId.each(function(i){
						var obj=$(this);
						obj.parents("tr").remove();
					});
				});
			});
			
			//重置权限
			$(document).on("click", "#resetFlow", function() {
				DialogUtil.confirm( '确定重置流程授权吗？',function(rtn) {
					if(rtn){
						$('#rightsDef').val("");
						me.setRightsDef([]);
						me.reset = true;
					}
				});
			});
			
			me.handerCheckbox();
		},
		handerCheckbox:function(){
			function checkAll(checked){
				$("input[type='checkbox'][class='myDefKey']").each(function(){
					$(this).prop("checked", checked);
				});
			}
			$("#all_key").click(function(){
				var state=$(this).prop("checked");
				if(state)
					checkAll(true);
				else
					checkAll(false);
			});
			
			function selectTr (){
				$("#rightsDefItem tr").each(function(){
					$(this).bind("mousedown",function(event){
						if(event.target.tagName=="TD")  
							var strFilter='input:checkbox[class="myDefKey"],input:radio[class="myDefKey"]';
							var obj=$(this).find(strFilter);
							if(obj.length==1){
								var state=obj.prop("checked");
								obj.prop("checked",!state);
								var isHashCheck = $("#all_key");
								if(isHashCheck){
									obj.trigger("change");
								}
							}
						}
					);    
				});
			}
			
			selectTr();
		},
		setRightsDef:function(data,isAdd){
			data = this.convertRightsDef(data,isAdd);
			var html = template('rightsDefTem', {list:data});
			if($.isEmpty(data)){
				$("#rightsDefItem").html(html);
			}else if(this.reset){
				$("#rightsDefItem").html(html);
				this.reset = false;
			}else{
				$(html).appendTo($("#rightsDefItem"));
				this.reset = false;
			}
		},
		convertRightsDef:function(data,isAdd){
			// rightsDef
			/*var odata =[], rightsDef = $("#rightsDef").val();
			if(!$.isEmpty(rightsDef))
				odata =  eval('(' + rightsDef +')');*/
			
			if($.isEmpty(data))
				return data;
			
			 for (var i = 0; i < data.length; i++) {
				 if(isAdd){
					 data[i].rights ={
							 m_edit:'N',
							 m_del:'N',
							 m_start:'N',
							 m_set:'N',
							 m_clean:'N',
							 i_del:'N',
							 i_log:'N'
					 };
					 data[i].defName = data[i].name;
				 }else{
					 data[i].rights = $.parseJSON( data[i].rights);
				 }
 			 }
			 
			 return  data;
		}
	};
})();


