package com.lc.ibps.patrols.data.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.patrols.data.persistence.dao.TchInfoDao;
import com.lc.ibps.patrols.data.persistence.dao.TchInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.TchInfoPo;


/**
 * t_tch_inf 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:49:19
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TchInfo extends AbstractDomain<String, TchInfoPo>{
	 
	private TchInfoDao tchInfoDao = null;
	private TchInfoQueryDao tchInfoQueryDao = null;


	protected void init(){
		tchInfoDao = AppUtil.getBean(TchInfoDao.class);
		tchInfoQueryDao = AppUtil.getBean(TchInfoQueryDao.class);
		this.setDao(tchInfoDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(tchInfoQueryDao.get(getId())));
	}
	
	
}
