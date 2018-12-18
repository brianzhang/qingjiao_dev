package com.lc.ibps.lyzygls.DDiChuSX.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.dao.DDiChuSXDao;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.dao.DDiChuSXQueryDao;
import com.lc.ibps.lyzygls.DDiChuSX.persistence.entity.DDiChuSXPo;


/**
 * 该表用于单位概况的地处水系数据 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:21:48
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DDiChuSX extends AbstractDomain<String, DDiChuSXPo>{
	 
	private DDiChuSXDao dDiChuSXDao = null;
	private DDiChuSXQueryDao dDiChuSXQueryDao = null;

	

	protected void init(){
		dDiChuSXDao = AppUtil.getBean(DDiChuSXDao.class);
		dDiChuSXQueryDao = AppUtil.getBean(DDiChuSXQueryDao.class);
		this.setDao(dDiChuSXDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(dDiChuSXQueryDao.get(getId())));
	}
	
	
}
