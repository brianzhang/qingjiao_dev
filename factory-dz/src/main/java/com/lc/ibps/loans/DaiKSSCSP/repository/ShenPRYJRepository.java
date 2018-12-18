package com.lc.ibps.loans.DaiKSSCSP.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.DaiKSSCSP.domain.ShenPRYJ;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenPRYJPo;

/**
 * t_spryj 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
public interface ShenPRYJRepository extends IRepository<String, ShenPRYJPo,ShenPRYJ>{

	ShenPRYJPo getByJdid(String jdid);

}
