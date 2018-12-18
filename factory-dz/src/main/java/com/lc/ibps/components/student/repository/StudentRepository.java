package com.lc.ibps.components.student.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.components.student.domain.Student;
import com.lc.ibps.components.student.persistence.entity.StudentPo;

/**
 * t_student 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-02-01 10:48:34
 *</pre>
 */
public interface StudentRepository extends IRepository<String, StudentPo,Student>{

}
