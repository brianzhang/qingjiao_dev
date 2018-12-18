package com.lc.ibps.loans.danBaoCompany.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.danBaoCompany.persistence.dao.DanBaoCompanyInfoDao;
import com.lc.ibps.loans.danBaoCompany.persistence.entity.DanBaoCompanyInfoPo;

/**
 * t_dbgs Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 18:38:26
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class DanBaoCompanyInfoDaoImpl extends MyBatisDaoImpl<String, DanBaoCompanyInfoPo> implements DanBaoCompanyInfoDao{

    @Override
    public String getNamespace() {
        return DanBaoCompanyInfoPo.class.getName();
    }
}
