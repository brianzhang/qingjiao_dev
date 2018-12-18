package com.lc.ibps.bishes.audit.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;

/**
 * t_label_def 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
public interface LabelDefQueryDao extends IQueryDao<String, LabelDefPo> {
	
	List<LabelDefPo> getBySql(String whereSql);
	
}
