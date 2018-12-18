package com.lc.ibps.bishes.labelType.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.bishes.labelType.persistence.dao.LabelTypeDao;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;

/**
 * t_label_type Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 16:57:08
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class LabelTypeDaoImpl extends MyBatisDaoImpl<String, LabelTypePo> implements LabelTypeDao{

    @Override
    public String getNamespace() {
        return LabelTypePo.class.getName();
    }
}
