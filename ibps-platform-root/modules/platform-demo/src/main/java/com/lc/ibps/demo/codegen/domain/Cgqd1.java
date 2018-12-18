package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1Dao;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

import com.lc.ibps.demo.codegen.repository.Cgqd1Repository;
import javax.annotation.Resource;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class Cgqd1 extends AbstractDomain<String, Cgqd1Po>{
	 
	private Cgqd1Dao cgqd1Dao = null;
	private Cgqd1QueryDao cgqd1QueryDao = null;


	protected void init(){
		cgqd1Dao = AppUtil.getBean(Cgqd1Dao.class);
		cgqd1QueryDao = AppUtil.getBean(Cgqd1QueryDao.class);
		this.setDao(cgqd1Dao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(cgqd1QueryDao.get(getId())));
	}
	
	
}