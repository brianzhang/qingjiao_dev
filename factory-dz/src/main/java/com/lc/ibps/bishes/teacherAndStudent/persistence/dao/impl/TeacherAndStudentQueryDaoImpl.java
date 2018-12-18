
package com.lc.ibps.bishes.teacherAndStudent.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.bishes.teacherAndStudent.persistence.dao.TeacherAndStudentQueryDao;
import com.lc.ibps.bishes.teacherAndStudent.persistence.entity.TeacherAndStudentPo;

/**
 *t_tddsxs 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-20 23:31:07
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class TeacherAndStudentQueryDaoImpl extends MyBatisQueryDaoImpl<String, TeacherAndStudentPo> implements TeacherAndStudentQueryDao{

    @Override
    public String getNamespace() {
        return TeacherAndStudentPo.class.getName();
    }

	@Override
	public List<TeacherAndStudentPo> getByJsid(String jsid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jsid", jsid);
		return this.findByKey("getByJsid", params);
	}

	@Override
	public List<TeacherAndStudentPo> getByGroupid(String groupid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("groupid", groupid);
		return this.findByKey("getByGroupId", params);
	}
}
