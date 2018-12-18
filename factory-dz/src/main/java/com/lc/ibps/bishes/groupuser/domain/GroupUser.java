package com.lc.ibps.bishes.groupuser.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.bishes.groupuser.persistence.dao.GroupUserDao;
import com.lc.ibps.bishes.groupuser.persistence.dao.GroupUserQueryDao;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;


/**
 * t_group_user 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:42
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class GroupUser extends AbstractDomain<String, GroupUserPo>{
	 
	private GroupUserDao groupUserDao = null;
	private GroupUserQueryDao groupUserQueryDao = null;

	

	protected void init(){
		groupUserDao = AppUtil.getBean(GroupUserDao.class);
		groupUserQueryDao = AppUtil.getBean(GroupUserQueryDao.class);
		this.setDao(groupUserDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(groupUserQueryDao.get(getId())));
	}
	
	
}
