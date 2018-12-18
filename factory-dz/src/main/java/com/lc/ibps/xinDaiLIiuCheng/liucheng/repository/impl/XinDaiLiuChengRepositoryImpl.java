package com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.domain.XinDaiLiuCheng;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.repository.XinDaiLiuChengRepository;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao.XinDaiLiuChengQueryDao;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

/**
 * t_xdlc 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 */
@Repository
public class XinDaiLiuChengRepositoryImpl extends AbstractRepository<String, XinDaiLiuChengPo,XinDaiLiuCheng> implements XinDaiLiuChengRepository{
	  
	@Resource
	private  XinDaiLiuChengQueryDao xinDaiLiuChengQueryDao;

	public XinDaiLiuCheng newInstance() {
		XinDaiLiuChengPo po = new XinDaiLiuChengPo();
		XinDaiLiuCheng xinDaiLiuCheng = AppUtil.getBean(XinDaiLiuCheng.class);
		xinDaiLiuCheng.setData(po);
		return xinDaiLiuCheng;
	}

	public XinDaiLiuCheng newInstance(XinDaiLiuChengPo po) {
		XinDaiLiuCheng xinDaiLiuCheng = AppUtil.getBean(XinDaiLiuCheng.class);
		xinDaiLiuCheng.setData(po);
		return xinDaiLiuCheng;
	} 
	
	@Override
	protected IQueryDao<String, XinDaiLiuChengPo> getQueryDao() {
		return xinDaiLiuChengQueryDao;
	}

	@Override
	public XinDaiLiuChengPo getByJdid(String jdid) {
		List<XinDaiLiuChengPo> xinDaiLiuChengList = xinDaiLiuChengQueryDao.getByJdId(jdid);
		if(xinDaiLiuChengList.size()==0){
			return null;
		}else{
			XinDaiLiuChengPo xinDaiLiuCheng =xinDaiLiuChengList.get(0);
			return xinDaiLiuCheng;
		}
	}

//	@Override
//	public XinDaiLiuChengPo getById(String id) {
//		List<XinDaiLiuChengPo> xinDaiLiuChengList = xinDaiLiuChengQueryDao.getById(id);
//		if(xinDaiLiuChengList.size()==0){
//			return null;
//		}else{
//			XinDaiLiuChengPo xinDaiLiuCheng =xinDaiLiuChengList.get(0);
//			return xinDaiLiuCheng;
//		}
//	}
	

	
}
