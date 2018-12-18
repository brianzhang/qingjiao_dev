package com.lc.ibps.demo.codegen.persistence.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

/**
 *采购需求表示：1，采购清单：2；1对多关系 查询Dao的实现类
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
public class Cgqd1QueryDaoImpl extends MyBatisQueryDaoImpl<String, Cgqd1Po> implements Cgqd1QueryDao{

    @Override
    public String getNamespace() {
        return Cgqd1Po.class.getName();
    }
	public List<Cgqd1Po> findByMainId(String mainId) {
		return findByKey("findByMainId", b().a("mainId", mainId).p());
	}
}