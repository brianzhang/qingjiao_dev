

	$(function(){
		formDefFixedSelector = new FormDefFixedSelector();
		formDefFixedSelector.init();
	});

	function getData(){
		return formDefFixedSelector.getValue();
	}
			
	(function() {
		/**
		 *动态脚本 对象
		 * @returns {FormDefFixedSelector}
		 */
		 FormDefFixedSelector = function() {
			
		};

		/**
		 * 方法
		 */
		 FormDefFixedSelector.prototype = {
			init:function(){
				if (this.hasInit) // 是否已初始化
					return false;
				this.hasInit = true;
				//默认值
				this.bindDefaultValueType();
				
				var params =this.params=  frameElement.dialog.params;	
				
				this.initDynamic();
				 //初始数据
				this.initData();
				
			},
			bindDefaultValueType:function(){
				var defaultValueType = $("#type");
				$(document).on("click", ".defaultValueType", function() {
					var self = $(this),
						type = self.data("type"), 
						origType = defaultValueType.val(),
						text =self.html();
					if (origType == type)
						return;
					defaultValueType.val(type);
					$("#typeSpan").html(text);
					
					$("#"+type).show();
					$("#"+origType).hide();
				});
			},
			initDynamic:function(){
				//构建动态值
				var selector_type = this.params.selector_type?this.params.selector_type:'user';
				var text ='当前用户';
				if(selector_type == 'user'){
					 text ='当前用户';
				}else if(selector_type == 'org'){
					 text ='当前用户所在的组织';
				}else if(selector_type == 'position' ){
					 text ='当前用户所在的岗位';
				}else if(selector_type == 'role' ){
					 text ='当前用户所有的角色';
				}else{
					 text ='当前值';
				}
				
			     $("#dynamic").append("<option value='current'>"+text+"</option>"); 
			},
			initData:function(){
				if(!this.params || !this.params.data)
					return;
				var data =this.params.data;
				var type =data.type?data.type:'dynamic';
				var value   =  data.value?data.value:'';
				$("#type").val(type);
				$("#selector_type").attr("data-type",this.params.selector_type);
			//	$("#selector_type").attr("data-single",this.params.is_single?this.params.is_single:"true");
				if(type =='dynamic' ){
					$("#dynamic").val(value);
				}else{
					$(".defaultValueType").trigger("click");
					$("#ownerId").val(value.id);
					$("#ownerName").val(value.name);
				}
				
				
				$('[data-toggle="selectorExt"]').each(function(){
					SelectorDialog.selector($(this));
				});
				
				$('[data-toggle="selectorExtClear"]').each(function(){
					SelectorDialog.clear($(this));
				});
				
			},
			getValue:function(){
				var type = $("#type").val();
				var value ='';
				if(type =='dynamic' ){
					value = $("#dynamic").val();
				}else{
					value ={
						id:$("#ownerId").val(),
						name:$("#ownerName").val()
					};
				}
				return {
					type:type,
					value:value
				};
			}
		};
	})();