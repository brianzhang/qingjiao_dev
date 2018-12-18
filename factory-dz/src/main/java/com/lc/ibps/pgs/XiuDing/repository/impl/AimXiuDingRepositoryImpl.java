package com.lc.ibps.pgs.XiuDing.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.XiuDing.domain.AimXiuDing;
import com.lc.ibps.pgs.XiuDing.repository.AimXiuDingRepository;
import com.lc.ibps.pgs.XiuDing.persistence.dao.AimXiuDingQueryDao;
import com.lc.ibps.pgs.XiuDing.persistence.entity.AimXiuDingPo;

/**
 * t_pymbxd 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:22:10
 *</pre>
 */
@Repository
public class AimXiuDingRepositoryImpl extends AbstractRepository<String, AimXiuDingPo,AimXiuDing> implements AimXiuDingRepository{
	  
	@Resource
	private  AimXiuDingQueryDao aimXiuDingQueryDao;

	public AimXiuDing newInstance() {
		AimXiuDingPo po = new AimXiuDingPo();
		AimXiuDing aimXiuDing = AppUtil.getBean(AimXiuDing.class);
		aimXiuDing.setData(po);
		return aimXiuDing;
	}

	public AimXiuDing newInstance(AimXiuDingPo po) {
		AimXiuDing aimXiuDing = AppUtil.getBean(AimXiuDing.class);
		aimXiuDing.setData(po);
		return aimXiuDing;
	} 
	
	@Override
	protected IQueryDao<String, AimXiuDingPo> getQueryDao() {
		return aimXiuDingQueryDao;
	}
	

	
}
