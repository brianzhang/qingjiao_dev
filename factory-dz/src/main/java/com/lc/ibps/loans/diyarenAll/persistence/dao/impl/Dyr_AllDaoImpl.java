package com.lc.ibps.loans.diyarenAll.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.diyarenAll.persistence.dao.Dyr_AllDao;
import com.lc.ibps.loans.diyarenAll.persistence.entity.Dyr_AllPo;

/**
 * t_dyr_all Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 07:50:38
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class Dyr_AllDaoImpl extends MyBatisDaoImpl<String, Dyr_AllPo> implements Dyr_AllDao{

    @Override
    public String getNamespace() {
        return Dyr_AllPo.class.getName();
    }
}
