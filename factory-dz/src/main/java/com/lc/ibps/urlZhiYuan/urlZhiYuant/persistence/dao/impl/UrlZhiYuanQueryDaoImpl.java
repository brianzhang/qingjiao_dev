
package com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.UrlZhiYuanQueryDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 *t_zyurl 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:06
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class UrlZhiYuanQueryDaoImpl extends MyBatisQueryDaoImpl<String, UrlZhiYuanPo> implements UrlZhiYuanQueryDao{

    @Override
    public String getNamespace() {
        return UrlZhiYuanPo.class.getName();
    }
    @Override
   	public List<UrlZhiYuanPo> getByBizKey(String bizkey) {
   		Map<String, Object> params = new HashMap<String, Object>();
   		params.put("bizkey", bizkey);
   		return this.findByKey("getByBizKey", params);
   	}
	@Override
	public List<UrlZhiYuanPo> getByFinaltdId(String tdid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("tdid", tdid);
		return this.findByKey("getByFinaltdId", params);
	}
	@Override
	public List<UrlZhiYuanPo> getByFinalTchId(String tchId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("tchId", tchId);
		return this.findByKey("getByFinalTchId", params);
	}
	@Override
	public List<UrlZhiYuanPo> getBySql(String whereSql) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("whereSql", whereSql);
		return this.findByKey("getBySql", params);
	}
	@Override
	public int getNumByLabel(String labelId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("labelId", labelId);
		return this.countByKey("getNumByLabel", params);
	}
	@Override
	public List<UrlZhiYuanPo> getByStuNum(String stunum) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("stunum", stunum);
		return this.findByKey("getByStuNum", params);
	}
	
	@Override
	public UrlZhiYuanPo getByxh(String xh) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("xh", xh);
		return this.getByKey("getByxh", xh);  //获取方法
	}
	@Override
	public List<String> getAllJudgeTchId(String orgId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("orgId", orgId);
		return (List<String>) this.findList("getAllJudgeTchId", params);
	}
	@Override
	public UrlZhiYuanPo getby_xh(String xh) {
		// TODO Auto-generated method stub
		return this.getByKey("getby_xh", xh);
	}
}
