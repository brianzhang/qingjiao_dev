package com.lc.ibps.loans.baoZhengRen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.baoZhengRen.persistence.dao.BZRXXBDao;
import com.lc.ibps.loans.baoZhengRen.persistence.dao.BZRXXBQueryDao;
import com.lc.ibps.loans.baoZhengRen.persistence.entity.BZRXXBPo;

/**
 * t_bzrxxb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:18
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class BZRXXB extends AbstractDomain<String, BZRXXBPo>{
	 
	private BZRXXBDao bZRXXBDao = null;
	private BZRXXBQueryDao bZRXXBQueryDao = null;


	protected void init(){
		bZRXXBDao = AppUtil.getBean(BZRXXBDao.class);
		bZRXXBQueryDao = AppUtil.getBean(BZRXXBQueryDao.class);
		this.setDao(bZRXXBDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(bZRXXBQueryDao.get(getId())));
	}
	
}
