package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.PJNRProcessDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJNRProcessPo;

/**
 * t_p_byyqpjnrygc Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 14:28:47
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PJNRProcessDaoImpl extends MyBatisDaoImpl<String, PJNRProcessPo> implements PJNRProcessDao{

    @Override
    public String getNamespace() {
        return PJNRProcessPo.class.getName();
    }
}
