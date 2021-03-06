
package com.lc.ibps.loans.mulu.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.mulu.persistence.dao.MuLuQueryDao;
import com.lc.ibps.loans.mulu.persistence.entity.MuLuPo;

/**
 *t_mlsl 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 02:36:41
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class MuLuQueryDaoImpl extends MyBatisQueryDaoImpl<String, MuLuPo> implements MuLuQueryDao{

    @Override
    public String getNamespace() {
        return MuLuPo.class.getName();
    }
}
