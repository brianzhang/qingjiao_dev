package com.lc.ibps.bishes.groupuser.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.groupuser.domain.GroupUser;
import com.lc.ibps.bishes.groupuser.repository.GroupUserRepository;
import com.lc.ibps.bishes.groupuser.persistence.dao.GroupUserQueryDao;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;

/**
 * t_group_user 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:41
 *</pre>
 */
@Repository
public class GroupUserRepositoryImpl extends AbstractRepository<String, GroupUserPo,GroupUser> implements GroupUserRepository{
	  
	@Resource
	private  GroupUserQueryDao groupUserQueryDao;

	public GroupUser newInstance() {
		GroupUserPo po = new GroupUserPo();
		GroupUser groupUser = AppUtil.getBean(GroupUser.class);
		groupUser.setData(po);
		return groupUser;
	}

	public GroupUser newInstance(GroupUserPo po) {
		GroupUser groupUser = AppUtil.getBean(GroupUser.class);
		groupUser.setData(po);
		return groupUser;
	} 
	
	@Override
	protected IQueryDao<String, GroupUserPo> getQueryDao() {
		return groupUserQueryDao;
	}

	@Override
	public List<GroupUserPo> getBySql(String whereSql) {
		
		return groupUserQueryDao.getBySql(whereSql);
	}
	

	
}
