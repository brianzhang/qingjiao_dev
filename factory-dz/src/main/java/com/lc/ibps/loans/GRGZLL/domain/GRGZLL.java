package com.lc.ibps.loans.GRGZLL.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.GRGZLL.persistence.dao.GRGZLLDao;
import com.lc.ibps.loans.GRGZLL.persistence.dao.GRGZLLQueryDao;
import com.lc.ibps.loans.GRGZLL.persistence.entity.GRGZLLPo;

/**
 * t_grll 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZEHNGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:54:01
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class GRGZLL extends AbstractDomain<String, GRGZLLPo>{
	 
	private GRGZLLDao gRGZLLDao = null;
	private GRGZLLQueryDao gRGZLLQueryDao = null;


	protected void init(){
		gRGZLLDao = AppUtil.getBean(GRGZLLDao.class);
		gRGZLLQueryDao = AppUtil.getBean(GRGZLLQueryDao.class);
		this.setDao(gRGZLLDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(gRGZLLQueryDao.get(getId())));
	}
	
}
