package com.lc.ibps.lyzygls.DiChuSX.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.DiChuSX.persistence.dao.DiChuSXDao;
import com.lc.ibps.lyzygls.DiChuSX.persistence.dao.DiChuSXQueryDao;
import com.lc.ibps.lyzygls.DiChuSX.persistence.entity.DiChuSXPo;


/**
 * 该表用于单位概况的地处山系数据 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:20:04
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DiChuSX extends AbstractDomain<String, DiChuSXPo>{
	 
	private DiChuSXDao diChuSXDao = null;
	private DiChuSXQueryDao diChuSXQueryDao = null;

	

	protected void init(){
		diChuSXDao = AppUtil.getBean(DiChuSXDao.class);
		diChuSXQueryDao = AppUtil.getBean(DiChuSXQueryDao.class);
		this.setDao(diChuSXDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(diChuSXQueryDao.get(getId())));
	}
	
	
}
