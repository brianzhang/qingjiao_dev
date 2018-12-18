
package com.lc.ibps.loans.baoZhengRen.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.baoZhengRen.persistence.dao.BZRXXBQueryDao;
import com.lc.ibps.loans.baoZhengRen.persistence.entity.BZRXXBPo;

/**
 *t_bzrxxb 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:17
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class BZRXXBQueryDaoImpl extends MyBatisQueryDaoImpl<String, BZRXXBPo> implements BZRXXBQueryDao{

    @Override
    public String getNamespace() {
        return BZRXXBPo.class.getName();
    }

    @Override
	public List<BZRXXBPo> getByJdidAndZjhm(String jdid, String zjhm) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		params.put("zjhm", zjhm);
		return this.findByKey("getByJdidAndZjhm", params);
	}



}
