/**
 * 数据统计页面脚本
 * 
 * 开发人员：guanxinyu 创建时间：2017-09-24 13:42
 */
$(function() {
	charts = new Charts();
});

(function() {
	var _consts = {
		CHART : '#main',
		CHARTTEMPLATE : 'essos'
	}
	
	/**
	 * 对象构造
	 */
	Charts = function() {
		this.init();
	};
	
	/**
	 * 定义Charts对象属性
	 * 
	 */
	Charts.prototype = {
		consts : _consts,

		init : function() {
			if (this.hasInit)
				return 0;
			this.hasInit = !0;
			if ($(this.consts.CHART).length > 0){
				var load = this._initCharts();
				this._loadCharts(load);
				this._initBtn();
			}
				
		},
		/**
		 * 初始化echarts框架
		 * 
		 * @return load 加载中组件索引
		 * 
		 */
		_initCharts : function() {
			var me = this
				, template = me.consts.CHARTTEMPLATE
				, chart = me.chart = echarts.init($(me.consts.CHART)[0] , template) 
				, _title = {} , _legend = {} , _xAxis = {} , _yAxis = {} , option = {} , _series = []
			
				, _seriesBase = {type : 'bar' , data : [] , barMinHeight : 2 , barCategoryGap : '50%' 
					, tooltip : { formatter : function(param , t , cb){
						var data = param.data
							, title = param.name
							, status = data.name.split('@')[1]
							, value = data.value
							, typeName = param.seriesName ,res;
						res = title + '<br>●&nbsp;' + typeName + ' : ' + value + '人<br>●&nbsp;作业状态 : ' + status;
						if(status == '进行中' && typeName == '未提交')
							res += '<br>●&nbsp;点击催促学生提交';
						else if(status == '已结束' && typeName == '未提交')
							res += '<br>●&nbsp;点击导出未提交名单';
						else if(status != '未开始' && typeName == '已提交')
							res += '<br>●&nbsp;点击对此作业进行批阅';
						return res;
					}} , label : { normal : { show : true , position : 'top'}}}
				, _zoomBase = {start : 10 , end : 60}
			
				, _series = [ $.extend({} , _seriesBase , {name : '已提交' , itemStyle : {normal : { color : 'lightgreen'} } } )
				             , $.extend({} , _seriesBase , {name : '未提交' , itemStyle : {normal : { color : 'lightgray'} } } ) ]
				, _dataZoom = [ $.extend({} , _zoomBase , {type : 'slider'})
				                		 , $.extend({} , _zoomBase , {type : 'inside'}) ]
				
				_title.text = crsName+'作业数据统计' ;
				_legend.data = [ '已提交','未提交' ] ;
				_xAxis.name = '名称' ;
				_xAxis.data = [];
				_yAxis.name = '数量' ;
				option = {
					title : _title
					, tooltip : {}
					, legend : _legend
					, series : _series
					, xAxis : _xAxis
					, yAxis : _yAxis
					, dataZoom : _dataZoom 
				};
				chart.setOption( option );
				DialogUtil.msg('数据准备中，请稍候...');
				return DialogUtil.load();
		}
		/**
		 * 加载echart数据信息
		 * 
		 * @param load 加载中组件索引
		 * 
		 */
		, _loadCharts : function(load){
			var me = this
				, chart = me.chart
				, postUrl = 'getSubmitData.htm' 
				, postData = {};
			postData.crsTchId = crsTchId;
			
			$.getJSON(postUrl , postData , function(datas){
				
				var option = {};
				option.xAxis = {};
				//加载横坐标：作业列表
				option.xAxis.data = datas.jobs;
				
				//加载两系列的值
				option.series=[{data : datas.submitted }
							, {data : datas.unSubmitted } ];
				//添加至echarts中
				chart.setOption( option );
				DialogUtil.close( load );
				me._bindEvent();
			});
		}
		/**
		 * 绑定echarts事件方法
		 */
		, _bindEvent : function(){
			var me = this 
				, chart = me.chart;
			
			chart.on('click' , function(params){
				var data = params.data
					, title = params.name
					, jobId = data.name.split('@')[0]
					, status = data.name.split('@')[1]
					, value = data.value
					, type = params.seriesIndex;//0:点击已提交，1:点击未提交
				if(type == 1){
					if( status == '进行中'){
						value == 0 ? DialogUtil.msg('此作业已全部提交!') : DialogUtil.confirm('是否催促此'+value+'名学生提交作业？' , function(rtn){
							if(rtn){
								if(localStorage.getItem(crsName + jobId) != 1){
									var url = __ctx + '/gradp/course/crsTch/sendMail.htm'
										, data = {
												title : title
												, crsName : crsName
												, jobId : jobId
											};
									$.post(url , data , function(){
										DialogUtil.msg('催促成功！已将催促邮件发送至学生邮箱！');
									});
//									localStorage.setItem(crsName + jobId , 1) ;
									
								}else{
									DialogUtil.msg('您已催促过学生，请耐心等待学生提交。');
								}
							}
						});
					}else if(status == '已结束'){
						DialogUtil.confirm('导出此作业的未提交名单？',function(rtn){
							rtn ? location.href = __ctx + '/gradp/course/crsTch/export.htm?type=unSubmitted&jobId='+jobId+'&title='+title+'&crsName='+crsName : DialogUtil.msg('操作取消');
						});
					}else
						DialogUtil.msg('尚未开始');
						
				}else{//点击的是已提交的
					DialogUtil.msg( value>0? title + '共有'+value+'名学生提交！' : '还没有学生提交此作业');
					location.href = __ctx + '/gradp/course/jobStd/markScore.htm?jobId='+jobId+'&title='+title+'&crsTchId='+crsTchId;
				}
			});
		}
		, _initBtn : function(){
			var me = this;
			$('a.fa-refresh').on('click' , function(){
				echarts.dispose($(me.consts.CHART)[0]);
				var load = me._initCharts();
				me._loadCharts(load);
			})
			var url = __ctx + '/gradp/course/crsTch/export.htm?type=unSubmitted&crsTchId='+crsTchId+'&crsName='+crsName;
			$('a.export-unSubmitted').attr('href',url);
		}
	}
})();
