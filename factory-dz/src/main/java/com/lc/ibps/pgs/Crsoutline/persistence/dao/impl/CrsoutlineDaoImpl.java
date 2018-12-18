package com.lc.ibps.pgs.Crsoutline.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.Crsoutline.persistence.dao.CrsoutlineDao;
import com.lc.ibps.pgs.Crsoutline.persistence.entity.CrsoutlinePo;

/**
 * t_t_crs_outline Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-17 16:56:32
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class CrsoutlineDaoImpl extends MyBatisDaoImpl<String, CrsoutlinePo> implements CrsoutlineDao{

    @Override
    public String getNamespace() {
        return CrsoutlinePo.class.getName();
    }
}
