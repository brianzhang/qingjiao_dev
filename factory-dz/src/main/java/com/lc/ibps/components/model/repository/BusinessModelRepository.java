package com.lc.ibps.components.model.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.components.model.domain.BusinessModel;
import com.lc.ibps.components.model.persistence.entity.BusinessModelPo;
import com.lc.ibps.components.model.persistence.entity.PropModelParam;

/**
 * 业务模板 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-09-13 13:54:21
 *</pre>
 */
public interface BusinessModelRepository extends IRepository<String, BusinessModelPo,BusinessModel>{
	public List<PropModelParam> parsePropModelId(String propModelId);
}
