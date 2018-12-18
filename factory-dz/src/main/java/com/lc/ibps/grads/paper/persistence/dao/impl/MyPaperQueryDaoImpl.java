
package com.lc.ibps.grads.paper.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.grads.paper.persistence.dao.MyPaperQueryDao;
import com.lc.ibps.grads.paper.persistence.entity.MyPaperPo;

/**
 *我的论文表单 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：xubaocheng
 * 邮箱地址：100000000000@qq.com
 * 创建时间：2017-05-19 12:27:00
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class MyPaperQueryDaoImpl extends MyBatisQueryDaoImpl<String, MyPaperPo> implements MyPaperQueryDao{

    @Override
    public String getNamespace() {
        return MyPaperPo.class.getName();
    }
}
