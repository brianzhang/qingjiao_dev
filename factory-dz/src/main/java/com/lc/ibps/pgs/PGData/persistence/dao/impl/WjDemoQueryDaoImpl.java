
package com.lc.ibps.pgs.PGData.persistence.dao.impl;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.pgs.PGData.persistence.dao.WjDemoQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.WjDemoPo;

/**
 *t_p_wjdc_test 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class WjDemoQueryDaoImpl extends MyBatisQueryDaoImpl<String, WjDemoPo> implements WjDemoQueryDao{

    @Override
    public String getNamespace() {
        return WjDemoPo.class.getName();
    }
    
    @Override
    public List<WjDemoPo> getByWjtype(String type){
    	return findByKey("queryByType", type);
    }
}
