package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.MainTeachLink;
import com.lc.ibps.pgs.PGData.repository.MainTeachLinkRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.MainTeachLinkQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.MainTeachLinkPo;

/**
 * t_p_zyjxhjdpj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:28:30
 *</pre>
 */
@Repository
public class MainTeachLinkRepositoryImpl extends AbstractRepository<String, MainTeachLinkPo,MainTeachLink> implements MainTeachLinkRepository{
	  
	@Resource
	private  MainTeachLinkQueryDao mainTeachLinkQueryDao;

	public MainTeachLink newInstance() {
		MainTeachLinkPo po = new MainTeachLinkPo();
		MainTeachLink mainTeachLink = AppUtil.getBean(MainTeachLink.class);
		mainTeachLink.setData(po);
		return mainTeachLink;
	}

	public MainTeachLink newInstance(MainTeachLinkPo po) {
		MainTeachLink mainTeachLink = AppUtil.getBean(MainTeachLink.class);
		mainTeachLink.setData(po);
		return mainTeachLink;
	} 
	
	@Override
	protected IQueryDao<String, MainTeachLinkPo> getQueryDao() {
		return mainTeachLinkQueryDao;
	}
	

	
}
