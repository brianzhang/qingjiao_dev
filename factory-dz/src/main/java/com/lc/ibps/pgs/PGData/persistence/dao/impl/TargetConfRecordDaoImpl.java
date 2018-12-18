package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetConfRecordDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetConfRecordPo;

/**
 * t_p_xyjxyzxwyhtlqkjl Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:10:51
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class TargetConfRecordDaoImpl extends MyBatisDaoImpl<String, TargetConfRecordPo> implements TargetConfRecordDao{

    @Override
    public String getNamespace() {
        return TargetConfRecordPo.class.getName();
    }
}
