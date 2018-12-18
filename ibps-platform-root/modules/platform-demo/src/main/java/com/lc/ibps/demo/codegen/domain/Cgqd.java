package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.CgqdDao;
import com.lc.ibps.demo.codegen.persistence.dao.CgqdQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;

import com.lc.ibps.demo.codegen.repository.CgqdRepository;
import javax.annotation.Resource;

/**
 * t_purchasedetaillist 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:06
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class Cgqd extends AbstractDomain<String, CgqdPo>{
	 
	private CgqdDao cgqdDao = null;
	private CgqdQueryDao cgqdQueryDao = null;


	protected void init(){
		cgqdDao = AppUtil.getBean(CgqdDao.class);
		cgqdQueryDao = AppUtil.getBean(CgqdQueryDao.class);
		this.setDao(cgqdDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(cgqdQueryDao.get(getId())));
	}
	
	
}