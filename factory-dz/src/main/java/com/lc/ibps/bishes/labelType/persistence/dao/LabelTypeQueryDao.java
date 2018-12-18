package com.lc.ibps.bishes.labelType.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;

/**
 * t_label_type 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 16:57:08
 *</pre>
 */
public interface LabelTypeQueryDao extends IQueryDao<String, LabelTypePo> {
	
	List<LabelTypePo> findBySql(String whereSql);
	
}
