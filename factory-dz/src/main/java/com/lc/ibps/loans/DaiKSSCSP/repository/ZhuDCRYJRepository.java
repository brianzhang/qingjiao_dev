package com.lc.ibps.loans.DaiKSSCSP.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.DaiKSSCSP.domain.ZhuDCRYJ;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ZhuDCRYJPo;

/**
 * t_zdcryj 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:46
 *</pre>
 */
public interface ZhuDCRYJRepository extends IRepository<String, ZhuDCRYJPo,ZhuDCRYJ>{

	ZhuDCRYJPo getByJdid(String jdid);

}
