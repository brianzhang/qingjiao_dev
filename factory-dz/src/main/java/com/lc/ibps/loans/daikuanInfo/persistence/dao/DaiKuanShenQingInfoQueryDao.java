package com.lc.ibps.loans.daikuanInfo.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;

/**
 * t_sxsq 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:06
 *</pre>
 */
public interface DaiKuanShenQingInfoQueryDao extends IQueryDao<String, DaiKuanShenQingInfoPo> {


	List<DaiKuanShenQingInfoPo> getByJdId(String jdid);

}
