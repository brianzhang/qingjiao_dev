package com.lc.ibps.pgs.Location.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Location.persistence.dao.DingWeiDao;
import com.lc.ibps.pgs.Location.persistence.dao.DingWeiQueryDao;
import com.lc.ibps.pgs.Location.persistence.entity.DingWeiPo;


/**
 * t_pydwb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 14:51:08
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DingWei extends AbstractDomain<String, DingWeiPo>{
	 
	private DingWeiDao dingWeiDao = null;
	private DingWeiQueryDao dingWeiQueryDao = null;

	

	protected void init(){
		dingWeiDao = AppUtil.getBean(DingWeiDao.class);
		dingWeiQueryDao = AppUtil.getBean(DingWeiQueryDao.class);
		this.setDao(dingWeiDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(dingWeiQueryDao.get(getId())));
	}
	
	
}
