package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.EvaluateDao;
import com.lc.ibps.pgs.PGData.persistence.entity.EvaluatePo;

/**
 * t_p_khhlxpj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-21 16:01:36
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class EvaluateDaoImpl extends MyBatisDaoImpl<String, EvaluatePo> implements EvaluateDao{

    @Override
    public String getNamespace() {
        return EvaluatePo.class.getName();
    }
}
