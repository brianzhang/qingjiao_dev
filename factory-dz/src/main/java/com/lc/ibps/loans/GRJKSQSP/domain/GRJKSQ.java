package com.lc.ibps.loans.GRJKSQSP.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.GRJKSQSP.persistence.dao.GRJKSQDao;
import com.lc.ibps.loans.GRJKSQSP.persistence.dao.GRJKSQQueryDao;
import com.lc.ibps.loans.GRJKSQSP.persistence.entity.GRJKSQPo;

/**
 * t_grjksqspb 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:47:43
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class GRJKSQ extends AbstractDomain<String, GRJKSQPo>{
	 
	private GRJKSQDao gRJKSQDao = null;
	private GRJKSQQueryDao gRJKSQQueryDao = null;


	protected void init(){
		gRJKSQDao = AppUtil.getBean(GRJKSQDao.class);
		gRJKSQQueryDao = AppUtil.getBean(GRJKSQQueryDao.class);
		this.setDao(gRJKSQDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(gRJKSQQueryDao.get(getId())));
	}
	
}
