package com.lc.ibps.repair.WXGHaoCaiShiYong.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.repair.WXGHaoCaiShiYong.domain.HaoCaiShiYong;
import com.lc.ibps.repair.WXGHaoCaiShiYong.repository.HaoCaiShiYongRepository;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.dao.HaoCaiShiYongQueryDao;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.entity.HaoCaiShiYongPo;

/**
 * t_wxghcsyb 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:39:21
 *</pre>
 */
@Repository
public class HaoCaiShiYongRepositoryImpl extends AbstractRepository<String, HaoCaiShiYongPo,HaoCaiShiYong> implements HaoCaiShiYongRepository{
	  
	@Resource
	private  HaoCaiShiYongQueryDao haoCaiShiYongQueryDao;

	public HaoCaiShiYong newInstance() {
		HaoCaiShiYongPo po = new HaoCaiShiYongPo();
		HaoCaiShiYong haoCaiShiYong = AppUtil.getBean(HaoCaiShiYong.class);
		haoCaiShiYong.setData(po);
		return haoCaiShiYong;
	}

	public HaoCaiShiYong newInstance(HaoCaiShiYongPo po) {
		HaoCaiShiYong haoCaiShiYong = AppUtil.getBean(HaoCaiShiYong.class);
		haoCaiShiYong.setData(po);
		return haoCaiShiYong;
	} 
	
	@Override
	protected IQueryDao<String, HaoCaiShiYongPo> getQueryDao() {
		return haoCaiShiYongQueryDao;
	}
	

	
}
