package com.lc.ibps.pgs.Location.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.Location.domain.DingWei;
import com.lc.ibps.pgs.Location.repository.DingWeiRepository;
import com.lc.ibps.pgs.Location.persistence.dao.DingWeiQueryDao;
import com.lc.ibps.pgs.Location.persistence.entity.DingWeiPo;

/**
 * t_pydwb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 14:51:08
 *</pre>
 */
@Repository
public class DingWeiRepositoryImpl extends AbstractRepository<String, DingWeiPo,DingWei> implements DingWeiRepository{
	  
	@Resource
	private  DingWeiQueryDao dingWeiQueryDao;

	public DingWei newInstance() {
		DingWeiPo po = new DingWeiPo();
		DingWei dingWei = AppUtil.getBean(DingWei.class);
		dingWei.setData(po);
		return dingWei;
	}

	public DingWei newInstance(DingWeiPo po) {
		DingWei dingWei = AppUtil.getBean(DingWei.class);
		dingWei.setData(po);
		return dingWei;
	} 
	
	@Override
	protected IQueryDao<String, DingWeiPo> getQueryDao() {
		return dingWeiQueryDao;
	}
	

	
}
