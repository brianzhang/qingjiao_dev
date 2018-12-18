package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.BasicRequirementsDao;
import com.lc.ibps.pgs.PGData.persistence.entity.BasicRequirementsPo;

/**
 * t_p_jbyqb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:18:42
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class BasicRequirementsDaoImpl extends MyBatisDaoImpl<String, BasicRequirementsPo> implements BasicRequirementsDao{

    @Override
    public String getNamespace() {
        return BasicRequirementsPo.class.getName();
    }
}
