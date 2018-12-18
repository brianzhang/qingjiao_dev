package com.lc.ibps.repair.repair.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.repair.repair.persistence.entity.BxdPo;

/**
 * t_bxd 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:04
 *</pre>
 */
public interface BxdQueryDao extends IQueryDao<String, BxdPo> {
	
	List<BxdPo> getByGdzt(String gdzt);
	
	List<BxdPo> getBySubBxdIdAndGdlx(String subid,String gdlx);
}
