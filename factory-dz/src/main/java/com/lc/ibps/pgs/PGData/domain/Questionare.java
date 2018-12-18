package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.QuestionareDao;
import com.lc.ibps.pgs.PGData.persistence.dao.QuestionareQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.QuestionarePo;


/**
 * t_dcwj 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 10:38:45
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Questionare extends AbstractDomain<String, QuestionarePo>{
	 
	private QuestionareDao questionareDao = null;
	private QuestionareQueryDao questionareQueryDao = null;

	

	protected void init(){
		questionareDao = AppUtil.getBean(QuestionareDao.class);
		questionareQueryDao = AppUtil.getBean(QuestionareQueryDao.class);
		this.setDao(questionareDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(questionareQueryDao.get(getId())));
	}
	
	
}
