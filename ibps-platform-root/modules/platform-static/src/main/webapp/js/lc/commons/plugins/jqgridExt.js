/* ========================================================================
 *  jqgrid 扩展 
 *  需要引入
 *  1、管理列
 *  <script type="text/javascript" src="${ctx}/js/lc/commons/plugins/rowOps.js"></script>
 *   2、日期处理
 *   <script type="text/javascript" src="${ctx}/js/plugins/moment/moment.min.js"></script>
 * ========================================================================
 * Copyright 2011-2015 lc, Inc.
 * 作者：hugh zhuang
 * 邮箱:3378340995@qq.com
 * 日期:2015-10-20-上午11:15:52
 * 版权：广州流辰信息技术有限公司版权所有
 * ======================================================================== */
(function() {
	jQuery.jgrid.defaults.styleUI = 'Bootstrap';
	jQuery.jgrid.styleUI.Bootstrap.base.rowTable = "table table-bordered table-striped";
    //扩展jqGrid fmatter
	jQuery.extend($.fn.fmatter , {
	/**
		 * 时间戳 格式化自定义<br>
		 * 格式代码	说明										返回值例子
		 *	M				数字表示的月份，没有前导零		1到12
		 *	MM			数字表示的月份，有前导零			01到12
		*	MMM		三个字母缩写表示的月份				Jan到Dec
		*	MMMM	月份，完整的文本格式			January到December
		*	Q	季度	1到4
		*	D	月份中的第几天，没有前导零	1到31
		*	DD	月份中的第几天，有前导零	01到31
		*	d	星期中的第几天，数字表示	0到6，0表示周日，6表示周六
		*	ddd	三个字母表示星期中的第几天	Sun到Sat
		*	dddd	星期几，完整的星期文本	从Sunday到Saturday
		*	w	年份中的第几周	如42：表示第42周
		*	YYYY	四位数字完整表示的年份	如：2014 或 2000
		*	YY	两位数字表示的年份	如：14 或 98
		*	A	大写的AM PM	AM PM
		*	a	小写的am pm	am pm
		*	HH	小时，24小时制，有前导零	00到23
		*	H	小时，24小时制，无前导零	0到23
		*	hh	小时，12小时制，有前导零	00到12
		*	h	小时，12小时制，无前导零	0到12
		*	m	没有前导零的分钟数	0到59
		*	mm	有前导零的分钟数	00到59
		*	s	没有前导零的秒数	1到59
		*	ss	有前导零的描述	01到59
		*	X	Unix时间戳	1411572969
		 * @param val
		 * @param opts
		 * @param data
		 * @returns
		 *     			formatter : 'timestamp',
						formatoptions:'yyyy-MM-dd HH:mm:ss'
		 */
		timestamp : function(val, opts, rowData) {
			var format = "yyyy-MM-dd",formatoptions = opts.colModel.formatoptions;
			if(!$.fmatter.isEmpty(formatoptions)) 
				format = formatoptions;
			if(!$.fmatter.isEmpty(val)){
				//使用默认
				return $.format(val,format);
			}
			return $.fn.fmatter.defaultFormat(val,opts );
		},
		/**
		 * 数据格式
		 * @param cellval
		 * @param opts
		 * @param data
		 */
		dataFormat : function(cellval, opts, rowData) {
			var formatoptions = opts.colModel.formatoptions, optVal = false, ret=[], sep, delim,valsep="",nameKey,valueKey,cssKey,styleKey,origval=cellval;
			if(formatoptions!== undefined){
				optVal= formatoptions.value;
				sep = formatoptions.separator === undefined ? ":" : formatoptions.separator;
				delim = formatoptions.delimiter === undefined ? ";" : formatoptions.delimiter;
				valsep = formatoptions.valueseparator=== undefined ? "," : formatoptions.valueseparator;
				nameKey = formatoptions.nameKey === undefined ? "name" : formatoptions.nameKey;
				valueKey = formatoptions.valueKey === undefined ? "value" : formatoptions.valueKey;
				cssKey = formatoptions.clzKey === undefined ? "css" : formatoptions.clzKey;
				styleKey = formatoptions.cssKey === undefined ? "style" : formatoptions.cssKey;
			}
			cellval = $.isEmpty(cellval)?"":(cellval+"");
			cellval = cellval.split(valsep);

			if(optVal) {
				if ($.fmatter.isString(optVal)) {//字符串
					var so =optVal.split(delim), j=0, i;
					for(i=0; i<so.length;i++){
						sv = so[i].split(sep);
						if(sv.length > 2 ) {
							sv[1] = $.map(sv,function(n,i){if(i>0) {return n;}}).join(sep);
						}
						$.each(cellval,function(k1,v1){
							if($.trim(sv[0]) === $.trim(v1)) {
								ret[k1] = sv[1];
							}
						});
					}
				}else if($.isArray(optVal)){//数组
					$.each(optVal,function(k,v){
							$.each(cellval,function(k1,v1){
								if(v[nameKey]  == v1){
									if(	v[cssKey] &&v[styleKey] )
										ret[k1] ='<span class="'+	v[cssKey] +'"  style="'+	v[styleKey] +'">'+	v[valueKey]+'</span>';
									else if(!v[cssKey] && v[styleKey] )
										ret[k1] ='<span style="'+ v[styleKey] +'">'+	v[valueKey]+'</span>';
									else if(v[cssKey] && !v[styleKey] )
										ret[k1] ='<span class="'+	v[cssKey] +'" >'+	v[valueKey]+'</span>';
									else{
										ret[k1] =v[valueKey];
									}
								}
							});
					
					});
					
				}else if($.fmatter.isObject(vOpt)){//对象
					$.each(cellval,function(k1,v1){
						ret[k1] = optVal[v1] || "";
					});
				}
			}
			cellval = ret.join(", ");
			return cellval === "" ? $.fn.fmatter.defFormat(origval,opts) : cellval;
		},
		defFormat:function(origval,opts){
			if($.fmatter.isEmpty(origval))
				return "";
			var defaultValue;
			if(defaultValue =opts.colModel.defaultValue){
				if ($.type(defaultValue)  === "string") 
					return  defaultValue;
				else if($.type(defaultValue)  === 'function')
					return defaultValue.call(this,origval,opts);
			}
			return $.fn.fmatter.defaultFormat(origval,opts)
		},
		json:function(cellval, opts, rowData) {
			return JSON.stringify(cellval);
		},
		selector: function(cellval, opts, rowData) {
			var formatoptions = opts.colModel.formatoptions;
			if($.isEmpty(cellval) || cellval==="null" )
				return "";
			var v,rtn = [];
			if ($.type(cellval)  === "string") {
				 v =   JSON.parse(cellval);
			}else{
				v = cellval;
			}
			$.each(v,function(i,n){
				rtn.push(n[formatoptions]);
			});
			return rtn;
			
		},
		//附件展示
		attachment:function(cellval, opts, rowData) {
				if($.isEmpty(cellval))
					return "";
				var v = [], rtn = [];
				try {
					v = JSON.parse(cellval);
				} catch (e) {
					return cellval;
				}
				if($.isEmpty(v))
					return "";
				$.each(v,function(i,n) {
					rtn.push(n["fileName"]);
				});
				return rtn;
		},
		/**
		 * 管理列。<br>
		 * format:'manage',
		 * formatoptions
		 * 	   label:"编辑'//显示的按钮
		 *    classes:'btn btn-primary fa fa-edit',//按钮的样式
		 *	  action:'edit.htm?id={id}', //可以是个字符串或者是调用的方法javascript: xxx({id})；
		 *	  hidden: false // 是否隐藏，可以是boolean 或者是个方法,如果是方法返回值为：opts,rowData
		 * @param val
		 * @param opts
		 * @param rowData
		 * @returns {String}
		 */
		manage:function(cellval, opts, rowData) {
			function format(str,obj,pre){
					$.each(obj,function(d, v) {
						if(pre)
							d = pre+"."+d;	
						var objType = typeof (v);
						if(typeof (v) == "object" && !( v== null || v==''|| v==undefined) ){
							str = format(str,v,d);
						}
						str = str.replace(RegExp("\\{" + d + "\\}", "g"), v);
					});
					return str;
				}
				function isHidden(b){
					if(!b)
						return false;
					if ($.type(b)  === "boolean") 
						return  b;
					else if($.type(b)  === 'function')
						return b.call(this,opts,rowData);
					return  false;
				}
				function handerData(data){
					if(!data)
						return '';
					if ($.type(data)  === "string") 
						return  data;
					else if($.type(data)  === 'function')
						return data.call(this,opts,rowData);
					return  '';
				}
				//授权
				function isGranted(alias){
					if(!alias)
						return  true;
					return $.isGranted(alias);
				}
				
				var h = "",formatoptions = opts.colModel.formatoptions,
					showNoRight = opts.showNoRight?opts.showNoRight:true,canAccess =true;
				$.each(formatoptions,function(d, v) {
					if( isHidden(v.hidden))
						return true;
					canAccess = isGranted(v.rights);
					//判断权限
					if(!canAccess && !showNoRight )
						return true;
			
					var a=  $('<a href="javascript:void(0);"></a>');
					if(v.classes)	a.addClass(handerData(v.classes));
					if(v.label)  a.html( handerData(v.label));
					if(canAccess){
						if(v.action) a.attr("action",v.action);
						if(v.click) a.attr("onclick",v.click);
					}else{
						a.addClass("disabled");
					}

					h += format(a[0].outerHTML,rowData);
				});
			return h;
		}
	});
})();