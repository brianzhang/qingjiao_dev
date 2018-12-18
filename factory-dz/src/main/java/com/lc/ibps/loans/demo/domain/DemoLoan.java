package com.lc.ibps.loans.demo.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.demo.persistence.dao.DemoLoanDao;
import com.lc.ibps.loans.demo.persistence.dao.DemoLoanQueryDao;
import com.lc.ibps.loans.demo.persistence.entity.DemoLoanPo;

/**
 * t_demo_loan_ 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:00:46
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class DemoLoan extends AbstractDomain<String, DemoLoanPo>{
	 
	private DemoLoanDao demoLoanDao = null;
	private DemoLoanQueryDao demoLoanQueryDao = null;


	protected void init(){
		demoLoanDao = AppUtil.getBean(DemoLoanDao.class);
		demoLoanQueryDao = AppUtil.getBean(DemoLoanQueryDao.class);
		this.setDao(demoLoanDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(demoLoanQueryDao.get(getId())));
	}
	
}
