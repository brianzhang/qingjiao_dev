

package com.lc.ibps.test.demo.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.test.demo.persistence.dao.DsTestQueryDao;
import com.lc.ibps.test.demo.persistence.entity.DsTestPo;

/**
 *TEST 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-07-03 15:14:34
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DsTestQueryDaoImpl extends MyBatisQueryDaoImpl<String, DsTestPo> implements DsTestQueryDao{

    @Override
    public String getNamespace() {
        return DsTestPo.class.getName();
    }
}
