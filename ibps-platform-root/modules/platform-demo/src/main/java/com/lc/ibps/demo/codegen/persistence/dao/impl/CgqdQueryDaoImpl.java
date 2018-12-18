package com.lc.ibps.demo.codegen.persistence.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.demo.codegen.persistence.dao.CgqdQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;

/**
 *t_purchasedetaillist 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:05
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class CgqdQueryDaoImpl extends MyBatisQueryDaoImpl<String, CgqdPo> implements CgqdQueryDao{

    @Override
    public String getNamespace() {
        return CgqdPo.class.getName();
    }
	public List<CgqdPo> findByMainId(String mainId) {
		return findByKey("findByMainId", b().a("mainId", mainId).p());
	}
}