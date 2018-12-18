
package com.lc.ibps.loans.daikuanInfo.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.daikuanInfo.persistence.dao.DaiKuanShenQingInfoQueryDao;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;

/**
 *t_sxsq 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:06
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DaiKuanShenQingInfoQueryDaoImpl extends MyBatisQueryDaoImpl<String, DaiKuanShenQingInfoPo> implements DaiKuanShenQingInfoQueryDao{

    @Override
    public String getNamespace() {
        return DaiKuanShenQingInfoPo.class.getName();
    }
    
    @Override
	public List<DaiKuanShenQingInfoPo> getByJdId(String jdid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		return this.findByKey("getByJdId", params);
	}


}
