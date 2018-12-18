package com.lc.ibps.pgs.PGData.repository;

import java.util.ArrayList;
import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.pgs.PGData.domain.WjDemo;
import com.lc.ibps.pgs.PGData.persistence.entity.WjDemoPo;

/**
 * t_p_wjdc_test 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2018-04-18 17:28:15
 *</pre>
 */
public interface WjDemoRepository extends IRepository<String, WjDemoPo,WjDemo>{
	public List<WjDemoPo> getByWjtype(String type);
}
