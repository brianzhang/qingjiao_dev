package com.lc.ibps.loans.zhiyaRInfo.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;

/**
 * t_zyr 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-24 03:02:25
 *</pre>
 */
public interface ZhiYaPersonQueryDao extends IQueryDao<String, ZhiYaPersonPo> {


	List<ZhiYaPersonPo> getByJdId(String jdxxID);

	List<ZhiYaPersonPo> getByJdIdAndshengfenId(String jdxxID, String zjhm);

}
