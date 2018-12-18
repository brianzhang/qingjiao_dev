package com.lc.ibps.loans.demo.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.demo.domain.DemoFile;
import com.lc.ibps.loans.demo.persistence.entity.DemoFilePo;

/**
 * t_demo_file_ 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:05:10
 *</pre>
 */
public interface DemoFileRepository extends IRepository<String, DemoFilePo,DemoFile>{

}
