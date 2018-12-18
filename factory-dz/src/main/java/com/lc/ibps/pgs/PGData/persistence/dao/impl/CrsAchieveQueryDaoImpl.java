
package com.lc.ibps.pgs.PGData.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.CrsAchieveQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.CrsAchievePo;

/**
 *t_p_kcdcdhlxpj 查询Dao的实现类
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
public class CrsAchieveQueryDaoImpl extends MyBatisQueryDaoImpl<String, CrsAchievePo> implements CrsAchieveQueryDao{

    @Override
    public String getNamespace() {
        return CrsAchievePo.class.getName();
    }
}
