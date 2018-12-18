package com.lc.ibps.patrols.control.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.patrols.control.domain.PatrolProgram;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;

/**
 * 巡课方案 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:20
 *</pre>
 */
public interface PatrolProgramRepository extends IRepository<String, PatrolProgramPo,PatrolProgram>{
	PatrolProgramPo exGetBy(List exFileds , List exTableList , Map whereMap , Map orderBy);
	List<PatrolProgramPo> exFindBy(List exFileds , List exTableList , Map whereMap , Map orderBy);
	Map makeParam(List exFileds , List exTableList , Map whereMap , Map orderBy);
}
