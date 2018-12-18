package com.lc.ibps.loans.mulu.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.mulu.persistence.dao.MuLuDao;
import com.lc.ibps.loans.mulu.persistence.dao.MuLuQueryDao;
import com.lc.ibps.loans.mulu.persistence.entity.MuLuPo;

/**
 * t_mlsl 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:36:42
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class MuLu extends AbstractDomain<String, MuLuPo>{
	 
	private MuLuDao muLuDao = null;
	private MuLuQueryDao muLuQueryDao = null;


	protected void init(){
		muLuDao = AppUtil.getBean(MuLuDao.class);
		muLuQueryDao = AppUtil.getBean(MuLuQueryDao.class);
		this.setDao(muLuDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(muLuQueryDao.get(getId())));
	}
	
}
