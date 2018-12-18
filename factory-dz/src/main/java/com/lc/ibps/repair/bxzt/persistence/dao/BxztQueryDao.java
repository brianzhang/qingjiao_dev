package com.lc.ibps.repair.bxzt.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.repair.bxzt.persistence.entity.BxztPo;

/**
 * t_bxzt 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-04 16:08:49
 *</pre>
 */
public interface BxztQueryDao extends IQueryDao<String, BxztPo> {
	List<BxztPo> getByBxdId(String bxdId);
	
	
}
