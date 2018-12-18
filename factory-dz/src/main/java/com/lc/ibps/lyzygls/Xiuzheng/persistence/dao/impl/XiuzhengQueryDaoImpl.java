
package com.lc.ibps.lyzygls.Xiuzheng.persistence.dao.impl;


import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.dao.XiuzhengQueryDao;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.entity.XiuzhengPo;

/**
 *森林资源变化统计表（去年实有和修正值） 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 13:55:35
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class XiuzhengQueryDaoImpl extends MyBatisQueryDaoImpl<String, XiuzhengPo> implements XiuzhengQueryDao{

    @Override
    public String getNamespace() {
        return XiuzhengPo.class.getName();
    }
}
