package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.PJObjectDao;
import com.lc.ibps.pgs.PGData.persistence.entity.PJObjectPo;

/**
 * t_p_pjdx Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:55:18
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PJObjectDaoImpl extends MyBatisDaoImpl<String, PJObjectPo> implements PJObjectDao{

    @Override
    public String getNamespace() {
        return PJObjectPo.class.getName();
    }
}
