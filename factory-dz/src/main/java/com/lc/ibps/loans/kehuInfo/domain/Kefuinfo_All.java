package com.lc.ibps.loans.kehuInfo.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.kehuInfo.persistence.dao.Kefuinfo_AllDao;
import com.lc.ibps.loans.kehuInfo.persistence.dao.Kefuinfo_AllQueryDao;
import com.lc.ibps.loans.kehuInfo.persistence.entity.Kefuinfo_AllPo;

/**
 * t_kefuinfo_all 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-27 19:57:07
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Kefuinfo_All extends AbstractDomain<String, Kefuinfo_AllPo>{
	 
	private Kefuinfo_AllDao kefuinfo_AllDao = null;
	private Kefuinfo_AllQueryDao kefuinfo_AllQueryDao = null;


	protected void init(){
		kefuinfo_AllDao = AppUtil.getBean(Kefuinfo_AllDao.class);
		kefuinfo_AllQueryDao = AppUtil.getBean(Kefuinfo_AllQueryDao.class);
		this.setDao(kefuinfo_AllDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(kefuinfo_AllQueryDao.get(getId())));
	}
	
}
