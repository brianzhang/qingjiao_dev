package com.lc.ibps.pgs.PGData.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.AllCourseDao;
import com.lc.ibps.pgs.PGData.persistence.entity.AllCoursePo;

/**
 * t_qbkc Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 15:56:41
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class AllCourseDaoImpl extends MyBatisDaoImpl<String, AllCoursePo> implements AllCourseDao{

    @Override
    public String getNamespace() {
        return AllCoursePo.class.getName();
    }
}
