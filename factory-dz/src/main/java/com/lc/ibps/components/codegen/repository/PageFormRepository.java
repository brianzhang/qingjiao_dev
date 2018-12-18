package com.lc.ibps.components.codegen.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.components.codegen.domain.PageForm;
import com.lc.ibps.components.codegen.persistence.entity.PageFormPo;

/**
 * 页面表单管理 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：gxy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-13 15:30:38
 *</pre>
 */
public interface PageFormRepository extends IRepository<String, PageFormPo,PageForm>{
	PageFormPo getByPageKey( String key );
}
