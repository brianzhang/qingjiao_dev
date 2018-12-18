package com.lc.ibps.loans.demo.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.demo.domain.DemoLoan;
import com.lc.ibps.loans.demo.persistence.entity.DemoLoanPo;

/**
 * t_demo_loan_ 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:00:46
 *</pre>
 */
public interface DemoLoanRepository extends IRepository<String, DemoLoanPo,DemoLoan>{

	void updateByParam(String modelId, String id);

}
