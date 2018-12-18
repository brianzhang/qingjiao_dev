package com.lc.ibps.loans.zhiyarenAll.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;

/**
 * t_zyr_all 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:17:35
 *</pre>
 */
public interface ZhiYaRenAllQueryDao extends IQueryDao<String, ZhiYaRenAllPo> {


	List<ZhiYaRenAllPo> getByJdId(String jdid);
}
