package com.lc.ibps.bishes.audit.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.audit.domain.LabelDef;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;

/**
 * t_label_def 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
public interface LabelDefRepository extends IRepository<String, LabelDefPo,LabelDef>{
	List<LabelDefPo> getBySql(String whereSql);
}
