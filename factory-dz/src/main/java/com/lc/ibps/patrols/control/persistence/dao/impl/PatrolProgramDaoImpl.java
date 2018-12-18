package com.lc.ibps.patrols.control.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.patrols.control.persistence.dao.PatrolProgramDao;
import com.lc.ibps.patrols.control.persistence.entity.PatrolProgramPo;

/**
 * 巡课方案 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-28 01:48:20
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class PatrolProgramDaoImpl extends MyBatisDaoImpl<String, PatrolProgramPo> implements PatrolProgramDao{

    @Override
    public String getNamespace() {
        return PatrolProgramPo.class.getName();
    }
}
