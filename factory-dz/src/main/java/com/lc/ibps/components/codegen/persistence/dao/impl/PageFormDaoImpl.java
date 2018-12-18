package com.lc.ibps.components.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.components.codegen.persistence.dao.PageFormDao;
import com.lc.ibps.components.codegen.persistence.entity.PageFormPo;

/**
 * 页面表单管理 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-13 15:30:38
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PageFormDaoImpl extends MyBatisDaoImpl<String, PageFormPo> implements PageFormDao{

    @Override
    public String getNamespace() {
        return PageFormPo.class.getName();
    }
}
