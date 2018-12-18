package com.lc.ibps.repair.HaoCaiGuanLi.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.dao.HaoCaiGuanLiDao;
import com.lc.ibps.repair.HaoCaiGuanLi.persistence.entity.HaoCaiGuanLiPo;

/**
 * t_hcglb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:41:59
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class HaoCaiGuanLiDaoImpl extends MyBatisDaoImpl<String, HaoCaiGuanLiPo> implements HaoCaiGuanLiDao{

    @Override
    public String getNamespace() {
        return HaoCaiGuanLiPo.class.getName();
    }
}
