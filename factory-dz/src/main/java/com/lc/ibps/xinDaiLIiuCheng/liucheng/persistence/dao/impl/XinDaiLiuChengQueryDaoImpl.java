
package com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao.XinDaiLiuChengQueryDao;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

/**
 *t_xdlc 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class XinDaiLiuChengQueryDaoImpl extends MyBatisQueryDaoImpl<String, XinDaiLiuChengPo> implements XinDaiLiuChengQueryDao{

    @Override
    public String getNamespace() {
        return XinDaiLiuChengPo.class.getName();
    }

	@Override
	public List<XinDaiLiuChengPo> getByJdId(String jdid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		return this.findByKey("getByJdId", params);
	}
}
