package com.lc.ibps.demo.codegen.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1Dao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class Cgqd1DaoImpl extends MyBatisDaoImpl<String, Cgqd1Po> implements Cgqd1Dao{

    @Override
    public String getNamespace() {
        return Cgqd1Po.class.getName();
    }
	public void deleteByMainId(String mainId) {
		deleteByKey("deleteByMainId", b().a("mainId", mainId).p());		
	}
}