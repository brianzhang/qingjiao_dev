package com.lc.ibps.pgs.Report.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.Report.persistence.dao.FlactionDao;
import com.lc.ibps.pgs.Report.persistence.entity.FlactionPo;

/**
 * t_p_ysqk Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 13:55:55
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class FlactionDaoImpl extends MyBatisDaoImpl<String, FlactionPo> implements FlactionDao{

    @Override
    public String getNamespace() {
        return FlactionPo.class.getName();
    }
}
