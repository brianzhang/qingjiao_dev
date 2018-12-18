package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsAchieveDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsAchievePo;

/**
 * t_p_kcdcdhlxpj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 10:09:43
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class CrsAchieveDaoImpl extends MyBatisDaoImpl<String, CrsAchievePo> implements CrsAchieveDao{

    @Override
    public String getNamespace() {
        return CrsAchievePo.class.getName();
    }
}
