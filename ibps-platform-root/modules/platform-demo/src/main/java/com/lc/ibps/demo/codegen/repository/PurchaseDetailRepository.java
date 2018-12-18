
package com.lc.ibps.demo.codegen.repository;

import java.util.List;
import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.demo.codegen.domain.PurchaseDetail;
import com.lc.ibps.demo.codegen.persistence.entity.PurchaseDetailPo;

/**
 * t_purchasedetaillist 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-07 10:46:49
 *</pre>
 */
public interface PurchaseDetailRepository extends IRepository<String, PurchaseDetailPo,PurchaseDetail>{
	 /**
	 * 根据主表ID查询 t_purchasedetaillist 列表
	 * @param mainId
	 * @return 
	 * List<PurchaseDetailPo>
	 */
	public List<PurchaseDetailPo> findByMainId(String mainId);

}
