package com.lc.ibps.pgs.PingJia.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PingJia.persistence.dao.PingJiaDao;
import com.lc.ibps.pgs.PingJia.persistence.dao.PingJiaQueryDao;
import com.lc.ibps.pgs.PingJia.persistence.entity.PingJiaPo;


/**
 * t_pymbpj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:18:49
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class PingJia extends AbstractDomain<String, PingJiaPo>{
	 
	private PingJiaDao pingJiaDao = null;
	private PingJiaQueryDao pingJiaQueryDao = null;

	

	protected void init(){
		pingJiaDao = AppUtil.getBean(PingJiaDao.class);
		pingJiaQueryDao = AppUtil.getBean(PingJiaQueryDao.class);
		this.setDao(pingJiaDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(pingJiaQueryDao.get(getId())));
	}
	
	
}
