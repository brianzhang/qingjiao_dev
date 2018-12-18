(function() {
	
	/**
	 * 表单验证提示
	 */
	$.extend($.fn, {
		qtipSuccess : function() {
			var el =$(this), formGroup =el.closest('.fr-form-group');
			if(!$.isEmpty(formGroup) && formGroup.length >0){ //自适应表单
				formGroup.removeClass('has-error');
			}else{
				el.removeClass("has-error");
			}
			el.qtip('destroy');
		},
		qtipError : function(text) {
			var el =$(this), formGroup =el.closest('.fr-form-group');
			if(!$.isEmpty(formGroup) && formGroup.length >0){//自适应表单
				formGroup.removeClass('has-success').addClass('has-error');
			}else{
				el.removeClass("has-success").addClass("has-error");
			}
			
			el.qtip('destroy').qtip({
				content :text, // Set the tooltip content to the current corner
				position : {
					my : 'left center', // Position my top left...
					at : 'right center',
					target : 'mouse', // Track the mouse as the positioning target
					adjust : {
						x : 5,
						y : 5
					}
				},
				hide : {
					event : "mouseleave" // Don't specify a hide event
				},
				style : {
					classes : 'qtip-default  qtip qtip-bootstrap qtip-shadow'
				}
			});
		}
	});
	
	
/**
 * 帮助类
 */	
FormRendererUtil={
		TABLE_SEPARATOR:".",
		EVAL_FORMULA:'',
		NOT_NEED_FIELD:'#not_need_field#',
		  /**
	     * 设置需要公式计算的字段
	     */
	    setResponseFormula:function(model,response_formula){
	    	if(!model.isSubTable() )
	    		this.setChangeFormulaData(model,response_formula);
	    },
	    setChangeFormulaData:function(model,response_formula){
	    	if(model.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) != 'formula')
	    		return ;
	    	var changename = model.get(FormOptions.t.mappings.CODE)+ this.TABLE_SEPARATOR+model.get(FormOptions.t.mappings.NAME),
    			  formula =model.get(FormOptions.t.mappings.DEFAULT_VALUE),
    			  d = formula.split(/(\$[0-9a-zA-Z\._]+#[0-9A-Fa-f]*)/g),
    			  z =FormRendererUtil.NOT_NEED_FIELD,
    			  changFormula = {
        			  changename:changename,
        			  formula:formula
        	  		},
        	  		isHasField = false;
    	      _.each(d, function(n, i) {
    	    	  if (/^\$(_widget_)/.test(n)) {	  //对字段进行处理
                      var f = n.replace("$_widget_", "").split("#"),
                         	g = f[0],
                         	h = f[1];
                      if ($.isEmpty(h)) {
                     	  if( !response_formula[g])
                    		  response_formula[g] =[];
                    	  response_formula[g].push(changFormula);
                      } 
                      isHasField =  true;
                  }
              });
    	    //未有要计算改变字段
    	      if( !response_formula[z])
        		  response_formula[z] =[];
    	      if(!isHasField)
    	    	  response_formula[z].push(changFormula);
	    },   
	    getCalFormulaValue :function(responseFormula,models,selfModel,row){
	    	var  _this =this,
	    		formula= responseFormula.formula,
		    		changename= responseFormula.changename,//修改字段
		    		changeObj = changename? changename.split(FormRendererUtil.TABLE_SEPARATOR):[],//改变的对象
		    		isMainTable =$.isEmpty(row)?true:false,//是否主表
			       	isSameTable  =  selfModel? ( changeObj[0] ==selfModel.get(FormOptions.t.mappings.CODE)?true:false):true,//是否相同的表
		    		d = formula.split(/(\$[0-9a-zA-Z\._]+#[0-9A-Fa-f]*)/g),
		    		e = [],
		         	v;
			       	
		         _.each(d, function(n, i) {
		        	 	if (/^\$(_widget_)/.test(n)) {
		                  var f = n.replace("$_widget_", "").split("#"),
		                     	g = f[0],
		                     	h = f[1];
		                  if ($.isEmpty(h)) {
		                	  //获取公式的值 数字
		                   	 var t =  g.split(FormRendererUtil.TABLE_SEPARATOR),val  ='""',key=t[1];
		                       	if(isMainTable){//主表
		                         	   val  = _this.getValueByModel(models[key]);
		                       	}else{//子表
		                    		var  model =  models[key];
		                       		if(isSameTable){//相同的表
		                		    	var column =model.get("column");
		                		    	val =	_this.getValueByModel(model,selfModel,column,row);
		                	    	}else{//如果改变的是主表,则取一列的值
		                	    		val = _this.getColumnValue(selfModel,key,model);
		                	    	}
		                       	}
		                     e.push(val);
		                 } else{
		                     e.push('"' + n + '"');
		                 }
		             } else{
		            	  e.push(n);
		             }
		         });
		
		     try {
		         v = this.evalFormula(e.join(""))
		     } catch (e) {
		    	 v = "";
		     }
		     return v;
	    },
	    /**
	     * 进行公式计算
	     */
	    runCalFormula:function(responseFormulas,models,selfModel,row){
	    	if(!responseFormulas)
	    		return;
	        for (var i = 0; i < responseFormulas.length; i++) {
	        	var responseFormula =responseFormulas[i],
	        		formula= responseFormula.formula,
		    		changename= responseFormula.changename,//修改字段
		    		changeObj = changename? changename.split(FormRendererUtil.TABLE_SEPARATOR):[],//改变的对象
		    		isMainTable =$.isEmpty(row)?true:false,//是否主表
			       	isSameTable  =  selfModel? ( changeObj[0] ==selfModel.get(FormOptions.t.mappings.CODE)?true:false):true,//是否相同的表
			       	isSubSameTable = (!isMainTable&&isSameTable), //是否相同子表
		         	v,
		         	model;
			       	//值
		        	v  = this.getCalFormulaValue(responseFormula,models,selfModel,row);
		        	//当前model
		        	model = (isMainTable||isSameTable?models[changeObj[1]]:selfModel.form_renderer.response_models[changeObj[1]]);
		       	
	         this.changeValue(model,v,isSubSameTable,selfModel,row);
	        }
	    },
	    changeValue:function(model,value,isSubSameTable,selfModel,row){
	    	if(!model)
	    		return;
	    	if(isSubSameTable){
	    	  	var column =model.get("column");
		  	     selfModel.set("value."+column+"."+row,value);
	    	}else{
	    		model.set("value",value) ;
	    	}
	    },
	    /**
	     * 获取值
	     */
	    getValueByModel:function(model,subModel,column,row){
	    	if(!model)
	    		return null;
	    	var val= !subModel?model.getValue():subModel.get("value."+column+"."+row);
	    	if(model.get(FormOptions.t.mappings.FIELD_TYPE) =='number'){
	    		val = val || 0;
	    	}else if(model.get(FormOptions.t.mappings.FIELD_TYPE) =='radio' || model.get(FormOptions.t.mappings.FIELD_TYPE) =='checkbox'){
	    		val = model.toText() ;
	    		val = val?('"'+val+'"'): '""';
	    	}else{
	    		val = val?('"'+val+'"'): '""';
	    	}
	    	return val;
	    },
	   getDefaultSubVal:function(model,val){
	    	if(model.get(FormOptions.t.mappings.FIELD_TYPE) =='number'){
	    		val =  !$.isEmpty(val)?$.str2Num(val):0;
	    	}else{
	    		val =  !$.isEmpty(val)?val: '';
	    	}
	    	return val;
	    }, 
	    /**
	     * 获取子表一列的值
	     */
	    getColumnValue:function(selfModel,key,model){
	  	      var v =_.clone(_.pluck(selfModel.getValue(), key)),_this =this;
	    	  var t =_.map(v,function(a){ return  _this.getDefaultSubVal(model,a)});
	    	  return JSON.stringify(t) + "" ;
	    },
	    getEvalFormula:function(){
	    	if($.isEmpty(FormRendererUtil.EVAL_FORMULA)){
		    	//做缓存避免运算
		        var b = [];
	         	_.each( _.allKeys(FormulaUtil), function(n, i) {
	                b.push("var " + n + "=FormulaUtil." + n);
	            });
	         	
	         	FormRendererUtil.EVAL_FORMULA = b.join(";") + ";";	
	    	}
         	return FormRendererUtil.EVAL_FORMULA;
	    },
	    evalFormula:function(a){
         	var  c,env;
            try {
            	env =this.getEvalFormula();
                c = new Function(env + "return " + a+";")();
            } catch (e) {
//           	   $.console().info(env+ "return " + a+";");
                c = null;
            }
            return c;
	    },
	    /**
	     * 进行表单验证
	     * 
	     */
	    runFormSubmitVerify:function(formula,models,self){
	    	
	    	var _this =this,
			    	isMainTable =true,//是否主表
			    	isSameTable = true,//是否相同的表
			    	code  = self.options.code,//主表
			    	d = formula.split(/(\$[0-9a-zA-Z\._]+#[0-9A-Fa-f]*)/g),
		    		e = [],
		    		hasSubTabe =false,
		         	v = true;
	    	
         _.each(d, function(n, i) {
        	 	if (/^\$(_widget_)/.test(n)) {
                  var f = n.replace("$_widget_", "").split("#"),
                     	g = f[0],
                     	h = f[1];
                  if ($.isEmpty(h)) {
                	  //获取公式的值 数字
                   	 var t =  g.split(FormRendererUtil.TABLE_SEPARATOR),val  ='""',_tableCode=t[0],key=t[1];
                   	 isSameTable = _tableCode ==code;
                       	if(isSameTable){// 相同表
                         	   val  = _this.getValueByModel(models[key]);	
                       	}else{//不同表
                       	//TODO   不支持子表校验
                       		hasSubTabe =true;
                       		return false;	
                    		var  model =  models[_tableCode];
                    		if(model){//子表
                    		//	var columns = model.get(FormOptions.t.mappings.COLUMNS);
                    			
                    		}else{
                    			   val  = _this.getValueByModel(models[key]);	
                    		}
                       	
                       	}
                     e.push(val);
                 } else{
                     e.push('"' + n + '"');
                 }
             } else{
            	  e.push(n);
             }
         });
         if(hasSubTabe)
        	 return true;

	     try {
	         v = this.evalFormula(e.join(""));
	     } catch (e) {
	      	 $.console().info(e);
	    	 v = true;
	     }
		    	
	    	
	    	return  v;
	    },
	    qtip : function($thisEl) {
			var defaultSetting = {
				position : {
					viewport : $(window),
					adjust : {
						mouse : true
					},
					my : 'top center',
					at : 'bottom center'
				},
				hide : {
					event : 'mouseleave',
					leave : true,
					fixed : true,
					delay : 100
				},
				style : {
					classes : 'qtip-default  qtip qtip-bootstrap qtip-shadow'
				}
			}, options = {};

			$('[data-tip]', $thisEl).each(function() {
				var $el = $(this);
				options = {
					content : {
						title : $el.data("title"),
						text : $el.data("text")
					}
				};
				$el.qtip($.extend({}, defaultSetting, options));
			});
		},
		setResponseLinkage:function(model,response_linkage){
			if(!model.isSubTable() )
	    		this.setChangeLinkageData(model,response_linkage);
		},
	    setChangeLinkageData:function(model,response_linkage){
	    	var  linkage =model.get(FormOptions.t.mappings.DEFAULT_VALUE);
	    	if(model.get(FormOptions.t.mappings.DEFAULT_VALUE_TYPE) != 'linkage' || $.isEmpty(linkage))
	    		return ;
	    	//
	    	var changename = model.get(FormOptions.t.mappings.CODE)+ this.TABLE_SEPARATOR+model.get(FormOptions.t.mappings.NAME),
	    		changFormula = {
        			  changename:changename,
        			  linkage:linkage
        	  		},
        	  		g = model.get(FormOptions.t.mappings.CODE)+ this.TABLE_SEPARATOR+ linkage.field;
       	  if( !response_linkage[g])
       		response_linkage[g] =[];
	    	response_linkage[g].push(changFormula);
	    },
	    //TODO 
	    // 1、主表数据联动 （完成）
	    // 2、 子表的数据联动（完成）
	    // 3、不同控件间的数据联动
	    // 4、支持不同控件进行联动
	    // 5、实现多级联动
	    runLinkage:function(responseLinkages,models,selfModel,row){
	    	if(!responseLinkages)
	    		return;
	     	var _this =this;
	        for (var i = 0; i < responseLinkages.length; i++) {
	        	var responseLinkage =responseLinkages[i],
	        		linkage= responseLinkage.linkage,
		    		changename= responseLinkage.changename,//修改字段
		    		changeObj = changename? changename.split(FormRendererUtil.TABLE_SEPARATOR):[],//改变的对象
		    		isMainTable =$.isEmpty(row)?true:false,//是否主表
			       	isSameTable  =  selfModel? ( changeObj[0] ==selfModel.get(FormOptions.t.mappings.CODE)?true:false):true,//是否相同的表
		    		e = [],
		         	val;

			    	val = selfModel.getValue(); //主表
			       	
			      	var params = {
			      		  	key: linkage.dataSource
			      	};
			      	//
			      	//
			    	params["Q^"+linkage.relyData+"^S"]  = val;
			         //TODO ajax 从后台获取值
			    	$.ajax({
			            url: __ctx+"/platform/data/dataTemplate/getLinkageData.htm",
			            type: "post",
			            data: params,
			            success: function(results) {
			            	console.info(results);
			            	if(!results.result)
			            		return ;
			            	var data = 	results.data;
			            	if($.isEmpty(data))
			            		return;
			            	var resultVal = data[linkage.dataField];
			            	models[changeObj[1]].setExistingValue(resultVal);
			       
			    			//       	_this.changeValue((isMainTable||isSameTable?models[changeObj[1]]:selfModel.form_renderer.response_models[changeObj[1]]),v,(!isMainTable&&isSameTable),selfModel,row);

			            }
			          });
			       	
	     	        }
	    }
};
}).call(this);