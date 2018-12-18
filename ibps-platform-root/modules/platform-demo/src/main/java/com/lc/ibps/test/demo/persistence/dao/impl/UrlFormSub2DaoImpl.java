package com.lc.ibps.test.demo.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.test.demo.persistence.dao.UrlFormSub2Dao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;

/**
 * 子表例子 Dao接口的实现类
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
public class UrlFormSub2DaoImpl extends MyBatisDaoImpl<String, UrlFormSub2Po> implements UrlFormSub2Dao{

    @Override
    public String getNamespace() {
        return UrlFormSub2Po.class.getName();
    }
	public void deleteByMainId(String mainId) {
		deleteByKey("deleteByMainId", b().a("mainId", mainId).p());		
	}
}
