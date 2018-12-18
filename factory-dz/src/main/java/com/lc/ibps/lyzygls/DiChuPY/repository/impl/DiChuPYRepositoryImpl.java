package com.lc.ibps.lyzygls.DiChuPY.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.DiChuPY.domain.DiChuPY;
import com.lc.ibps.lyzygls.DiChuPY.repository.DiChuPYRepository;
import com.lc.ibps.lyzygls.DiChuPY.persistence.dao.DiChuPYQueryDao;
import com.lc.ibps.lyzygls.DiChuPY.persistence.entity.DiChuPYPo;

/**
 * 该表用于单位概况的地处平原数据 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:18:22
 *</pre>
 */
@Repository
public class DiChuPYRepositoryImpl extends AbstractRepository<String, DiChuPYPo,DiChuPY> implements DiChuPYRepository{
	  
	@Resource
	private  DiChuPYQueryDao diChuPYQueryDao;

	public DiChuPY newInstance() {
		DiChuPYPo po = new DiChuPYPo();
		DiChuPY diChuPY = AppUtil.getBean(DiChuPY.class);
		diChuPY.setData(po);
		return diChuPY;
	}

	public DiChuPY newInstance(DiChuPYPo po) {
		DiChuPY diChuPY = AppUtil.getBean(DiChuPY.class);
		diChuPY.setData(po);
		return diChuPY;
	} 
	
	@Override
	protected IQueryDao<String, DiChuPYPo> getQueryDao() {
		return diChuPYQueryDao;
	}
	

	
}
