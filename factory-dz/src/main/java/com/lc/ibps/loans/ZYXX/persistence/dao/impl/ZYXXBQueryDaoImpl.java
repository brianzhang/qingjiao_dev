
package com.lc.ibps.loans.ZYXX.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.ZYXX.persistence.dao.ZYXXBQueryDao;
import com.lc.ibps.loans.ZYXX.persistence.entity.ZYXXBPo;

/**
 *t_zyxxb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：ZHENGCHONGSHAN
 * 邮箱地址：1025875391@qq.com
 * 创建时间：2017-07-26 01:55:18
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class ZYXXBQueryDaoImpl extends MyBatisQueryDaoImpl<String, ZYXXBPo> implements ZYXXBQueryDao{

    @Override
    public String getNamespace() {
        return ZYXXBPo.class.getName();
    }
}
