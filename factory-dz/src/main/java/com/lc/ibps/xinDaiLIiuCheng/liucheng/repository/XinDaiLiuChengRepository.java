package com.lc.ibps.xinDaiLIiuCheng.liucheng.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.domain.XinDaiLiuCheng;
import com.lc.ibps.xinDaiLIiuCheng.liucheng.persistence.entity.XinDaiLiuChengPo;

/**
 * t_xdlc 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-15 03:01:36
 *</pre>
 */
public interface XinDaiLiuChengRepository extends IRepository<String, XinDaiLiuChengPo,XinDaiLiuCheng>{

	XinDaiLiuChengPo getByJdid(String jdid);

//	XinDaiLiuChengPo getById(String id);

}
