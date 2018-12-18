package com.lc.ibps.bishes.oldFile.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.bishes.oldFile.persistence.dao.OldFileDao;
import com.lc.ibps.bishes.oldFile.persistence.dao.OldFileQueryDao;
import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;


/**
 * t_oldfile 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-29 16:49:23
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class OldFile extends AbstractDomain<String, OldFilePo>{
	 
	private OldFileDao oldFileDao = null;
	private OldFileQueryDao oldFileQueryDao = null;

	

	@Override
	protected void init(){
		oldFileDao = AppUtil.getBean(OldFileDao.class);
		oldFileQueryDao = AppUtil.getBean(OldFileQueryDao.class);
		this.setDao(oldFileDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(oldFileQueryDao.get(getId())));
	}
	
	
}
