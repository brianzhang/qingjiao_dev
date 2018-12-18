package com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.dao.HaoCaiShiYongDao;
import com.lc.ibps.repair.WXGHaoCaiShiYong.persistence.entity.HaoCaiShiYongPo;

/**
 * t_wxghcsyb Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-28 15:39:21
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class HaoCaiShiYongDaoImpl extends MyBatisDaoImpl<String, HaoCaiShiYongPo> implements HaoCaiShiYongDao{

    @Override
    public String getNamespace() {
        return HaoCaiShiYongPo.class.getName();
    }
}
