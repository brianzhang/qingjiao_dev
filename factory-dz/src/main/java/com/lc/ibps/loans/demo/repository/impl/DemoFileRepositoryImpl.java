package com.lc.ibps.loans.demo.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.demo.domain.DemoFile;
import com.lc.ibps.loans.demo.repository.DemoFileRepository;
import com.lc.ibps.loans.demo.persistence.dao.DemoFileQueryDao;
import com.lc.ibps.loans.demo.persistence.entity.DemoFilePo;

/**
 * t_demo_file_ 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:05:10
 *</pre>
 */
@Repository
public class DemoFileRepositoryImpl extends AbstractRepository<String, DemoFilePo,DemoFile> implements DemoFileRepository{
	  
	@Resource
	private  DemoFileQueryDao demoFileQueryDao;

	public DemoFile newInstance() {
		DemoFilePo po = new DemoFilePo();
		DemoFile demoFile = AppUtil.getBean(DemoFile.class);
		demoFile.setData(po);
		return demoFile;
	}

	public DemoFile newInstance(DemoFilePo po) {
		DemoFile demoFile = AppUtil.getBean(DemoFile.class);
		demoFile.setData(po);
		return demoFile;
	} 
	
	@Override
	protected IQueryDao<String, DemoFilePo> getQueryDao() {
		return demoFileQueryDao;
	}
	

	
}
