package com.lc.ibps.loans.dyrInfo.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;

/**
 * t_dyr 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 00:16:31
 *</pre>
 */
public interface DyrQueryDao extends IQueryDao<String, DyrPo> {


	List<DyrPo> getByJdId(String jdid);

	List<DyrPo> getByJdIdAndshengfenId(String jdid, String zjhm);
}
