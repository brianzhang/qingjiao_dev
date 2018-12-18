package com.lc.ibps.loans.baoZhengRen.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.baoZhengRen.domain.BZRXXB;
import com.lc.ibps.loans.baoZhengRen.persistence.entity.BZRXXBPo;

/**
 * t_bzrxxb 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:18
 *</pre>
 */
public interface BZRXXBRepository extends IRepository<String, BZRXXBPo,BZRXXB>{

	BZRXXBPo getByJdidAndZjhm(String jdid, String zjhm);

}
