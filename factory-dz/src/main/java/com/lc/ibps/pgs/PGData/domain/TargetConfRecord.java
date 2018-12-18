package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetConfRecordDao;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetConfRecordQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetConfRecordPo;


/**
 * t_p_xyjxyzxwyhtlqkjl 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:10:51
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TargetConfRecord extends AbstractDomain<String, TargetConfRecordPo>{
	 
	private TargetConfRecordDao targetConfRecordDao = null;
	private TargetConfRecordQueryDao targetConfRecordQueryDao = null;

	

	protected void init(){
		targetConfRecordDao = AppUtil.getBean(TargetConfRecordDao.class);
		targetConfRecordQueryDao = AppUtil.getBean(TargetConfRecordQueryDao.class);
		this.setDao(targetConfRecordDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(targetConfRecordQueryDao.get(getId())));
	}
	
	
}
