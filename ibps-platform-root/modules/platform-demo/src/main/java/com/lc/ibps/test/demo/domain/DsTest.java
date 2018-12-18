
package com.lc.ibps.test.demo.domain;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.test.demo.persistence.dao.DsTestDao;
import com.lc.ibps.test.demo.persistence.entity.DsTestPo;

/**
 * TEST 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:34
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class DsTest extends AbstractDomain<String, DsTestPo>{
	
	private DsTestDao dsTestDao = null;	
	
	@Resource
	private JdbcTemplate jdbcTemplate = null;	

	protected void init(){
		dsTestDao = AppUtil.getBean(DsTestDao.class);
		this.setDao(dsTestDao);
	}	
	
	public void dbTest(){
		
		DbContextHolder.setDataSource("ibps1", "mysql");
		DsTestPo t1 = new DsTestPo();
		t1.setId("1");
		t1.setAccount("111111");
		t1.setName("11111");
		dsTestDao.create(t1);
		
		DsTestPo t2 = new DsTestPo();
		t2.setId("2");
		t2.setAccount("22222");
		t2.setName("222222");
		dsTestDao.create(t2);
		
	}
	
	public void testTemp(){
		
		DsTestPo t1 = new DsTestPo();
		t1.setId("1");
		t1.setAccount("111111");
		t1.setName("11111");
		dsTestDao.create(t1);
		
		String sql = "INSERT INTO TEST VALUES('3','33333','33333')";
		jdbcTemplate.execute(sql);
		
		sql = "create table test1(ID_ varchar(64) NOT NULL,ACCOUNT_ varchar(64) DEFAULT NULL,PRIMARY KEY (ID_))";
		jdbcTemplate.execute(sql);
		
		// 测试回滚
		if(1==1){
			throw new NullPointerException("编号为空");
		}
		
	}
	
}
