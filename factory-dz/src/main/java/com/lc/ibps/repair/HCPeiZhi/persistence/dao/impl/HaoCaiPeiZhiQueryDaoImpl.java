
package com.lc.ibps.repair.HCPeiZhi.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.repair.HCPeiZhi.persistence.dao.HaoCaiPeiZhiQueryDao;
import com.lc.ibps.repair.HCPeiZhi.persistence.entity.HaoCaiPeiZhiPo;

/**
 *t_hcpz 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:38:59
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class HaoCaiPeiZhiQueryDaoImpl extends MyBatisQueryDaoImpl<String, HaoCaiPeiZhiPo> implements HaoCaiPeiZhiQueryDao{

    @Override
    public String getNamespace() {
        return HaoCaiPeiZhiPo.class.getName();
    }
}
