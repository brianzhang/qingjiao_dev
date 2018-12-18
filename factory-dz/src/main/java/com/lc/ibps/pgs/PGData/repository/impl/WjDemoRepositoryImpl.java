package com.lc.ibps.pgs.PGData.repository.impl;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.WjDemo;
import com.lc.ibps.pgs.PGData.repository.WjDemoRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.WjDemoQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.WjDemoPo;

/**
 * t_p_wjdc_test 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2018-04-18 17:28:15
 *</pre>
 */
@Repository
public class WjDemoRepositoryImpl extends AbstractRepository<String, WjDemoPo,WjDemo> implements WjDemoRepository{
	  
	@Resource
	private  WjDemoQueryDao wjDemoQueryDao;

	public WjDemo newInstance() {
		WjDemoPo po = new WjDemoPo();
		WjDemo wjDemo = AppUtil.getBean(WjDemo.class);
		wjDemo.setData(po);
		return wjDemo;
	}

	public WjDemo newInstance(WjDemoPo po) {
		WjDemo wjDemo = AppUtil.getBean(WjDemo.class);
		wjDemo.setData(po);
		return wjDemo;
	} 
	
	@Override
	protected IQueryDao<String, WjDemoPo> getQueryDao() {
		return wjDemoQueryDao;
	}

	@Override
	public List<WjDemoPo> getByWjtype(String type) {
		// TODO Auto-generated method stub
		
		return wjDemoQueryDao.findByKey("getByWjtype", type);
	}
	

	
}
