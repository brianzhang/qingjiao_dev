package com.lc.ibps.lyzygls.DiChuSX.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.DiChuSX.domain.DiChuSX;
import com.lc.ibps.lyzygls.DiChuSX.repository.DiChuSXRepository;
import com.lc.ibps.lyzygls.DiChuSX.persistence.dao.DiChuSXQueryDao;
import com.lc.ibps.lyzygls.DiChuSX.persistence.entity.DiChuSXPo;

/**
 * 该表用于单位概况的地处山系数据 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:20:04
 *</pre>
 */
@Repository
public class DiChuSXRepositoryImpl extends AbstractRepository<String, DiChuSXPo,DiChuSX> implements DiChuSXRepository{
	  
	@Resource
	private  DiChuSXQueryDao diChuSXQueryDao;

	public DiChuSX newInstance() {
		DiChuSXPo po = new DiChuSXPo();
		DiChuSX diChuSX = AppUtil.getBean(DiChuSX.class);
		diChuSX.setData(po);
		return diChuSX;
	}

	public DiChuSX newInstance(DiChuSXPo po) {
		DiChuSX diChuSX = AppUtil.getBean(DiChuSX.class);
		diChuSX.setData(po);
		return diChuSX;
	} 
	
	@Override
	protected IQueryDao<String, DiChuSXPo> getQueryDao() {
		return diChuSXQueryDao;
	}
	

	
}
