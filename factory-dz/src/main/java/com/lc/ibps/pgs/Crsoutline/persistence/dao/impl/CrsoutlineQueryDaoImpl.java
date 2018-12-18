
package com.lc.ibps.pgs.Crsoutline.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.Crsoutline.persistence.dao.CrsoutlineQueryDao;
import com.lc.ibps.pgs.Crsoutline.persistence.entity.CrsoutlinePo;

/**
 *t_t_crs_outline 查询Dao的实现类
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
public class CrsoutlineQueryDaoImpl extends MyBatisQueryDaoImpl<String, CrsoutlinePo> implements CrsoutlineQueryDao{

    @Override
    public String getNamespace() {
        return CrsoutlinePo.class.getName();
    }
}
