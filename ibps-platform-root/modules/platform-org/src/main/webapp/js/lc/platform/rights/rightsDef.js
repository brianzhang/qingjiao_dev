/**
 * 权限定义
 * 
 * <pre>
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016-01-19 16:42:08
 * 版权：广州流辰信息技术有限公司
 * </pre>
 */
$(function() {
	rightsDef  = new RightsDef();
	rightsDef.init();
});

(function() {
	//定义常量
	var 	_consts = {
			FORM : '#rightsDefForm'// 表单form
	};
	/**
	 * 权限定义 对象
	 * @returns {RightsDef}
	 */
	RightsDef = function() {
		//定义属性
	};

	/**
	 * 方法
	 */
	RightsDef.prototype = {
		consts:	_consts,
		/**
		 * 初始化
		 */
		init : function() {
			if (this.hasInit) // 是否已初始化
				return false;
			this.hasInit = true;
			this.params = frameElement.dialog.params;
			if ($(this.consts.FORM).length > 0)//表单
				this._initForm();
		},
		/**
		 * 初始化表单
		 */
		_initForm : function() {
			this.isSave = this.params.isSave;
			//处理选择所有
			this.handerSelectAll();
			//处理选择所有
			this.handerRrightsSelect();
			this.handerRightsReset();
			this.initData();
		},
		/**
		 * 处理选择所有
		 */
		handerSelectAll:function(){
			$(document).on("click", "#selectAll", function(){
				if($(this).is(":checked")){
					$('.rightsSelect').hide();
					$('.rightsReset').hide();
					$('[name="rightsShow"]').html("");
					$('[name="rightsId"]').val("");
					$('[name="rightName"]').val("");
				}else{
					$('.rightsSelect').show();
					$('.rightsReset').show();
					$('[name="rightsId"]').val();
					$('[name="rightName"]').val();
				}
			});	
		},
		/**
		 * 处理选择
		 */
		handerRrightsSelect:function(){
			var me =this;
			$(document).on("click", ".rightsSelect", function(){
				var tr= $(this).parents("tr"),type =  tr.find('[name="type"]').val(),
					 params = me.getRightVal(tr,type);
				if(type =="employee"){// 用戶
					 new PersonDialog({
						 params:params,
						 callback:function(ids,names) {
							 me.setRightsVal(tr,{
								 rightsId:ids.join(","),
								 rightsName:names.join(",")
							 });
							}
						}).show();
				}else if(type =="role"){// 角色
					 new RoleDialog({
						 params:params,
						 callback:function(ids,names) {
							 me.setRightsVal(tr,{
								 rightsId:ids.join(","),
								 rightsName:names.join(",")
							 });
							}
						}).show();
				}else if(type =="org" || type =="orgSub"){// 组织
					 new OrgDialog({
						 params:params,
						 callback:function(ids,names) {
							 me.setRightsVal(tr,{
								 rightsId:ids.join(","),
								 rightsName:names.join(",")
							 });
							}
						}).show();
				}else if(type =="position"){// 岗位
					 new PositionDialog({
						 params:params,
						 callback:function(ids,names) {
							 me.setRightsVal(tr,{
								 rightsId:ids.join(","),
								 rightsName:names.join(",")
							 });
							}
						}).show();
				}
			});
		},
		/**
		 * 处理重置
		 */
		handerRightsReset:function(){
			var me =this;
			$(document).on("click", ".rightsReset", function(){
				//删除权限数据
				me.removeRights($(this).parents("tr"));
			});
		},
		removeRights:function(tr){
			var me = this,
			rightsIds = tr.find('[name="rightsId"]').val(),
			rightsNames = tr.find('[name="rightsName"]').val(),
			rightsType = tr.find('[name="type"]').val();
			if(this.isSave){
				var url = __ctx+'/platform/rights/rightsDef/removeRights.htm';
				$.post(url,{entityType:entityType,entityId:entityId,rightsIds:rightsIds,rightsType:rightsType},function(responseText){	
					var msg = new com.lc.form.ResultMessage(responseText);
					if (msg.isSuccess()) {
						//清空展示数据
						me.setRightsVal(tr, {rightsId:"",rightsName:""});
					} else {
						DialogUtil.error(msg.getMessage());
					}
				});
			}else{
				me.setRightsVal(tr, {rightsId:"",rightsName:""});
			}
	
		},
		setRightsVal:function(tr,obj){
			var rightsId =  tr.find('[name="rightsId"]'),
				rightsName =  tr.find('[name="rightsName"]'),
				rightsShow =  tr.find('[name="rightsShow"]');
			 rightsId.val(obj.rightsId);
			 rightsName.val(obj.rightsName);
			 rightsShow.html(obj.rightsName);
		},
		/**
		 * 获取权限的值
		 * @param tr
		 * @param type
		 * @returns {Array}
		 */
		getRightVal:function(tr,type){
			var rightsIdVal =  tr.find('[name="rightsId"]').val(),
				 rightsNameVal =  tr.find('[name="rightsName"]').val(),
				 rights =[];
			if($.isEmpty(rightsIdVal))
				return rights;
			var rightsIdAry   =rightsIdVal.split(","),
				rightsNameAry   = rightsNameVal.split(","),
				idKey ="id",nameKey="name";
			if(type == 'employee'){
				idKey ="id";
				nameKey =	"fullname";
			}
			for(var i=0;i<rightsIdAry.length;i++){
				var obj ={};
					obj[idKey] =rightsIdAry[i];
					obj[nameKey] =rightsNameAry[i];
				rights.push(obj)
			}
			return rights;
		},
		/**
		 * 初始化数据
		 */
		initData:function(){
			var datas = $('#rightsDefJson').val(),me= this;
			if(!$.isEmpty(datas)){//从页面取出数据
				var data =$.parseJSON(datas);
				me.initSetData(data);
			}else{
				var data = this.params.data;
				if(!$.isEmpty(data)){//页面传递参数过来
					me.initSetData(data);
				}
			}
		},
		initSetData:function(data){
			for(var i=0;i<data.length;i++){
				var item=data[i];
				if(item.type=="all"){//所有人
					$("#selectAll").trigger("click");
					break;
				}
				var tr =$("#"+item.type+"Tr");
				this.setRightsVal(tr,item);
			}
		},
		/**
		 * 保存数据
		 */
		getData:function(){
			return this.getRights();
		},
		getRights:function(){
			var rights=[],selectAll=$('#selectAll');
			if(selectAll.is(":checked")){//所有
				var right={};
					right.type= selectAll.attr("rightsType");
					right.rightsId="";
					right.rightsName="";
				rights.push(right);
			}else{
				$(".rightsTr").each(function(){
					var tr=$(this),
						rightsId =  tr.find('[name="rightsId"]').val(),
						rightsName =  tr.find('[name="rightsName"]').val(),
						type =  tr.find('[name="type"]').val();
					if($.isEmpty(rightsId))
						return true;
					var right={};
					right.type=type;
					right.rightsId=rightsId;
					right.rightsName=rightsName;
					rights.push(right);
				});
			}
			return rights;
		}
	};
})();


