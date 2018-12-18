
package com.lc.ibps.test.demo.service.impl;


import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.datasource.dynamic.DataSourceUtil;
import com.lc.ibps.bpmn.api.cmd.ActionCmd;
import com.lc.ibps.test.demo.domain.DsTest;
import com.lc.ibps.test.demo.persistence.dao.DsTestDao;
import com.lc.ibps.test.demo.persistence.entity.DsTestPo;
import com.lc.ibps.test.demo.repository.DsTestRepository;
import com.lc.ibps.test.demo.service.DsTestService;

import net.sf.json.JSONObject;

/**
 * TEST 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:35
 *</pre>
 */
@Service
public class DsTestServiceImpl implements DsTestService{
	  
	@Resource
	private DsTestRepository testRepository;
	@Resource
	private DsTestDao testDao;
	
	@Resource
	private JdbcTemplate jdbcTemplate;

	@Override
	public void save(ActionCmd cmd) {
		DsTest test = getDomain(cmd);
		if(BeanUtils.isEmpty(test)){
			return;
		}
		test.save();
	}

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private DsTest getDomain(ActionCmd cmd){
		String busData= cmd.getBusData();
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		DsTestPo po = getFromJson(busData);
		po.setId(cmd.getBusinessKey());
		DsTest test = testRepository.newInstance(po);
		
		return test;
	}

	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DsTestPo getFromJson(String busData){
		JSONObject jsonObj = JSONObject.fromObject(busData);
		
		DsTestPo testPo = getTestPo(jsonObj);

		return testPo;
	}
	
	/** 
	 * 获取TEST数据
	 *
	 * @param jsonObj
	 */
	private DsTestPo getTestPo(JSONObject jsonObj){
		DsTestPo testPo = (DsTestPo) JsonUtil.getDTO(jsonObj.toString(), DsTestPo.class);
		return testPo;
	}
	
	// 普通数据源
	public void dbTest() {
		
		Connection ibps1 = null;
		Statement ibps1Stmt = null;
		Connection oracle = null;
		Statement oracleStmt = null;
		
		try {
			
			DataSource ibps1ds = DataSourceUtil.getDataSourceByAlias("ibps1");
			DataSource oracleds = DataSourceUtil.getDataSourceByAlias("oracle");
			
			ibps1 = ibps1ds.getConnection();
			oracle = oracleds.getConnection();
			
			ibps1.setAutoCommit(false);
			ibps1Stmt = ibps1.createStatement();
			String sql = "INSERT INTO TEST VALUES('1','11111','11111')";
			ibps1Stmt.execute(sql);
			
			oracle.setAutoCommit(false);
			oracleStmt = oracle.createStatement();
			sql = "INSERT INTO TEST VALUES('3','33333','33333')";
			oracleStmt.execute(sql);
			
			// 测试回滚
//			if(1==1){
//				throw new NullPointerException("编号为空");
//			}
			
			ibps1.commit();
			oracle.commit();
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			try {
				ibps1.rollback();
				oracle.rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}

		} finally {
			
			try {
				ibps1Stmt.close();
				oracleStmt.close();
				ibps1.close();
				oracle.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
		
	}
	
	@Transactional
	public void dbTest1() {
		DsTestPo t2 = new DsTestPo();
		t2.setPk("2");
		t2.setName("22222");
		t2.setAccount("22222");
		testDao.create(t2);
	}
	
	
	// jta 例子
	public void tempTest() {
//		UserTransactionManager jtm = new UserTransactionManager();
//		
//		try {
//			jtm.begin();
//
//			DbContextHolder.setDataSource("ibps1", "mysql");
//			DsTestPo t1 = new DsTestPo();
//			t1.setPk("1");
//			t1.setAccount("11111");
//			t1.setName("11111");
//			testDao.create(t1);
//			
//			DbContextHolder.setDefaultDataSource();
//			DsTestPo t2 = new DsTestPo();
//			t2.setPk("2");
//			t2.setName("22222");
//			t2.setAccount("22222");
//			testDao.create(t2);
//			
//			if(1==1){
//				throw new NullPointerException("编号为空");
//			}
//			jtm.commit();
//		
//		} catch (Exception e) {
//			e.printStackTrace();
//			try {
//				jtm.rollback();
//			} catch (Exception e1) {
//				e1.printStackTrace();
//			} 
//		} finally {
//			jtm.close();
//		}
	}
	
}



