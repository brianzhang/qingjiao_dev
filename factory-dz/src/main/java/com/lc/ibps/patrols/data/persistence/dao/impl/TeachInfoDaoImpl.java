package com.lc.ibps.patrols.data.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.patrols.data.persistence.dao.TeachInfoDao;
import com.lc.ibps.patrols.data.persistence.entity.TeachInfoPo;

/**
 * 授课信息 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-30 12:55:50
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class TeachInfoDaoImpl extends MyBatisDaoImpl<String, TeachInfoPo> implements TeachInfoDao{

    @Override
    public String getNamespace() {
        return TeachInfoPo.class.getName();
    }
}
