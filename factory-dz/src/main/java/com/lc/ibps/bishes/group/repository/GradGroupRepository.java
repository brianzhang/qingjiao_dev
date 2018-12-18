package com.lc.ibps.bishes.group.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.group.domain.GradGroup;
import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;

/**
 * t_grad_group 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
public interface GradGroupRepository extends IRepository<String, GradGroupPo,GradGroup>{
	List<GradGroupPo> getBySql(String whereSql);
}
