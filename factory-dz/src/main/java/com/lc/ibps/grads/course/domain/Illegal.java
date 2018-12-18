package com.lc.ibps.grads.course.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.course.persistence.dao.IllegalDao;
import com.lc.ibps.grads.course.persistence.dao.IllegalQueryDao;
import com.lc.ibps.grads.course.persistence.entity.IllegalPo;

/**
 * 违规操作表 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：guanxinyu1997@outlook.com
 * 创建时间：2017-07-29 21:42:15
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Illegal extends AbstractDomain<String, IllegalPo>{
	 
	private IllegalDao illegalDao = null;
	private IllegalQueryDao illegalQueryDao = null;


	@Override
	protected void init(){
		illegalDao = AppUtil.getBean(IllegalDao.class);
		illegalQueryDao = AppUtil.getBean(IllegalQueryDao.class);
		this.setDao(illegalDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(illegalQueryDao.get(getId())));
	}
	
}
