package com.lc.ibps.bishes.group.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;

/**
 * t_grad_group 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
public interface GradGroupQueryDao extends IQueryDao<String, GradGroupPo> {
	List<GradGroupPo> getBySql(String whereSql);
}
