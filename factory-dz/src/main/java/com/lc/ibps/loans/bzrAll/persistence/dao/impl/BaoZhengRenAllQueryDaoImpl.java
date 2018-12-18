
package com.lc.ibps.loans.bzrAll.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.bzrAll.persistence.dao.BaoZhengRenAllQueryDao;
import com.lc.ibps.loans.bzrAll.persistence.entity.BaoZhengRenAllPo;

/**
 *t_bzr_all 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 18:49:52
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class BaoZhengRenAllQueryDaoImpl extends MyBatisQueryDaoImpl<String, BaoZhengRenAllPo> implements BaoZhengRenAllQueryDao{

    @Override
    public String getNamespace() {
        return BaoZhengRenAllPo.class.getName();
    }
}
