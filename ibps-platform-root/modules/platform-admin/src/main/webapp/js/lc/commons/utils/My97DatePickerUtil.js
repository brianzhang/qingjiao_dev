/**
 * 为页面中所有带date及datetime日期样式加上控制处理
 */
$(function(){
	//日期格式
	$(document).delegate(".date",'click',function(){
		WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true});
		$(this).blur();
	});
	//日期时间格式
	$(document).delegate(".datetime",'click',function(){
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',alwaysUseStartDate:true});
		$(this).blur();
	});
	//自定义格式
	$(document).delegate(".wdateTime",'click',function(){
		var me = $(this), dateFmt=  (!$.isEmpty(me.attr('datefmt'))?me.attr('datefmt'):'yyyy-MM-dd');
		WdatePicker({dateFmt:dateFmt,alwaysUseStartDate:true});
		$(this).blur();
	});
	
	//自定义格式
	$(document).delegate(".datepicker",'click',function(){
		var me = $(this), dateFmt=  (!$.isEmpty(me.attr('datefmt'))?me.attr('datefmt'):'yyyy-MM-dd');
		WdatePicker({dateFmt:dateFmt,alwaysUseStartDate:true});
		$(this).blur();
	});
	
	//时间区间【范围】
	var inputs = $(".dateRange"),timeObj=[];
	for(var i=0;i<inputs.length;i++){
		var input=$(inputs[i]),
			result = i%2;
		if(result)
			timeObj.push(input);
		else
			timeObj.push(input);
	}
	//处理开始时间和结束时间
	$(document).delegate(".dateRange",'click',function(){
		var me = $(this),it =0,nextValue='',
		dateType=me.attr('datetype'),dateFmt=  (me.attr('datefmt')?me.attr('datefmt'):'yyyy-MM-dd');
		//取得当前所在的位置
		$.each(timeObj,function(i,n){
			if(me.get(0)===$(n).get(0)){
				if(dateType=='begin')
					it = i+1; 
				else if(dateType=='end')
					it = i-1; 
			}
		});
		//取得下个的值
		$.each(timeObj,function(i,n){
			if(i==it) nextValue =$(n).val();
		});
		if(dateType == 'begin')
			WdatePicker({dateFmt:dateFmt,alwaysUseStartDate:true,maxDate:nextValue});
		else
			WdatePicker({dateFmt:dateFmt,alwaysUseStartDate:true,minDate:nextValue});
		me.blur();
	});

});