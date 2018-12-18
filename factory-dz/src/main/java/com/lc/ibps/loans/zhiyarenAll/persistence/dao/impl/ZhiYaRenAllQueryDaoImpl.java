
package com.lc.ibps.loans.zhiyarenAll.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;
import com.lc.ibps.loans.zhiyarenAll.persistence.dao.ZhiYaRenAllQueryDao;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;

/**
 *t_zyr_all 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:17:35
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class ZhiYaRenAllQueryDaoImpl extends MyBatisQueryDaoImpl<String, ZhiYaRenAllPo> implements ZhiYaRenAllQueryDao{

    @Override
    public String getNamespace() {
        return ZhiYaRenAllPo.class.getName();
    }
    @Override
	public List<ZhiYaRenAllPo> getByJdId(String jdid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		return this.findByKey("getByJdId", params);
	}
}
