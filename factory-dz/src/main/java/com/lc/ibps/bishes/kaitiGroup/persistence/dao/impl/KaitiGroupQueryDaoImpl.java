
package com.lc.ibps.bishes.kaitiGroup.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.bishes.kaitiGroup.persistence.dao.KaitiGroupQueryDao;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 *t_ktxz 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class KaitiGroupQueryDaoImpl extends MyBatisQueryDaoImpl<String, KaitiGroupPo> implements KaitiGroupQueryDao{

    @Override
    public String getNamespace() {
        return KaitiGroupPo.class.getName();
    }
    @Override
   	public List<KaitiGroupPo> getByktGroupId(String groupid) {
   		Map<String, Object> params = new HashMap<String, Object>();
   		params.put("groupid", groupid);
   		return this.findByKey("getByktGroupId", groupid);
   	}
}
