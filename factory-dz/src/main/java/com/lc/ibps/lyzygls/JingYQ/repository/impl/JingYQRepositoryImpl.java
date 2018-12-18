package com.lc.ibps.lyzygls.JingYQ.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.JingYQ.domain.JingYQ;
import com.lc.ibps.lyzygls.JingYQ.repository.JingYQRepository;
import com.lc.ibps.lyzygls.JingYQ.persistence.dao.JingYQQueryDao;
import com.lc.ibps.lyzygls.JingYQ.persistence.entity.JingYQPo;

/**
 * t_jyq 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:16:30
 *</pre>
 */
@Repository
public class JingYQRepositoryImpl extends AbstractRepository<String, JingYQPo,JingYQ> implements JingYQRepository{
	  
	@Resource
	private  JingYQQueryDao jingYQQueryDao;

	public JingYQ newInstance() {
		JingYQPo po = new JingYQPo();
		JingYQ jingYQ = AppUtil.getBean(JingYQ.class);
		jingYQ.setData(po);
		return jingYQ;
	}

	public JingYQ newInstance(JingYQPo po) {
		JingYQ jingYQ = AppUtil.getBean(JingYQ.class);
		jingYQ.setData(po);
		return jingYQ;
	} 
	
	@Override
	protected IQueryDao<String, JingYQPo> getQueryDao() {
		return jingYQQueryDao;
	}
	

	
}
