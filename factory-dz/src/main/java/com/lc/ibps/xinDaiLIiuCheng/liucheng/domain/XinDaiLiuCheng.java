package com.lc.ibps.xinDaiLIiuCheng.liucheng.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao.XinDaiLiuChengDao;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao.XinDaiLiuChengQueryDao;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

/**
 * t_xdlc 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class XinDaiLiuCheng extends AbstractDomain<String, XinDaiLiuChengPo>{
	 
	private XinDaiLiuChengDao xinDaiLiuChengDao = null;
	private XinDaiLiuChengQueryDao xinDaiLiuChengQueryDao = null;


	protected void init(){
		xinDaiLiuChengDao = AppUtil.getBean(XinDaiLiuChengDao.class);
		xinDaiLiuChengQueryDao = AppUtil.getBean(XinDaiLiuChengQueryDao.class);
		this.setDao(xinDaiLiuChengDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(xinDaiLiuChengQueryDao.get(getId())));
	}
	
}
