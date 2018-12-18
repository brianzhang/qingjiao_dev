
package com.lc.ibps.pgs.Pymb.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.Pymb.persistence.dao.PymbQueryDao;
import com.lc.ibps.pgs.Pymb.persistence.entity.PymbPo;

/**
 *t_pymb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-01-18 15:10:24
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class PymbQueryDaoImpl extends MyBatisQueryDaoImpl<String, PymbPo> implements PymbQueryDao{

    @Override
    public String getNamespace() {
        return PymbPo.class.getName();
    }
}
