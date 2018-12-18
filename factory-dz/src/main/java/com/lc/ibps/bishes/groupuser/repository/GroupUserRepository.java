package com.lc.ibps.bishes.groupuser.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.groupuser.domain.GroupUser;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;

/**
 * t_group_user 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:42
 *</pre>
 */
public interface GroupUserRepository extends IRepository<String, GroupUserPo,GroupUser>{
	List<GroupUserPo> getBySql(String whereSql);
}
