
package com.lc.ibps.repair.bxhcb.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.repair.bxhcb.persistence.dao.BxhcbQueryDao;
import com.lc.ibps.repair.bxhcb.persistence.entity.BxhcbPo;

/**
 *t_bxhcb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-10 11:33:45
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class BxhcbQueryDaoImpl extends MyBatisQueryDaoImpl<String, BxhcbPo> implements BxhcbQueryDao{

    @Override
    public String getNamespace() {
        return BxhcbPo.class.getName();
    }
}
