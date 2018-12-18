package com.lc.ibps.lyzygls.Xiuzheng.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.lyzygls.Xiuzheng.domain.Xiuzheng;
import com.lc.ibps.lyzygls.Xiuzheng.repository.XiuzhengRepository;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.dao.XiuzhengQueryDao;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.entity.XiuzhengPo;

/**
 * 森林资源变化统计表（去年实有和修正值） 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 13:55:35
 *</pre>
 */
@Repository
public class XiuzhengRepositoryImpl extends AbstractRepository<String, XiuzhengPo,Xiuzheng> implements XiuzhengRepository{
	  
	@Resource
	private  XiuzhengQueryDao xiuzhengQueryDao;

	public Xiuzheng newInstance() {
		XiuzhengPo po = new XiuzhengPo();
		Xiuzheng xiuzheng = AppUtil.getBean(Xiuzheng.class);
		xiuzheng.setData(po);
		return xiuzheng;
	}

	public Xiuzheng newInstance(XiuzhengPo po) {
		Xiuzheng xiuzheng = AppUtil.getBean(Xiuzheng.class);
		xiuzheng.setData(po);
		return xiuzheng;
	} 
	
	@Override
	protected IQueryDao<String, XiuzhengPo> getQueryDao() {
		return xiuzhengQueryDao;
	}
	

	
}
