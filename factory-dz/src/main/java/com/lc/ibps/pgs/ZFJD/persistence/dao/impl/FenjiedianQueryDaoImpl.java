
package com.lc.ibps.pgs.ZFJD.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.ZFJD.persistence.dao.FenjiedianQueryDao;
import com.lc.ibps.pgs.ZFJD.persistence.entity.FenjiedianPo;

/**
 *t_fenjiedian 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 17:03:02
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class FenjiedianQueryDaoImpl extends MyBatisQueryDaoImpl<String, FenjiedianPo> implements FenjiedianQueryDao{

    @Override
    public String getNamespace() {
        return FenjiedianPo.class.getName();
    }
}
