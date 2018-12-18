package com.lc.ibps.lyzygls.Shengzhanglv.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.Shengzhanglv.domain.Shangzhanglv;
import com.lc.ibps.lyzygls.Shengzhanglv.repository.ShangzhanglvRepository;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.dao.ShangzhanglvQueryDao;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.entity.ShangzhanglvPo;

/**
 * 该表用于生长率的设置 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:14:02
 *</pre>
 */
@Repository
public class ShangzhanglvRepositoryImpl extends AbstractRepository<String, ShangzhanglvPo,Shangzhanglv> implements ShangzhanglvRepository{
	  
	@Resource
	private  ShangzhanglvQueryDao shangzhanglvQueryDao;

	public Shangzhanglv newInstance() {
		ShangzhanglvPo po = new ShangzhanglvPo();
		Shangzhanglv shangzhanglv = AppUtil.getBean(Shangzhanglv.class);
		shangzhanglv.setData(po);
		return shangzhanglv;
	}

	public Shangzhanglv newInstance(ShangzhanglvPo po) {
		Shangzhanglv shangzhanglv = AppUtil.getBean(Shangzhanglv.class);
		shangzhanglv.setData(po);
		return shangzhanglv;
	} 
	
	@Override
	protected IQueryDao<String, ShangzhanglvPo> getQueryDao() {
		return shangzhanglvQueryDao;
	}
	

	
}
