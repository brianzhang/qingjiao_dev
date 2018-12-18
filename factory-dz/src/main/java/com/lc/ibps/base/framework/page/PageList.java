package com.lc.ibps.base.framework.page;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.lc.ibps.base.core.util.JacksonUtil;

/**
 * 包含“分页”信息的List，这个对象包含分页数据和分页结果。
 *
 * <pre>
 *  
 * 构建组：ibps-base-framework
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015年12月23日-下午2:23:21
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class PageList<E> extends ArrayList<E> implements Serializable {

	private static final long serialVersionUID = -3884653747610037029L;

	private PageResult pageResult;

	public PageList() {
	}

	public PageList(Collection<? extends E> c) {
		super(c);
		if (c instanceof PageList<?>) {
			this.pageResult = ((PageList<?>) c).pageResult;
		}
	}

	public PageList(Collection<? extends E> c, PageResult p) {
		super(c);
		this.pageResult = p;
	}

	public PageList(PageResult p) {
		this.pageResult = p;
	}

	/**
	 * 得到分页器，通过Paginator可以得到总页数等值
	 * 
	 * @return
	 */
	public PageResult getPageResult() {
		return pageResult;
	}

	/**
	 * @param pageResult
	 *            the pageResult to set
	 */
	public void setPageResult(PageResult pageResult) {
		this.pageResult = pageResult;
	}

	@Override
	public String toString() {
		return toJsonString();
	}
	
	public String toJsonString(){
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("pageResult", ((PageList<E>)this).getPageResult().toJsonString());
		data.put("data", this);
		
		return JacksonUtil.toJsonString(data);
	}
}
