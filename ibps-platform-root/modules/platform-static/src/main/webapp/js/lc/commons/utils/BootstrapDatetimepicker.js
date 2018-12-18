/**
 * 为页面中所有带date及datetime日期样式加上控制处理
 */
$(function(){

	$('.date').datetimepicker({
		language:'zh_CN',
		 format: 'yyyy-MM-dd',
		 autoclose:true,
		 todayBtn:  1,
		 minView: 2,
		 maxView: 2
    });
	//日期时间格式
	$('.datetime').datetimepicker({
		language:'zh_CN',
		format:'yyyy-MM-dd hh:mm:ss',
		 autoclose:true,
		 todayBtn:  1,
		minView: 0,
		maxView: 4
    });
	//自定义格式
	$(".wdateTime").each(function(){
		var me = $(this), dateFmt=  (!$.isEmpty(me.attr('datefmt'))?me.attr('datefmt'):'yyyy-MM-dd'),
			$dp = DatetimepickerUtil.dealFmt(dateFmt);
		//把自定义格式的转换成
		me.datetimepicker({
			language:'zh_CN',
    		bootcssVer:3,
			format:dateFmt,
			autoclose:true,
			todayBtn:  1,
			startView: $dp.startView,
			minView: $dp.minView,
			maxView: $dp.maxView
	    });
	});
	
	//自定义格式
	$(".datepicker").each(function(){
		var me = $(this), dateFmt=  (!$.isEmpty(me.attr('datefmt'))?me.attr('datefmt'):'yyyy-MM-dd'),
			$dp = DatetimepickerUtil.dealFmt(dateFmt);
		//把自定义格式的转换成
		me.datetimepicker({
			language:'zh_CN',
    		bootcssVer:3,
			format:dateFmt,
			autoclose:true,
			todayBtn:  1,
			startView: $dp.startView,
			minView: $dp.minView,
			maxView: $dp.maxView
	    });
	});
	
	//TODO 时间区间【范围】
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
			dateType=me.attr('datetype'),dateFmt=  (me.attr('datefmt')?me.attr('datefmt'):'yyyy-MM-dd'),
			$dp = DatetimepickerUtil.dealFmt(dateFmt);
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
			me.datetimepicker({
				language:'zh_CN',
	    		bootcssVer:3,
				format:dateFmt,
				autoclose:true,
				todayBtn:  1,
				endDate:nextValue,
				startView: $dp.startView,
				minView: $dp.minView,
				maxView: $dp.maxView
		    });
		else
			me.datetimepicker({
				language:'zh_CN',
	    		bootcssVer:3,
				format:dateFmt,
				autoclose:true,
				todayBtn:  1,
				startDate:nextValue,
				startView: $dp.startView,
				minView: $dp.minView,
				maxView: $dp.maxView
		    });
		me.datetimepicker('show');
		me.blur();
	});

});