
package com.lc.ibps.lyzygls.JingYQ.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.lyzygls.JingYQ.persistence.dao.JingYQQueryDao;
import com.lc.ibps.lyzygls.JingYQ.persistence.entity.JingYQPo;

/**
 *t_jyq 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:16:30
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class JingYQQueryDaoImpl extends MyBatisQueryDaoImpl<String, JingYQPo> implements JingYQQueryDao{

    @Override
    public String getNamespace() {
        return JingYQPo.class.getName();
    }
}
