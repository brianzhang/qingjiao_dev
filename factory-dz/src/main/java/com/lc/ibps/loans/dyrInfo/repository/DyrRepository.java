package com.lc.ibps.loans.dyrInfo.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.dyrInfo.domain.Dyr;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;

/**
 * t_dyr 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 00:16:31
 *</pre>
 */
public interface DyrRepository extends IRepository<String, DyrPo,Dyr>{


	DyrPo getByJdId(String jdid);

	DyrPo getByJdIdAndshengfenId(String jdid, String zjhm);

}
