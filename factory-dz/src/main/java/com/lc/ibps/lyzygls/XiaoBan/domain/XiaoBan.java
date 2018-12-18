package com.lc.ibps.lyzygls.XiaoBan.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.XiaoBan.persistence.dao.XiaoBanDao;
import com.lc.ibps.lyzygls.XiaoBan.persistence.dao.XiaoBanQueryDao;
import com.lc.ibps.lyzygls.XiaoBan.persistence.entity.XiaoBanPo;


/**
 * t_xb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 16:05:58
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class XiaoBan extends AbstractDomain<String, XiaoBanPo>{
	 
	private XiaoBanDao xiaoBanDao = null;
	private XiaoBanQueryDao xiaoBanQueryDao = null;

	

	protected void init(){
		xiaoBanDao = AppUtil.getBean(XiaoBanDao.class);
		xiaoBanQueryDao = AppUtil.getBean(XiaoBanQueryDao.class);
		this.setDao(xiaoBanDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(xiaoBanQueryDao.get(getId())));
	}
	
	
}
