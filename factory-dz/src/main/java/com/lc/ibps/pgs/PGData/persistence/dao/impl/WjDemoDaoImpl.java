package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.WjDemoDao;
import com.lc.ibps.pgs.PGData.persistence.entity.WjDemoPo;

/**
 * t_p_wjdc_test Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2018-04-18 17:28:15
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class WjDemoDaoImpl extends MyBatisDaoImpl<String, WjDemoPo> implements WjDemoDao{

    @Override
    public String getNamespace() {
        return WjDemoPo.class.getName();
    }
}
