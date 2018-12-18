package com.lc.ibps.loans.POXX.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.POXX.persistence.dao.POXXDao;
import com.lc.ibps.loans.POXX.persistence.dao.POXXQueryDao;
import com.lc.ibps.loans.POXX.persistence.entity.POXXPo;

/**
 * t_poxxb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:49:27
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class POXX extends AbstractDomain<String, POXXPo>{
	 
	private POXXDao pOXXDao = null;
	private POXXQueryDao pOXXQueryDao = null;


	protected void init(){
		pOXXDao = AppUtil.getBean(POXXDao.class);
		pOXXQueryDao = AppUtil.getBean(POXXQueryDao.class);
		this.setDao(pOXXDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(pOXXQueryDao.get(getId())));
	}
	
}
