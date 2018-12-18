package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetDataSourceDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetDataSourcePo;

/**
 * t_p_pymbhlxpjsjly Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 10:16:11
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class TargetDataSourceDaoImpl extends MyBatisDaoImpl<String, TargetDataSourcePo> implements TargetDataSourceDao{

    @Override
    public String getNamespace() {
        return TargetDataSourcePo.class.getName();
    }
}
