package com.lc.ibps.lyzygls.Shengzhanglv.persistence.dao.impl;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.dao.ShangzhanglvDao;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.entity.ShangzhanglvPo;

/**
 * 该表用于生长率的设置 Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:14:02
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class ShangzhanglvDaoImpl extends MyBatisDaoImpl<String, ShangzhanglvPo> implements ShangzhanglvDao{

    @Override
    public String getNamespace() {
        return ShangzhanglvPo.class.getName();
    }
}
