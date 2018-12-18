package com.lc.ibps.bishes.audit.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;

/**
 * 教师标签表 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:31
 *</pre>
 */
public interface TchLabelQueryDao extends IQueryDao<String, TchLabelPo> {
	
	List<TchLabelPo> getBySql(String whereSql);
	int getNumByLabel(String labelId);
}
