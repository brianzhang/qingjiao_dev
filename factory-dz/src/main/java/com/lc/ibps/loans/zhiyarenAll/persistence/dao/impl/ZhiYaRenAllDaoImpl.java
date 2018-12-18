package com.lc.ibps.loans.zhiyarenAll.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.loans.zhiyarenAll.persistence.dao.ZhiYaRenAllDao;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;

/**
 * t_zyr_all Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:17:35
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ZhiYaRenAllDaoImpl extends MyBatisDaoImpl<String, ZhiYaRenAllPo> implements ZhiYaRenAllDao{

    @Override
    public String getNamespace() {
        return ZhiYaRenAllPo.class.getName();
    }
}
