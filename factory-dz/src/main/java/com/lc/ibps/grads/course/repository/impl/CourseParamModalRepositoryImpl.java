package com.lc.ibps.grads.course.repository.impl;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.grads.course.domain.CourseParamModal;
import com.lc.ibps.grads.course.repository.CourseParamModalRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.lc.ibps.grads.course.persistence.dao.CourseParamModalQueryDao;
import com.lc.ibps.grads.course.persistence.entity.CourseParamModalPo;
import com.lc.ibps.grads.course.persistence.entity.CourseParamPo;

/**
 * t_course_param_modal 仓库的实现类
 *
 *<pre> 
 * 开发公司：哈尔滨工程大学
 * 开发人员：guanxinyu
 * 邮箱地址：1@qq.com
 * 创建时间：2017-06-16 03:43:01
 *</pre>
 */
@Repository
public class CourseParamModalRepositoryImpl extends AbstractRepository<String, CourseParamModalPo,CourseParamModal> implements CourseParamModalRepository{
	  
	@Resource
	private  CourseParamModalQueryDao courseParamModalQueryDao;

	@Override
	public CourseParamModal newInstance() {
		CourseParamModalPo po = new CourseParamModalPo();
		CourseParamModal courseParamModal = AppUtil.getBean(CourseParamModal.class);
		courseParamModal.setData(po);
		return courseParamModal;
	}

	@Override
	public CourseParamModal newInstance(CourseParamModalPo po) {
		CourseParamModal courseParamModal = AppUtil.getBean(CourseParamModal.class);
		courseParamModal.setData(po);
		return courseParamModal;
	} 
	
	@Override
	protected IQueryDao<String, CourseParamModalPo> getQueryDao() {
		return courseParamModalQueryDao;
	}

	@Override
	public List parseJson(String jsonStr) {
		List tList = new ArrayList<CourseParamPo>();
		JSONArray ja = JSONArray.fromObject(jsonStr);
		Iterator<JSONObject> it = ja.iterator();
		while(it.hasNext()){
			JSONObject jo = it.next();
			CourseParamPo cpp = new CourseParamPo();
			cpp.setName(jo.getString("name"));
			double t = Double.parseDouble(jo.getString("scorePower"));
			t*=Integer.parseInt(jo.getString("count"));
			t=Math.max((int)(t+0.1),(int)t);
			cpp.setScorePower(""+t);
			cpp.setStartWeek(jo.getString("startWeek"));
			cpp.setStartDay(jo.getString("startDay"));
			cpp.setStartTime(jo.getString("startTime"));
			cpp.setCycle(jo.getString("cycle"));
			cpp.setPeriod(jo.getString("period"));
			cpp.setCount(jo.getString("count"));
//			cpp.setIsTrans(jo.getInt("isTrans"));
//			cpp.setCategory(jo.getInt("category"));
			tList.add(cpp);
		}
		return tList;
	}
	

	
}
