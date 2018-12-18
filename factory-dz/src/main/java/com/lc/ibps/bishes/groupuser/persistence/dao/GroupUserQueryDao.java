package com.lc.ibps.bishes.groupuser.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;

/**
 * t_group_user 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:41
 *</pre>
 */
public interface GroupUserQueryDao extends IQueryDao<String, GroupUserPo> {
	List<GroupUserPo> getBySql(String whereSql);
}
