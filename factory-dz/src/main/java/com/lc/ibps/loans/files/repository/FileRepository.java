package com.lc.ibps.loans.files.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.files.domain.File;
import com.lc.ibps.loans.files.persistence.entity.FilePo;

/**
 * t_file 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 *</pre>
 */
public interface FileRepository extends IRepository<String, FilePo,File>{

	FilePo getByJdid(String jdid);

}
