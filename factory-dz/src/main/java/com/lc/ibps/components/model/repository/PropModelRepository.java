package com.lc.ibps.components.model.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.components.model.domain.PropModel;
import com.lc.ibps.components.model.persistence.entity.PropModelPo;

/**
 * 属性模板 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-13 13:54:37
 *</pre>
 */
public interface PropModelRepository extends IRepository<String, PropModelPo,PropModel>{
	Map<String, String> getPropModelByName(String propModelName);
	PropModelPo getByCols(Map arg, String mode);
	List<PropModelPo> findByCols(Map arg, String mode);
}
