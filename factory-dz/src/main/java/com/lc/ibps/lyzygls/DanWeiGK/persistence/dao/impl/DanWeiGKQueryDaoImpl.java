
package com.lc.ibps.lyzygls.DanWeiGK.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.lyzygls.DanWeiGK.persistence.dao.DanWeiGKQueryDao;
import com.lc.ibps.lyzygls.DanWeiGK.persistence.entity.DanWeiGKPo;

/**
 *t_dwgk 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 15:09:26
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DanWeiGKQueryDaoImpl extends MyBatisQueryDaoImpl<String, DanWeiGKPo> implements DanWeiGKQueryDao{

    @Override
    public String getNamespace() {
        return DanWeiGKPo.class.getName();
    }
}
