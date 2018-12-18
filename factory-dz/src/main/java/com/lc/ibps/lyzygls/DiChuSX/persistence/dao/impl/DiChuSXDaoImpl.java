package com.lc.ibps.lyzygls.DiChuSX.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.lyzygls.DiChuSX.persistence.dao.DiChuSXDao;
import com.lc.ibps.lyzygls.DiChuSX.persistence.entity.DiChuSXPo;

/**
 * 该表用于单位概况的地处山系数据 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:20:04
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class DiChuSXDaoImpl extends MyBatisDaoImpl<String, DiChuSXPo> implements DiChuSXDao{

    @Override
    public String getNamespace() {
        return DiChuSXPo.class.getName();
    }
}
