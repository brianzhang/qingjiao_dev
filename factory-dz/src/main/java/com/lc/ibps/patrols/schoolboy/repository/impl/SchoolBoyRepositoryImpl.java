package com.lc.ibps.patrols.schoolboy.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.patrols.schoolboy.domain.SchoolBoy;
import com.lc.ibps.patrols.schoolboy.repository.SchoolBoyRepository;
import com.lc.ibps.patrols.schoolboy.persistence.dao.SchoolBoyQueryDao;
import com.lc.ibps.patrols.schoolboy.persistence.entity.SchoolBoyPo;

/**
 * t_schoolboy 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 12:03:02
 *</pre>
 */
@Repository
public class SchoolBoyRepositoryImpl extends AbstractRepository<String, SchoolBoyPo,SchoolBoy> implements SchoolBoyRepository{
	  
	@Resource
	private  SchoolBoyQueryDao schoolBoyQueryDao;

	public SchoolBoy newInstance() {
		SchoolBoyPo po = new SchoolBoyPo();
		SchoolBoy schoolBoy = AppUtil.getBean(SchoolBoy.class);
		schoolBoy.setData(po);
		return schoolBoy;
	}

	public SchoolBoy newInstance(SchoolBoyPo po) {
		SchoolBoy schoolBoy = AppUtil.getBean(SchoolBoy.class);
		schoolBoy.setData(po);
		return schoolBoy;
	} 
	
	@Override
	protected IQueryDao<String, SchoolBoyPo> getQueryDao() {
		return schoolBoyQueryDao;
	}
	

	
}
