package com.lc.ibps.loans.baoZhengRen.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.loans.baoZhengRen.persistence.entity.BZRXXBPo;

/**
 * t_bzrxxb 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 03:01:17
 *</pre>
 */
public interface BZRXXBQueryDao extends IQueryDao<String, BZRXXBPo> {


	List<BZRXXBPo> getByJdidAndZjhm(String jdid, String zjhm);


}
