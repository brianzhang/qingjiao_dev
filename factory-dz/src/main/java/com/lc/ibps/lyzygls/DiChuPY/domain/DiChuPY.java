package com.lc.ibps.lyzygls.DiChuPY.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.DiChuPY.persistence.dao.DiChuPYDao;
import com.lc.ibps.lyzygls.DiChuPY.persistence.dao.DiChuPYQueryDao;
import com.lc.ibps.lyzygls.DiChuPY.persistence.entity.DiChuPYPo;


/**
 * 该表用于单位概况的地处平原数据 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:18:23
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DiChuPY extends AbstractDomain<String, DiChuPYPo>{
	 
	private DiChuPYDao diChuPYDao = null;
	private DiChuPYQueryDao diChuPYQueryDao = null;

	

	protected void init(){
		diChuPYDao = AppUtil.getBean(DiChuPYDao.class);
		diChuPYQueryDao = AppUtil.getBean(DiChuPYQueryDao.class);
		this.setDao(diChuPYDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(diChuPYQueryDao.get(getId())));
	}
	
	
}
