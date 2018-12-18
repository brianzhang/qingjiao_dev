package com.lc.ibps.pgs.Report.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Report.domain.Jxjd;
import com.lc.ibps.pgs.Report.repository.JxjdRepository;
import com.lc.ibps.pgs.Report.persistence.dao.JxjdQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.JxjdPo;

/**
 * t_bkkcjxjdb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-26 17:43:13
 *</pre>
 */
@Repository
public class JxjdRepositoryImpl extends AbstractRepository<String, JxjdPo,Jxjd> implements JxjdRepository{
	  
	@Resource
	private  JxjdQueryDao jxjdQueryDao;

	public Jxjd newInstance() {
		JxjdPo po = new JxjdPo();
		Jxjd jxjd = AppUtil.getBean(Jxjd.class);
		jxjd.setData(po);
		return jxjd;
	}

	public Jxjd newInstance(JxjdPo po) {
		Jxjd jxjd = AppUtil.getBean(Jxjd.class);
		jxjd.setData(po);
		return jxjd;
	} 
	
	@Override
	protected IQueryDao<String, JxjdPo> getQueryDao() {
		return jxjdQueryDao;
	}
	

	
}
