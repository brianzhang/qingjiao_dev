package com.lc.ibps.bishes.labelType.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.labelType.domain.LabelType;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;

/**
 * t_label_type 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 16:57:08
 *</pre>
 */
public interface LabelTypeRepository extends IRepository<String, LabelTypePo,LabelType>{
	List<LabelTypePo> findBySql(String whereSql);
}
