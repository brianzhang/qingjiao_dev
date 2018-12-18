package com.lc.ibps.loans.daikuanInfo.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.daikuanInfo.persistence.dao.DaiKuanShenQingInfoDao;
import com.lc.ibps.loans.daikuanInfo.persistence.entity.DaiKuanShenQingInfoPo;

/**
 * t_sxsq Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 04:11:06
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class DaiKuanShenQingInfoDaoImpl extends MyBatisDaoImpl<String, DaiKuanShenQingInfoPo> implements DaiKuanShenQingInfoDao{

    @Override
    public String getNamespace() {
        return DaiKuanShenQingInfoPo.class.getName();
    }
}
