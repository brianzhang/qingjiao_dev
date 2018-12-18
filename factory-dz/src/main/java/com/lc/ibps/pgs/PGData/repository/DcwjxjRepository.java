package com.lc.ibps.pgs.PGData.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.pgs.PGData.domain.Dcwjxj;
import com.lc.ibps.pgs.PGData.persistence.entity.DcwjxjPo;

/**
 * t_dcwjxj 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
public interface DcwjxjRepository extends IRepository<String, DcwjxjPo,Dcwjxj>{
	public List<DcwjxjPo> queryByType(@Param("wjName") String wjName);
}
