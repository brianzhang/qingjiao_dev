package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.QuestionareDao;
import com.lc.ibps.pgs.PGData.persistence.entity.QuestionarePo;

/**
 * t_dcwj Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-03 10:38:45
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class QuestionareDaoImpl extends MyBatisDaoImpl<String, QuestionarePo> implements QuestionareDao{

    @Override
    public String getNamespace() {
        return QuestionarePo.class.getName();
    }
}
