package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetDataSourceDao;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetDataSourceQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetDataSourcePo;


/**
 * t_p_pymbhlxpjsjly 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:16:11
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class TargetDataSource extends AbstractDomain<String, TargetDataSourcePo>{
	 
	private TargetDataSourceDao targetDataSourceDao = null;
	private TargetDataSourceQueryDao targetDataSourceQueryDao = null;

	

	protected void init(){
		targetDataSourceDao = AppUtil.getBean(TargetDataSourceDao.class);
		targetDataSourceQueryDao = AppUtil.getBean(TargetDataSourceQueryDao.class);
		this.setDao(targetDataSourceDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(targetDataSourceQueryDao.get(getId())));
	}
	
	
}
