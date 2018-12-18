
package com.lc.ibps.patrols.tpt.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.patrols.tpt.persistence.dao.TptQueryDao;
import com.lc.ibps.patrols.tpt.persistence.entity.TptPo;

/**
 *t_tpt 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 11:39:03
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class TptQueryDaoImpl extends MyBatisQueryDaoImpl<String, TptPo> implements TptQueryDao{

    @Override
    public String getNamespace() {
        return TptPo.class.getName();
    }
}
