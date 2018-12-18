package com.lc.ibps.loans.zhiyaRInfo.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.zhiyaRInfo.persistence.dao.ZhiYaPersonDao;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;

/**
 * t_zyr Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-24 03:02:25
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ZhiYaPersonDaoImpl extends MyBatisDaoImpl<String, ZhiYaPersonPo> implements ZhiYaPersonDao{

    @Override
    public String getNamespace() {
        return ZhiYaPersonPo.class.getName();
    }
}
