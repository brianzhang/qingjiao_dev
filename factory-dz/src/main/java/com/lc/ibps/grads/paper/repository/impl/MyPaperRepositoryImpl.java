package com.lc.ibps.grads.paper.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.grads.paper.domain.MyPaper;
import com.lc.ibps.grads.paper.persistence.dao.MyPaperQueryDao;
import com.lc.ibps.grads.paper.persistence.entity.MyPaperPo;
import com.lc.ibps.grads.paper.repository.MyPaperRepository;

/**
 * 我的论文表单 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：xubaocheng
 * 邮箱地址：100000000000@qq.com
 * 创建时间：2017-05-19 12:27:00
 *</pre>
 */
@Repository
public class MyPaperRepositoryImpl extends AbstractRepository<String, MyPaperPo,MyPaper> implements MyPaperRepository{
	  
	@Resource
	private  MyPaperQueryDao myPaperQueryDao;
	
	
	
	@Override
	public MyPaper newInstance() {
		MyPaperPo po = new MyPaperPo();
		MyPaper myPaper = AppUtil.getBean(MyPaper.class);
		myPaper.setData(po);
		return myPaper;
	}

	@Override
	public MyPaper newInstance(MyPaperPo po) {
		MyPaper myPaper = AppUtil.getBean(MyPaper.class);
		myPaper.setData(po);
		return myPaper;
	} 
	
	@Override
	protected IQueryDao<String, MyPaperPo> getQueryDao() {
		return myPaperQueryDao;
	}

	
}
