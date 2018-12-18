package com.lc.ibps.loans.GTGSHXX.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.GTGSHXX.persistence.dao.GTGSHXXDao;
import com.lc.ibps.loans.GTGSHXX.persistence.dao.GTGSHXXQueryDao;
import com.lc.ibps.loans.GTGSHXX.persistence.entity.GTGSHXXPo;

/**
 * t_gtgshxxb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:47
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class GTGSHXX extends AbstractDomain<String, GTGSHXXPo>{
	 
	private GTGSHXXDao gTGSHXXDao = null;
	private GTGSHXXQueryDao gTGSHXXQueryDao = null;


	protected void init(){
		gTGSHXXDao = AppUtil.getBean(GTGSHXXDao.class);
		gTGSHXXQueryDao = AppUtil.getBean(GTGSHXXQueryDao.class);
		this.setDao(gTGSHXXDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(gTGSHXXQueryDao.get(getId())));
	}
	
}
