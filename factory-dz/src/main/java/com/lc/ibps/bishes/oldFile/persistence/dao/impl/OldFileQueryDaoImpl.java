
package com.lc.ibps.bishes.oldFile.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.bishes.oldFile.persistence.dao.OldFileQueryDao;
import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *t_oldfile 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-29 16:49:22
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class OldFileQueryDaoImpl extends MyBatisQueryDaoImpl<String, OldFilePo> implements OldFileQueryDao{

    @Override
    public String getNamespace() {
        return OldFilePo.class.getName();
    }

    @Override
    public List<OldFilePo> getBySql(String whereSql) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("whereSql", whereSql);
        return this.findByKey("getBySql", params);
    }
}
