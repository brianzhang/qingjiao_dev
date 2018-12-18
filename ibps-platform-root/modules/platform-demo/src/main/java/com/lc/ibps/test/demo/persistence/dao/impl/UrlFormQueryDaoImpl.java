
package com.lc.ibps.test.demo.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.test.demo.persistence.dao.UrlFormQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;

/**
 *url表单例子 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class UrlFormQueryDaoImpl extends MyBatisQueryDaoImpl<String, UrlFormPo> implements UrlFormQueryDao{

    @Override
    public String getNamespace() {
        return UrlFormPo.class.getName();
    }
}
