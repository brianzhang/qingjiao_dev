package com.lc.ibps.loans.diyarenAll.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.diyarenAll.persistence.dao.Dyr_AllDao;
import com.lc.ibps.loans.diyarenAll.persistence.dao.Dyr_AllQueryDao;
import com.lc.ibps.loans.diyarenAll.persistence.entity.Dyr_AllPo;

/**
 * t_dyr_all 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 07:50:38
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Dyr_All extends AbstractDomain<String, Dyr_AllPo>{
	 
	private Dyr_AllDao dyr_AllDao = null;
	private Dyr_AllQueryDao dyr_AllQueryDao = null;


	protected void init(){
		dyr_AllDao = AppUtil.getBean(Dyr_AllDao.class);
		dyr_AllQueryDao = AppUtil.getBean(Dyr_AllQueryDao.class);
		this.setDao(dyr_AllDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(dyr_AllQueryDao.get(getId())));
	}
	
}
