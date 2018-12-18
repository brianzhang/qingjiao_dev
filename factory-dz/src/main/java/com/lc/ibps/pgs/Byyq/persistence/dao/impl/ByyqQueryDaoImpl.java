
package com.lc.ibps.pgs.Byyq.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.Byyq.persistence.dao.ByyqQueryDao;
import com.lc.ibps.pgs.Byyq.persistence.entity.ByyqPo;

/**
 *t_byyq 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 14:51:46
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class ByyqQueryDaoImpl extends MyBatisQueryDaoImpl<String, ByyqPo> implements ByyqQueryDao{

    @Override
    public String getNamespace() {
        return ByyqPo.class.getName();
    }
}
