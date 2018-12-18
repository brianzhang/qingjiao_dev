package com.lc.ibps.patrols.data.repository;

import java.util.List;
import java.util.Map;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;
import com.lc.ibps.patrols.data.domain.TeachInfo;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;


/**
 * 授课信息 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:55:50
 *</pre>
 */
public interface TeachInfoRepository extends IRepository<String, TeachInfoPo,TeachInfo>{
	TeachInfoPo exGetBy(List exFileds , List exTableList , Map whereMap , Map orderBy);
	List<TeachInfoPo> exFindBy(List exFileds , List exTableList , Map whereMap , Map orderBy);
	Map makeParam(List exFileds , List exTableList , Map whereMap , Map orderBy);
	String getTchByDetail(String gradeAndclass, String dayAndSection);
}
