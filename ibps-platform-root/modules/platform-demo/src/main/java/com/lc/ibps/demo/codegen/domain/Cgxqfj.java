package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqfjDao;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqfjQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

import com.lc.ibps.demo.codegen.repository.CgxqfjRepository;
import javax.annotation.Resource;

/**
 * 采购需求附件 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class Cgxqfj extends AbstractDomain<String, CgxqfjPo>{
	 
	private CgxqfjDao cgxqfjDao = null;
	private CgxqfjQueryDao cgxqfjQueryDao = null;


	protected void init(){
		cgxqfjDao = AppUtil.getBean(CgxqfjDao.class);
		cgxqfjQueryDao = AppUtil.getBean(CgxqfjQueryDao.class);
		this.setDao(cgxqfjDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(cgxqfjQueryDao.get(getId())));
	}
	
	
}