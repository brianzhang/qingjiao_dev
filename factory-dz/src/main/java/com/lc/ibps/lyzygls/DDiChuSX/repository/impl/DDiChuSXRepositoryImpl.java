package com.lc.ibps.lyzygls.DDiChuSX.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.DDiChuSX.domain.DDiChuSX;
import com.lc.ibps.lyzygls.DDiChuSX.repository.DDiChuSXRepository;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.dao.DDiChuSXQueryDao;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.entity.DDiChuSXPo;

/**
 * 该表用于单位概况的地处水系数据 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:21:48
 *</pre>
 */
@Repository
public class DDiChuSXRepositoryImpl extends AbstractRepository<String, DDiChuSXPo,DDiChuSX> implements DDiChuSXRepository{
	  
	@Resource
	private  DDiChuSXQueryDao dDiChuSXQueryDao;

	public DDiChuSX newInstance() {
		DDiChuSXPo po = new DDiChuSXPo();
		DDiChuSX dDiChuSX = AppUtil.getBean(DDiChuSX.class);
		dDiChuSX.setData(po);
		return dDiChuSX;
	}

	public DDiChuSX newInstance(DDiChuSXPo po) {
		DDiChuSX dDiChuSX = AppUtil.getBean(DDiChuSX.class);
		dDiChuSX.setData(po);
		return dDiChuSX;
	} 
	
	@Override
	protected IQueryDao<String, DDiChuSXPo> getQueryDao() {
		return dDiChuSXQueryDao;
	}
	

	
}
