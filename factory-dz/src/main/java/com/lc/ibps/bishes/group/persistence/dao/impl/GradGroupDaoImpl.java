package com.lc.ibps.bishes.group.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.bishes.group.persistence.dao.GradGroupDao;
import com.lc.ibps.bishes.group.persistence.entity.GradGroupPo;

/**
 * t_grad_group Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-19 18:29:35
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class GradGroupDaoImpl extends MyBatisDaoImpl<String, GradGroupPo> implements GradGroupDao{

    @Override
    public String getNamespace() {
        return GradGroupPo.class.getName();
    }
}
