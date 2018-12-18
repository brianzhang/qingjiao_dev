package com.lc.ibps.repair.HCPeiZhi.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.repair.HCPeiZhi.persistence.dao.HaoCaiPeiZhiDao;
import com.lc.ibps.repair.HCPeiZhi.persistence.dao.HaoCaiPeiZhiQueryDao;
import com.lc.ibps.repair.HCPeiZhi.persistence.entity.HaoCaiPeiZhiPo;


/**
 * t_hcpz 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:38:59
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class HaoCaiPeiZhi extends AbstractDomain<String, HaoCaiPeiZhiPo>{
	 
	private HaoCaiPeiZhiDao haoCaiPeiZhiDao = null;
	private HaoCaiPeiZhiQueryDao haoCaiPeiZhiQueryDao = null;

	

	protected void init(){
		haoCaiPeiZhiDao = AppUtil.getBean(HaoCaiPeiZhiDao.class);
		haoCaiPeiZhiQueryDao = AppUtil.getBean(HaoCaiPeiZhiQueryDao.class);
		this.setDao(haoCaiPeiZhiDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(haoCaiPeiZhiQueryDao.get(getId())));
	}
	
	
}
