
package com.lc.ibps.test.demo.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSubQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSubPo;

/**
 *子表例子 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class UrlFormSubQueryDaoImpl extends MyBatisQueryDaoImpl<String, UrlFormSubPo> implements UrlFormSubQueryDao{

    @Override
    public String getNamespace() {
        return UrlFormSubPo.class.getName();
    }
}
