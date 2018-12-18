package com.lc.ibps.platform.desktop.service;


/**
 * 桌面管理数据展示案例。
 *
 * <pre> 
 * 构建组：ibps-common-biz
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年11月22日-下午11:24:40
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public interface DesktopDemoService {
	
	/**
	 * 我的日程例子
	 * @return
	 */
	public String myCalendar();
	/**
	 * 未来一周气温变化(标准折线图)
	 * <p>
	 * 详细配置，请参考echarts插件官网:http://echarts.baidu.com/
	 * </p>
	 * @return
	 */
	public String lineChart();

	/**
	 * 标准折线图数据展示2m
	 * <p>
	 * 详细配置，请参考echarts插件官网:http://echarts.baidu.com/
	 * </p>
	 * @return
	 */
	public String barChart();

	/**
	 * 标准面积图数据展示
	 * <p>
	 * 详细配置，请参考echarts插件官网:http://echarts.baidu.com/
	 * </p>
	 * @return
	 */
	public String standardArea();

	/**
	 * http://echarts.baidu.com/demo.html#mix-timeline-finance
	 */
	public String  mixTimelineFinance();
	
	/**
	 * 
	 * 嵌套环形图
	 *详细配置，请参考echarts插件官:http://echarts.baidu.com/demo.html#pie-nest
	 * @return
	 */
	public String pieChart();

	public String 	scattergram();
}
