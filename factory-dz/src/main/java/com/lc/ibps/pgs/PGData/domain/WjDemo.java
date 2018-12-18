package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.WjDemoDao;
import com.lc.ibps.pgs.PGData.persistence.dao.WjDemoQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.WjDemoPo;

/**
 * t_p_wjdc_test 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2018-04-18 17:28:15
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class WjDemo extends AbstractDomain<String, WjDemoPo>{
	 
	private WjDemoDao wjDemoDao = null;
	private WjDemoQueryDao wjDemoQueryDao = null;


	protected void init(){
		wjDemoDao = AppUtil.getBean(WjDemoDao.class);
		wjDemoQueryDao = AppUtil.getBean(WjDemoQueryDao.class);
		this.setDao(wjDemoDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(wjDemoQueryDao.get(getId())));
	}
	
}
