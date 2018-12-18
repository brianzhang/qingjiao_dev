package com.lc.ibps.pgs.PGData.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DcwjxjPo;

/**
 * t_dcwjxj 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
public interface DcwjxjQueryDao extends IQueryDao<String, DcwjxjPo> {
	List<DcwjxjPo> queryByType(String type);
}
