package com.lc.ibps.lyzygls.JingYQ.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.JingYQ.persistence.dao.JingYQDao;
import com.lc.ibps.lyzygls.JingYQ.persistence.dao.JingYQQueryDao;
import com.lc.ibps.lyzygls.JingYQ.persistence.entity.JingYQPo;


/**
 * t_jyq 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:16:30
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class JingYQ extends AbstractDomain<String, JingYQPo>{
	 
	private JingYQDao jingYQDao = null;
	private JingYQQueryDao jingYQQueryDao = null;

	

	protected void init(){
		jingYQDao = AppUtil.getBean(JingYQDao.class);
		jingYQQueryDao = AppUtil.getBean(JingYQQueryDao.class);
		this.setDao(jingYQDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(jingYQQueryDao.get(getId())));
	}
	
	
}
