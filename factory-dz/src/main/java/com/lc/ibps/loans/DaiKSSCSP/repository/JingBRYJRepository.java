package com.lc.ibps.loans.DaiKSSCSP.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.DaiKSSCSP.domain.JingBRYJ;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.JingBRYJPo;

/**
 * t_jbdcryj 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin1996@163.com
 * 创建时间：2017-07-31 22:34:51
 *</pre>
 */
public interface JingBRYJRepository extends IRepository<String, JingBRYJPo,JingBRYJ>{

	JingBRYJPo getByJdid(String jdid);

}
