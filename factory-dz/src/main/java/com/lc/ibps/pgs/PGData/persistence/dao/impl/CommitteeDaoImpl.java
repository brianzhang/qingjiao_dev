package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.CommitteeDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CommitteePo;

/**
 * t_p_jxyzxwyhmd Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 15:53:30
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class CommitteeDaoImpl extends MyBatisDaoImpl<String, CommitteePo> implements CommitteeDao{

    @Override
    public String getNamespace() {
        return CommitteePo.class.getName();
    }
}
