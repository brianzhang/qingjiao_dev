package com.lc.ibps.bishes.audit.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.bishes.audit.persistence.dao.LabelDefDao;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;

/**
 * t_label_def Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class LabelDefDaoImpl extends MyBatisDaoImpl<String, LabelDefPo> implements LabelDefDao{

    @Override
    public String getNamespace() {
        return LabelDefPo.class.getName();
    }
}
