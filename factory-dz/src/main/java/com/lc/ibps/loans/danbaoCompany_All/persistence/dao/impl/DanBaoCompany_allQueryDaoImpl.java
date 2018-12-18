
package com.lc.ibps.loans.danbaoCompany_All.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.danbaoCompany_All.persistence.dao.DanBaoCompany_allQueryDao;
import com.lc.ibps.loans.danbaoCompany_All.persistence.entity.DanBaoCompany_allPo;

/**
 *t_danbaocompany_all 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：liato
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 21:33:29
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DanBaoCompany_allQueryDaoImpl extends MyBatisQueryDaoImpl<String, DanBaoCompany_allPo> implements DanBaoCompany_allQueryDao{

    @Override
    public String getNamespace() {
        return DanBaoCompany_allPo.class.getName();
    }
}
