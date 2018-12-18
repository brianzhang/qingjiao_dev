
package com.lc.ibps.loans.kehuInfo.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.kehuInfo.persistence.dao.Kefuinfo_AllQueryDao;
import com.lc.ibps.loans.kehuInfo.persistence.entity.Kefuinfo_AllPo;

/**
 *t_kefuinfo_all 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-27 19:57:06
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class Kefuinfo_AllQueryDaoImpl extends MyBatisQueryDaoImpl<String, Kefuinfo_AllPo> implements Kefuinfo_AllQueryDao{

    @Override
    public String getNamespace() {
        return Kefuinfo_AllPo.class.getName();
    }
}
