package com.lc.ibps.repair.bxzt.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.repair.bxzt.domain.Bxzt;
import com.lc.ibps.repair.bxzt.persistence.entity.BxztPo;

/**
 * t_bxzt 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-04 16:08:49
 *</pre>
 */
public interface BxztRepository extends IRepository<String, BxztPo,Bxzt>{
	List<BxztPo> getByBxdId(String bxdId);
}
