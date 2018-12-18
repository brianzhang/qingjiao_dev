package com.lc.ibps.loans.kehuInfo.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.kehuInfo.persistence.dao.Kefuinfo_AllDao;
import com.lc.ibps.loans.kehuInfo.persistence.entity.Kefuinfo_AllPo;

/**
 * t_kefuinfo_all Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-27 19:57:07
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class Kefuinfo_AllDaoImpl extends MyBatisDaoImpl<String, Kefuinfo_AllPo> implements Kefuinfo_AllDao{

    @Override
    public String getNamespace() {
        return Kefuinfo_AllPo.class.getName();
    }
}
