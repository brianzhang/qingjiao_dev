package com.lc.ibps.patrols.data.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.patrols.data.persistence.dao.ClassxxInfoDao;
import com.lc.ibps.patrols.data.persistence.entity.ClassxxInfoPo;

/**
 * 班级信息 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 13:25:54
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ClassxxInfoDaoImpl extends MyBatisDaoImpl<String, ClassxxInfoPo> implements ClassxxInfoDao{

    @Override
    public String getNamespace() {
        return ClassxxInfoPo.class.getName();
    }
}
