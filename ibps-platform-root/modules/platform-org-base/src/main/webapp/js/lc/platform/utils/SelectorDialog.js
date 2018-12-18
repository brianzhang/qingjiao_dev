/**
 * 选择对话框
 * 
 * 
 * <br>
 * 1、根据需要引入选择器
 * 	<script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PersonDialog.js"></script>
 *  <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/OrgDialog.js"></script>
 *  <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/RoleDialog.js"></script>
 *  <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PositionDialog.js"></script>
 *  <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/org/PartyDialog.js"></script>
 *  <script type="text/javascript" src="${ctx}/js/lc/platform/dialog/bpmn/BpmDefineDialog.js"></script>
 * 
 * 2、在输入框输入支持 <input data-toggle="selector"/>
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

SelectorDialog ={
		clickEvent:function(options,callback){
			var  type = options.type,
					isSingle = $.isEmpty(options.single)?true:(options.single=='true' || options.single==true?true:false),
					id=options.id,
					key=options.key,
					name=options.name;
			var idVal = $(id).val(),keyVal = $(key).val(),nameVal = $(name).val(),
				data=[];
			if($.isNotEmpty(idVal)&& $.isNotEmpty(nameVal) ){
				var idArr = idVal.split(','), nameArr = nameVal.split(',');
				if(idArr.length == nameArr.length){
					$.each(idArr, function(i, id) {
						var datai={'id':id};
						datai['name']=nameArr[i];
						datai['key']='';
						data.push(datai);
					});
				}
			}
			
			switch (type) {
				case 'user':
					var udata=[],
						orgid=options.orgid,
						orgkey=options.orgkey,
						orgname=options.orgname,
						scope=options.scope;
					if($.isNotEmpty(idVal)&& $.isNotEmpty(nameVal) ){
						var uidArr = idVal.split(','),unameArr = nameVal.split(',');
						if(uidArr.length == unameArr.length){
							$.each(uidArr, function(i, id) {
								var udatai={'id':id};
								udatai['fullname']=unameArr[i];
								udatai['account']='';
								udata.push(udatai);
							});
						}
					}
					new PersonDialog({
						orgid:orgid,
						isSingle:isSingle, //是否单选
						params:udata,	
						type:options.scope?options.scope:1,
						callback : function(userIds, fullNames) {
							$(id).val(userIds);
							$(name).val(fullNames);

							if(callback)
								callback(userIds,fullNames);
							if($(orgid).length > 0 || $(orgkey).length > 0 || $(orgname).length > 0){
								var __url = __ctx + "/platform/org/partyOrg/findByUserIdJson.htm?userId="+userIds
								$.ajax({
									type: 'POST',
									url: __url,
									success: function(data){
										if(data.length > 0){
											if($(orgid).length > 0){
												$(orgid).val(data[0].id);
											}
											if($(orgkey).length > 0){
												$(orgkey).val(data[0].alias);
											}
											if($(orgname).length > 0){
												$(orgname).val(data[0].name);
											}
										}
									},
									error: function(){}
								});
							}
						}
					}).show();
				break;
			case 'role':
				var rdata=[];
				if(undefined != idVal && '' != idVal
						&& undefined != nameVal && '' != nameVal){
					var ridArr = idVal.split(',');
					var rnameArr = nameVal.split(',');
					if(ridArr.length == rnameArr.length){
						$.each(ridArr, function(i, id) {
							var rdatai={'id':id};
							rdatai['name']=rnameArr[i];
							rdatai['roleAlias']='';
							rdata.push(rdatai);
						});
					}
				}
				new RoleDialog({
					isSingle:isSingle,
					params:rdata,	
					callback : function(ids,names) {
						$(id).val(ids);
						$(name).val(names);

						if(callback)
							callback(ids,names);
					}
				}).show();
				break;
			case 'org':
				new OrgDialog({
					isSingle:isSingle,
					params:data,	
					callback : function(ids,names) {
						$(id).val(ids);
						$(name).val(names);
						if(callback)
							callback(ids,names);
					}
				}).show();
				break;
			case 'position':
				new PositionDialog({
					isSingle:isSingle,
					params:data,	
					callback : function(ids,names) {
						$(id).val(ids);
						$(name).val(names);

						if(callback)
							callback(ids,names);
					}
				}).show();
				break;
			case 'party':
				new PartyDialog({
					isSingle:isSingle,
					partyType:options.partyType,
					params:data,	
					callback : function(ids,names) {
						$(id).val(ids);
						$(name).val(names);
						if(callback)
							callback(ids,names);
					}
				}).show();
				break;
			case 'flow':
				new BpmDefinitionDialog({
					isSingle:isSingle,
					callback:function(data,index){
						if($(id).length > 0){
							$(id).val(data[0].defId);
						}
						if($(key).length > 0){
							$(key).val(data[0].defKey);
						}
						$(name).val(data[0].name);
						if(callback)
							callback(data);
						DialogUtil.close(index);
					}
				}).show();
				break;
			default:
				break;
			}
		},
		selector:function($this){
			var options = $this.data(),
				_this =this;

			// 绑定点击事件
			$this.click(function(){
				_this.clickEvent(options);
			});
			
			$(options.name).click(function(){
				_this.clickEvent(options);
			});
		},
	
		clear:function($this){
			var options = $this.data(),
				id=options.id,
				key=options.key,
				name=options.name,
				orgid=options.orgid,
				orgkey=options.orgkey,
				orgname=options.orgname;
				scope=options.scope;
		// 点击事件
			$this.click(function() {
				if($(id).length > 0 ) $(id).val('');
				if($(key).length > 0 ) $(key).val('');
				if($(name).length > 0 ) $(name).val('');
				if($(orgid).length > 0 ) $(orgid).val('');
				if($(orgkey).length > 0 ) $(orgkey).val('');
				if($(orgname).length > 0 ) $(orgname).val('');
				if($(scope).length > 0 ) $(scope).val('');
			});
		}
};



$(function() {
		
	$('[data-toggle="selector"]').each(function(){
		SelectorDialog.selector($(this));
	});
	
	$('[data-toggle="clear"]').each(function(){
		SelectorDialog.clear($(this));
	});
	
});



