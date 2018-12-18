package com.lc.ibps.loans.ZYXX.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.ZYXX.persistence.dao.ZYXXBDao;
import com.lc.ibps.loans.ZYXX.persistence.dao.ZYXXBQueryDao;
import com.lc.ibps.loans.ZYXX.persistence.entity.ZYXXBPo;

/**
 * t_zyxxb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:55:18
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ZYXXB extends AbstractDomain<String, ZYXXBPo>{
	 
	private ZYXXBDao zYXXBDao = null;
	private ZYXXBQueryDao zYXXBQueryDao = null;


	protected void init(){
		zYXXBDao = AppUtil.getBean(ZYXXBDao.class);
		zYXXBQueryDao = AppUtil.getBean(ZYXXBQueryDao.class);
		this.setDao(zYXXBDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(zYXXBQueryDao.get(getId())));
	}
	
}
