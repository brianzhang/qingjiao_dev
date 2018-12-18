package com.lc.ibps.pgs.Pymb.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Pymb.persistence.dao.PymbDao;
import com.lc.ibps.pgs.Pymb.persistence.dao.PymbQueryDao;
import com.lc.ibps.pgs.Pymb.persistence.entity.PymbPo;


/**
 * t_pymb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 15:10:25
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Pymb extends AbstractDomain<String, PymbPo>{
	 
	private PymbDao pymbDao = null;
	private PymbQueryDao pymbQueryDao = null;

	

	protected void init(){
		pymbDao = AppUtil.getBean(PymbDao.class);
		pymbQueryDao = AppUtil.getBean(PymbQueryDao.class);
		this.setDao(pymbDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(pymbQueryDao.get(getId())));
	}
	
	
}
