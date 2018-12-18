package com.lc.ibps.grads.paper.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.grads.paper.persistence.dao.MyPaperDao;
import com.lc.ibps.grads.paper.persistence.entity.MyPaperPo;

/**
 * 我的论文表单 Dao接口的实现类
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
public class MyPaperDaoImpl extends MyBatisDaoImpl<String, MyPaperPo> implements MyPaperDao{

    @Override
    public String getNamespace() {
        return MyPaperPo.class.getName();
    }
}
