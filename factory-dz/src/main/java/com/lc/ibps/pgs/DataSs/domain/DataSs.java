package com.lc.ibps.pgs.DataSs.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.DataSs.persistence.dao.DataSsDao;
import com.lc.ibps.pgs.DataSs.persistence.dao.DataSsQueryDao;
import com.lc.ibps.pgs.DataSs.persistence.entity.DataSsPo;


/**
 * t_sjly 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 17:12:48
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DataSs extends AbstractDomain<String, DataSsPo>{
	 
	private DataSsDao dataSsDao = null;
	private DataSsQueryDao dataSsQueryDao = null;

	

	protected void init(){
		dataSsDao = AppUtil.getBean(DataSsDao.class);
		dataSsQueryDao = AppUtil.getBean(DataSsQueryDao.class);
		this.setDao(dataSsDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(dataSsQueryDao.get(getId())));
	}
	
	
}
