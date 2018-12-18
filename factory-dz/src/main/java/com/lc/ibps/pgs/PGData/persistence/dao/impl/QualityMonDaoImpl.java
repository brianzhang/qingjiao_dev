package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.QualityMonDao;
import com.lc.ibps.pgs.PGData.persistence.entity.QualityMonPo;

/**
 * t_p_mxdcddzljktx Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 14:08:24
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class QualityMonDaoImpl extends MyBatisDaoImpl<String, QualityMonPo> implements QualityMonDao{

    @Override
    public String getNamespace() {
        return QualityMonPo.class.getName();
    }
}
