
package com.lc.ibps.pgs.PGData.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.TeachingfeedbackQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TeachingfeedbackPo;

/**
 *t_p_xxaqzyktjxfkb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 18:47:02
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class TeachingfeedbackQueryDaoImpl extends MyBatisQueryDaoImpl<String, TeachingfeedbackPo> implements TeachingfeedbackQueryDao{

    @Override
    public String getNamespace() {
        return TeachingfeedbackPo.class.getName();
    }
}
