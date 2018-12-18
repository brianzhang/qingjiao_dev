package com.lc.ibps.bishes.audit.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.audit.domain.TchLabel;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;

/**
 * 教师标签表 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:31
 *</pre>
 */
public interface TchLabelRepository extends IRepository<String, TchLabelPo,TchLabel>{
	void compoundLabel(String oldId, String newId, String orgId);
	List<TchLabelPo> getBySql(String whereSql);
	int getNumByLabel(String labelId);
}
