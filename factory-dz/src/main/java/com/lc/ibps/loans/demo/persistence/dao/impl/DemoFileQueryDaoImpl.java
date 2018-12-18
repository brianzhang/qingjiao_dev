
package com.lc.ibps.loans.demo.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.demo.persistence.dao.DemoFileQueryDao;
import com.lc.ibps.loans.demo.persistence.entity.DemoFilePo;

/**
 *t_demo_file_ 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:05:10
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DemoFileQueryDaoImpl extends MyBatisQueryDaoImpl<String, DemoFilePo> implements DemoFileQueryDao{

    @Override
    public String getNamespace() {
        return DemoFilePo.class.getName();
    }
}
