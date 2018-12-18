package com.lc.ibps.platform.cat.helper;

import java.util.ArrayList;
import java.util.List;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.GsonUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 平铺结构数据转换为树形结构数据。
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年1月29日-下午3:29:59
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class ListToTree<C> {
	private String idKey = "id";											/*平铺结构中数据主键key*/
	private String pIdKey = "parentId";										/*平铺结构中数据父对象主键key*/
	private String childKey = "children";									/*树形结构中存放子对象的属性名*/
	private ListToTreeConvert<C> convert = new DefaultListToTreeConvert();	/*将对象转换为JSONObject时的转换器*/
	
	public ListToTree(){}
	
	/**
	 * 传入一个转换器，指定返回哪些属性
	 * @param convert
	 */
	public ListToTree(ListToTreeConvert<C> convert){
		this.convert = convert;
	}
	
	public ListToTree(String idKey,String pIdKey,String childKey){
		this.idKey = idKey;
		this.pIdKey = pIdKey;
		this.childKey = childKey;
	}
	
	public ListToTree(String idKey,String pIdKey,String childKey,ListToTreeConvert<C> convert){
		this.idKey = idKey;
		this.pIdKey = pIdKey;
		this.childKey = childKey;
		this.convert = convert;
	}
	
	public JSONArray toTree(List<C> list){
		JSONArray jarray = new JSONArray();
		if(BeanUtils.isEmpty(list))return jarray;
		List<TilePack> packs = new ArrayList<TilePack>();
		for (C c : list) {
			JSONObject jobject = convert.convert(c);
			if(BeanUtils.isEmpty(jobject))continue;
			packs.add(new TilePack(jobject));
		}
		List<TilePack> packs2remove = new ArrayList<TilePack>();
		for (TilePack tilePack : packs) {
			String pId = tilePack.getMyParentId();
			for(TilePack tilePack2 : packs){
				if(tilePack.getMyId().equals(tilePack2.getMyId()))continue;
				TilePack myParent = tilePack2.try2GetMyParent(pId);
				if(BeanUtils.isNotEmpty(myParent)){
					myParent.addChild(tilePack);
					packs2remove.add(tilePack);
				}
			}
		}
		packs.removeAll(packs2remove);
		for (TilePack tilePack : packs) {
			jarray.add(tilePack.toJsonObject());
		}
		return jarray;
	}
	
	//默认的属性转换器
	class DefaultListToTreeConvert implements ListToTreeConvert<C>{
		public JSONObject convert(C obj) {
			JSONObject fromObject = JSONObject.fromObject(obj);
			return fromObject;
		}
	}
	//平铺对象包装类
	class TilePack{
		private JSONObject jobject;
		private List<TilePack> children = new ArrayList<TilePack>();
		
		public TilePack(JSONObject jobject){
			this.jobject = jobject;
		}
		
		public String getMyId(){
			return GsonUtil.getValue(jobject.toString(), idKey, "", String.class);
		}
		
		public String getMyParentId(){
			return GsonUtil.getValue(jobject.toString(), pIdKey, "", String.class);
		}
		
		public void addChild(TilePack tilePack){
			for (TilePack t : children) {
				if(t.getMyId().equals(tilePack.getMyId()))return;
			}
			children.add(tilePack);
		}
		
		public TilePack try2GetMyParent(String pId){
			if(pId.equals(getMyId()))return this;
			if(BeanUtils.isNotEmpty(children)){
				for (TilePack tilePack : children) {
					TilePack myParent = tilePack.try2GetMyParent(pId);
					if(BeanUtils.isEmpty(myParent))continue;
					return myParent;
				}
			}
			return null;
		}
		
		public JSONObject toJsonObject(){
			if(BeanUtils.isNotEmpty(children)){
				JSONArray jary = new JSONArray();
				for (TilePack tilePack : children) {
					jary.add(tilePack.toJsonObject());
				}
				this.jobject.accumulate(childKey, jary);
			}
			return this.jobject;
		}
	}
}
