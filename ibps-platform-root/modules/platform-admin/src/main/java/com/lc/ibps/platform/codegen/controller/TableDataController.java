
package com.lc.ibps.platform.codegen.controller;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.ibatis.datasource.pooled.PooledDataSourceFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.ds.persistence.entity.DataSourcePo;
import com.lc.ibps.common.ds.persistence.service.DataSourceSetService;
import com.utils.CollectionUtil;

/**
 * 生成类型 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-05 09:00:32
 * </pre>
 */
@Controller
@RequestMapping("/platform/codegen/tableData/")
public class TableDataController extends GenericController {
	@Resource
	private DataSourceSetService dataSourceSetService;
	@RequestMapping("select")
	public @ResponseBody List select(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String select = RequestUtil.getString(request, "select","name");
		String tableName = RequestUtil.getString(request, "tableName" ,"t_course_param_modal");
		String where = com.utils.StringUtil.getFromRequest(request, "where");
		String whereK = RequestUtil.getString(request, "whereK");
		String whereV = com.utils.StringUtil.getFromRequest(request, "whereV");
		DataSourcePo dp = dataSourceSetService.getByAlias("dataSource_default");
		Properties properties = new Properties();
		properties.setProperty("driver", dp.getDriver());
		properties.setProperty("url", dp.getDriverUrl());
		properties.setProperty("username", dp.getUser());
		properties.setProperty("password", dp.getPassword());
		PooledDataSourceFactory pooledDataSourceFactory = new PooledDataSourceFactory();
		pooledDataSourceFactory.setProperties(properties);
		DataSource dataSource = pooledDataSourceFactory.getDataSource();
		Connection con = null;
		String sql = "select id_," + select + " from " + tableName;
		if(select.split(",").length>1)
			sql = "select id_crs_tch , "+select + " from " + tableName;
		if(StringUtil.isNoneEmpty( where ))
			sql += " where " + where;
		if( StringUtil.isNotEmpty( whereV ) ){
			if( sql.contains("where"))
				sql += " and ";
			else
				sql += " where ";
			whereK = " ( ".concat(whereK.replaceAll(",", " like '%"+whereV+"%' or ").concat( " like '%"+whereV +"%'") ).concat(" ) ") ;
			sql += whereK;
		}
		Map<String,String> res = new HashMap();
		try {
			Class.forName(dp.getDriver());
			con = dataSource.getConnection();
			Statement s = con.createStatement();
			ResultSet r = s.executeQuery(sql);
			int count = r.getMetaData().getColumnCount();
			while (r.next()) {
				if(count == 2)
					res.put(r.getString(1),r.getString(2));
				else
					res.put(r.getString(1),r.getString(2)+"——"+r.getString(3)+"——"+(r.getString(4).length()>20?r.getString(4).substring(0, 19):r.getString(4))+"...");
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} catch (Exception e) {
			e.getStackTrace();
		} finally {
			con.close();
		}
		return CollectionUtil.buildData(res);
	}

}
