package com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 * t_zyurl 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:06
 *</pre>
 */
public interface UrlZhiYuanQueryDao extends IQueryDao<String, UrlZhiYuanPo> {

	List<UrlZhiYuanPo> getByFinaltdId(String tdid);
	List<UrlZhiYuanPo> getByBizKey(String bizkey);
	List<UrlZhiYuanPo> getByFinalTchId(String tchId);
	List<UrlZhiYuanPo> getBySql(String whereSql);
	int getNumByLabel(String labelId);
	List<UrlZhiYuanPo> getByStuNum(String stunum);
	UrlZhiYuanPo getByxh(String xh);
	UrlZhiYuanPo getby_xh(String xh);
	List<String> getAllJudgeTchId(String orgId);
}
