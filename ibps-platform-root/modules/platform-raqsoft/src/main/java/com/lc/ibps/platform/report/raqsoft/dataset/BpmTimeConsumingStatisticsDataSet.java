package com.lc.ibps.platform.report.raqsoft.dataset;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Map;

import com.lc.ibps.report.raqsoft.service.IDBService;
import com.lc.ibps.report.raqsoft.strategy.DBStrategyFactory;
import com.runqian.base4.util.DBTypes;
import com.runqian.base4.util.Logger;
import com.runqian.report4.dataset.CustomDataSetFactory;
import com.runqian.report4.dataset.DataSet;
import com.runqian.report4.dataset.Row;
import com.runqian.report4.usermodel.Context;
import com.runqian.report4.usermodel.DataSetConfig;

/**
 * 流程耗时统计自定义数据集
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2018年2月5日-下午2:45:04
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class BpmTimeConsumingStatisticsDataSet extends CustomDataSetFactory {

	private static String select = "SELECT PROC_DEF_ID_,PROC_DEF_NAME_ ,sum(";
	private static String from = ") cost FROM ibps_bpm_inst_his ih WHERE STATUS_ IN ('end','manualend')";
	@Override
	public DataSet createDataSet(Context ctx, DataSetConfig dsc, boolean retrieve) {
		String datasourceName = dsc.getDataSourceName(); //获取数据集定义里设置的数据源名称
		
		String daType = DBTypes.getDBTypeName(ctx.getDataSourceConfig(dsc.getDataSourceName()).getDBType());
		
		IDBService dbService = DBStrategyFactory.get(daType);
		
		String datasetName = dsc.getName();//获取数据集定义名称
		
		if( datasetName==null || "".equals(datasetName) ) //如果数据集里没有指定数据源，则取系统默认
			datasetName = "ds1"; //取系统默认数据源
		if( datasourceName==null || "".equals(datasourceName) ) //如果数据集里没有指定数据源，则取系统默认
			datasourceName = ctx.getDefDataSourceName(); //取系统默认数据源
		
		int colCount=3; //这是指为列信息分配的空间，一般与实际列数相等为宜 

		Connection con = null;
		Statement stat = null;
		ResultSet rs = null;
		DataSet ds = null;
		StringBuilder sb = new StringBuilder(select);
		sb.append(dbService.dateDiff("CREATE_TIME_", "END_TIME_")).append(from);

		try {
			@SuppressWarnings("unchecked")
			Map<String, String> map = ctx.getParamMap(false); // 获得当前报表的所有参数对照表
			if (map != null) {
				if(isNotEmpty(map.get("createTime"))){
					sb.append(" AND").append(dbService.bigThan("CREATE_TIME_", map.get("createTime")));
				}
				if(isNotEmpty(map.get("endTime"))){
					sb.append(" AND").append(dbService.smallThan("END_TIME_", map.get("endTime")));
				}
			}
			sb.append(" GROUP BY PROC_DEF_ID_,PROC_DEF_NAME_");
			if (map != null) {
				if(isNotEmpty(map.get("sort"))){
					sb.append(" ORDER BY cost ").append(map.get("sort"));
				}
			}
			con = ctx.getConnectionFactory(datasourceName).getConnection(); // 获取数据库连接
			
			Logger.info("ds1=" + sb.toString());
				
			stat = con.prepareStatement(sb.toString());
			rs = stat.executeQuery(sb.toString());
			ds = new DataSet(colCount, datasetName);
			ds.addCol("PROC_DEF_ID");
			ds.addCol("PROC_DEF_NAME");
			ds.addCol("TIME_CONSUMING");
			while (rs.next()) {
				Row row = ds.addRow();
				row.setData(1, rs.getString("PROC_DEF_ID_"));
				row.setData(2, rs.getString("PROC_DEF_NAME_"));
				row.setData(3, rs.getInt("cost"));
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}finally {
			try { if(rs!=null) rs.close(); } catch (SQLException e) {}
			try { if(stat!=null) stat.close(); } catch (SQLException e) {}
			try { if(con!=null) con.close(); } catch (SQLException e) {}
		}

		return ds;
	}
	
	public static Boolean isNotEmpty(String str){
		return !(str==null||str.length()==0);
	}
	
}
