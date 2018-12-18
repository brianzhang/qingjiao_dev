package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.DcwjxjDao;
import com.lc.ibps.pgs.PGData.persistence.entity.DcwjxjPo;

/**
 * t_dcwjxj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-05-04 17:37:35
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class DcwjxjDaoImpl extends MyBatisDaoImpl<String, DcwjxjPo> implements DcwjxjDao{

    @Override
    public String getNamespace() {
        return DcwjxjPo.class.getName();
    }
}
