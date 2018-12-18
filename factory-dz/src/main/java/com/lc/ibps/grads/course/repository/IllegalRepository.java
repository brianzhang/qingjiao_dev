package com.lc.ibps.grads.course.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.grads.course.domain.Illegal;
import com.lc.ibps.grads.course.persistence.entity.IllegalPo;

/**
 * 违规操作表 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：guanxinyu1997@outlook.com
 * 创建时间：2017-07-29 21:42:15
 *</pre>
 */
public interface IllegalRepository extends IRepository<String, IllegalPo,Illegal>{
	IllegalPo getByCols(Map arg, String mode);
	List<IllegalPo> findByCols(Map arg, String mode);
}
