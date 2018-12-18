package com.lc.ibps.pgs.Pymb.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.Pymb.persistence.dao.PymbDao;
import com.lc.ibps.pgs.Pymb.persistence.entity.PymbPo;

/**
 * t_pymb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 15:10:25
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PymbDaoImpl extends MyBatisDaoImpl<String, PymbPo> implements PymbDao{

    @Override
    public String getNamespace() {
        return PymbPo.class.getName();
    }
}
