package com.lc.ibps.repair.repair.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.repair.repair.domain.Bxd;
import com.lc.ibps.repair.repair.persistence.entity.BxdPo;

/**
 * t_bxd 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:05
 *</pre>
 */
public interface BxdRepository extends IRepository<String, BxdPo,Bxd>{
	List<BxdPo> getByGdzt(String gdzt);
	
	String getItemValue(String item);
	
	List<BxdPo> getBySubBxdIdAndGdlx(String subid, String gdlx);

}
