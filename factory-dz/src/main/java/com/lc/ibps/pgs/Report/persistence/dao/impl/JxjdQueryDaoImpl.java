
package com.lc.ibps.pgs.Report.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.Report.persistence.dao.JxjdQueryDao;
import com.lc.ibps.pgs.Report.persistence.entity.JxjdPo;

/**
 *t_bkkcjxjdb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-04-26 17:43:13
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class JxjdQueryDaoImpl extends MyBatisQueryDaoImpl<String, JxjdPo> implements JxjdQueryDao{

    @Override
    public String getNamespace() {
        return JxjdPo.class.getName();
    }
}
