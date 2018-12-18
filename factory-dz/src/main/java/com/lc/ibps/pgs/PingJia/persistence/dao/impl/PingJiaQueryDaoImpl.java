
package com.lc.ibps.pgs.PingJia.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.PingJia.persistence.dao.PingJiaQueryDao;
import com.lc.ibps.pgs.PingJia.persistence.entity.PingJiaPo;

/**
 *t_pymbpj 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:18:49
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class PingJiaQueryDaoImpl extends MyBatisQueryDaoImpl<String, PingJiaPo> implements PingJiaQueryDao{

    @Override
    public String getNamespace() {
        return PingJiaPo.class.getName();
    }
}
