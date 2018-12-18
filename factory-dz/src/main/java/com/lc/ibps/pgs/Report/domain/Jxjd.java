package com.lc.ibps.pgs.Report.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.Report.persistence.dao.JxjdDao;
import com.lc.ibps.pgs.Report.persistence.dao.JxjdQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.JxjdPo;


/**
 * t_bkkcjxjdb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-26 17:43:14
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Jxjd extends AbstractDomain<String, JxjdPo>{
	 
	private JxjdDao jxjdDao = null;
	private JxjdQueryDao jxjdQueryDao = null;

	

	protected void init(){
		jxjdDao = AppUtil.getBean(JxjdDao.class);
		jxjdQueryDao = AppUtil.getBean(JxjdQueryDao.class);
		this.setDao(jxjdDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(jxjdQueryDao.get(getId())));
	}
	
	
}
