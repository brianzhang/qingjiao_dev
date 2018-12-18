package com.lc.ibps.bishes.groupuser.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.bishes.groupuser.persistence.dao.GroupUserDao;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;

/**
 * t_group_user Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-20 13:27:41
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class GroupUserDaoImpl extends MyBatisDaoImpl<String, GroupUserPo> implements GroupUserDao{

    @Override
    public String getNamespace() {
        return GroupUserPo.class.getName();
    }
}
