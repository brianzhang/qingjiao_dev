
package com.lc.ibps.bishes.groupuser.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.bishes.groupuser.persistence.dao.GroupUserQueryDao;
import com.lc.ibps.bishes.groupuser.persistence.entity.GroupUserPo;

/**
 *t_group_user 查询Dao的实现类
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
public class GroupUserQueryDaoImpl extends MyBatisQueryDaoImpl<String, GroupUserPo> implements GroupUserQueryDao{

    @Override
    public String getNamespace() {
        return GroupUserPo.class.getName();
    }

	@Override
	public List<GroupUserPo> getBySql(String whereSql) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("whereSql", whereSql);
		return this.findByKey("getBySql", params);
	}
}
