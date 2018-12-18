package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsDegreeDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsDegreePo;

/**
 * t_p_zykcdcdhlxpj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:20:41
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class CrsDegreeDaoImpl extends MyBatisDaoImpl<String, CrsDegreePo> implements CrsDegreeDao{

    @Override
    public String getNamespace() {
        return CrsDegreePo.class.getName();
    }
}
