package com.lc.ibps.loans.demo.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.demo.persistence.dao.DemoFileDao;
import com.lc.ibps.loans.demo.persistence.dao.DemoFileQueryDao;
import com.lc.ibps.loans.demo.persistence.entity.DemoFilePo;

/**
 * t_demo_file_ 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:05:10
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DemoFile extends AbstractDomain<String, DemoFilePo>{
	 
	private DemoFileDao demoFileDao = null;
	private DemoFileQueryDao demoFileQueryDao = null;


	protected void init(){
		demoFileDao = AppUtil.getBean(DemoFileDao.class);
		demoFileQueryDao = AppUtil.getBean(DemoFileQueryDao.class);
		this.setDao(demoFileDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(demoFileQueryDao.get(getId())));
	}
	
}
