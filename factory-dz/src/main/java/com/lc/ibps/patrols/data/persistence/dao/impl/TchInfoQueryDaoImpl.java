
package com.lc.ibps.patrols.data.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.patrols.data.persistence.dao.TchInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.TchInfoPo;

/**
 *t_tch_inf 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:49:19
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class TchInfoQueryDaoImpl extends MyBatisQueryDaoImpl<String, TchInfoPo> implements TchInfoQueryDao{

    @Override
    public String getNamespace() {
        return TchInfoPo.class.getName();
    }
}
