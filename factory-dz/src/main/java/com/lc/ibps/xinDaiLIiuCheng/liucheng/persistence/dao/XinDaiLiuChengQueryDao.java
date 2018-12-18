package com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

/**
 * t_xdlc 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 */
public interface XinDaiLiuChengQueryDao extends IQueryDao<String, XinDaiLiuChengPo> {

	List<XinDaiLiuChengPo> getByJdId(String jdid);

//	List<XinDaiLiuChengPo> getById(String id);
}
