package com.lc.ibps.demo.keshes.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.demo.keshes.domain.Zengjia;
import com.lc.ibps.demo.keshes.repository.ZengjiaRepository;
import com.lc.ibps.demo.keshes.persistence.dao.ZengjiaQueryDao;
import com.lc.ibps.demo.keshes.persistence.entity.ZengjiaPo;

/**
 * keshe 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-06-26 21:44:08
 *</pre>
 */
@Repository
public class ZengjiaRepositoryImpl extends AbstractRepository<String, ZengjiaPo,Zengjia> implements ZengjiaRepository{
	  
	@Resource
	private  ZengjiaQueryDao zengjiaQueryDao;

	public Zengjia newInstance() {
		ZengjiaPo po = new ZengjiaPo();
		Zengjia zengjia = AppUtil.getBean(Zengjia.class);
		zengjia.setData(po);
		return zengjia;
	}

	public Zengjia newInstance(ZengjiaPo po) {
		Zengjia zengjia = AppUtil.getBean(Zengjia.class);
		zengjia.setData(po);
		return zengjia;
	} 
	
	@Override
	protected IQueryDao<String, ZengjiaPo> getQueryDao() {
		return zengjiaQueryDao;
	}
	

	
}