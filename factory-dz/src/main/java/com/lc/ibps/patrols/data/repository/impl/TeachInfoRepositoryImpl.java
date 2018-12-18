package com.lc.ibps.patrols.data.repository.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import ex.scala.utils4j.ExMap;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;
import com.lc.ibps.patrols.data.domain.TeachInfo;
import com.lc.ibps.patrols.data.repository.ClassxxInfoRepository;
import com.lc.ibps.patrols.data.repository.ScheduleInfoRepository;
import com.lc.ibps.patrols.data.repository.TchInfoRepository;
import com.lc.ibps.patrols.data.repository.TeachInfoRepository;
import com.lc.ibps.patrols.data.persistence.dao.TeachInfoQueryDao;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;

/**
 * 授课信息 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:55:50
 *</pre>
 */
@Repository
public class TeachInfoRepositoryImpl extends AbstractRepository<String, TeachInfoPo,TeachInfo> implements TeachInfoRepository{
	  
	@Resource
	private  TeachInfoQueryDao teachInfoQueryDao;
//	@Resource
//	private ScheduleInfoRepository scheduleInfoRepository;
//	@Resource
//	private TchInfoRepository tchInfoRepository;
//	@Resource
//	private ClassxxInfoRepository classxxInfoRepository;
//	@Resource
//	private TeachInfoRepository teachInfoRepository;

	public TeachInfo newInstance() {
		TeachInfoPo po = new TeachInfoPo();
		TeachInfo teachInfo = AppUtil.getBean(TeachInfo.class);
		teachInfo.setData(po);
		return teachInfo;
	}

	public TeachInfo newInstance(TeachInfoPo po) {
		TeachInfo teachInfo = AppUtil.getBean(TeachInfo.class);
		teachInfo.setData(po);
		return teachInfo;
	} 
	
	@Override
	protected IQueryDao<String, TeachInfoPo> getQueryDao() {
		return teachInfoQueryDao;
	}
	
	@Override
	public TeachInfoPo exGetBy(List exFileds , List exTableList , Map whereMap, Map orderBy) {
		return teachInfoQueryDao.getByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy) );
	}

	@Override
	public List<TeachInfoPo> exFindBy(List exFileds , List exTableList , Map whereMap , Map orderBy) {
		return teachInfoQueryDao.findByKey("exGetBy", makeParam(exFileds , exTableList , whereMap,orderBy));
	}

	@Override
	public Map makeParam(List exFileds , List exTableList , Map whereMap , Map orderBy) {
		if( whereMap == null || whereMap.isEmpty()  ) {
			throw new IllegalArgumentException("where 条件必须非空");
		}
		Map res = new HashMap<String,Object>();
		if( exFileds != null && !exFileds.isEmpty()){
			res.put("exFields", exFileds);
		}
		if( exTableList != null && !exTableList.isEmpty() ){
			res.put("exTableList", exTableList);
		}
		res.put("relationMap", whereMap);
		if (orderBy != null && !orderBy.isEmpty()) {
			res.put("orderByMap", orderBy);
		}
		return res;
	}
	
	@Override
	public String getTchByDetail(String gradeAndclass ,String dayAndSection){
		//解析参数  "七年级1班"  "星期五 第1节" ------> class_id_ 
		String classxx = gradeAndclass.split("级")[0] + gradeAndclass.split("级")[0];
//		String classxxId = classxxInfoRepository.exGetBy(null, null,ExMap.newInstance().add("classxx_ =", classxx).asJava() , null).getId();
		Map<String, String> chinese2Num =  new HashMap<String, String>();
		chinese2Num.put("一", "1");
		chinese2Num.put("二", "2");
		chinese2Num.put("三", "3");
		chinese2Num.put("四", "4");
		chinese2Num.put("五", "5");
		chinese2Num.put("六", "6");
		chinese2Num.put("七", "7");
		chinese2Num.put("八", "8");
		String chineseDay = dayAndSection.split(" ")[0].split("期")[1];
		String section = dayAndSection.split("第")[1].split("节")[0];
		String day = chinese2Num.get(chineseDay);
//		String tchId = teachInfoRepository.exGetBy(null, null,ExMap.newInstance().add("classxx_id_ =", classxxId).add( "day_ =", day).add("section_ =",section).asJava() , null).getTchId();
//		String tchName = tchInfoRepository.get(tchId).getTchName();
		return null;
	}
	
}
