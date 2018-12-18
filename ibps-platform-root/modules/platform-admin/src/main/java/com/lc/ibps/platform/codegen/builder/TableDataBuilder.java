/**
 * 描述：构建表data
 * 包名：com.lc.ibps.platform.codegen.builder
 * 文件名：TableDataBuilder.java
 * 作者：eddy
 * 日期：2017年3月3日-上午9:57:01
 * 版权：广州流辰信息技术有限公司版权所有
 * 
 */
package com.lc.ibps.platform.codegen.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;

import com.lc.ibps.api.common.cat.service.IDictionaryService;
import com.lc.ibps.base.bo.persistence.entity.BoAttrColumnPo;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.framework.table.model.Column;
import com.lc.ibps.components.codegen.persistence.entity.FieldConfigPo;
import com.lc.ibps.components.codegen.persistence.entity.TableConfigPo;

/** 
 * 构建表data
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2017年3月3日-上午9:57:01
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class TableDataBuilder {
	
	public static List<Map<String, String>> buildTable(Map<String, String> tableMap){
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		for(Entry<String, String> entry : tableMap.entrySet()){
			map = new HashMap<String, String>();
			map.put("id", entry.getKey());
			map.put("text", entry.getKey());
			map.put("comment", entry.getValue());
			rs.add(map);
		}
		
		return rs;
	}
	
	/**
	 * 
	 *
	 * @param tableConfigList
	 * @return 
	 */
	public static List<Map<String, String>> buildTableConfig(List<TableConfigPo> tableConfigList) {
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		for(TableConfigPo tblConfig : tableConfigList){
			map = new HashMap<String, String>();
			map.put("id", tblConfig.getTableName());
			map.put("text", tblConfig.getTableName());
			map.put("mode", tblConfig.getTableSource());
			map.put("class", tblConfig.getClassName());
			map.put("classVar", StringUtil.lowerFirst(tblConfig.getClassName()));
			map.put("struType", tblConfig.getStruType());
			rs.add(map);
		}
		
		return rs;
	}
	
	public static List<Map<String, String>> buildColumn(List<Column> fieldList, String columnName){
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		for(Column col : fieldList){
			if(!col.getName().contains(columnName)){
				continue;
			}
			map = new HashMap<String, String>();
			map.put("id", col.getName());
			map.put("text", col.getName());
			map.put("comment", col.getComment());
			rs.add(map);
		}
		
		return rs;
	}
	
	public static List<Map<String, String>> buildColumn(List<Column> fieldList, List<BoAttrColumnPo> acList, String columnName){
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		for(Column col : fieldList){
			if(!col.getName().contains(columnName)){
				continue;
			}
			
			if(!isBoColumn(acList, col.getName())){
				continue;
			}
			
			map = new HashMap<String, String>();
			map.put("id", col.getName());
			map.put("text", col.getName());
			map.put("comment", col.getComment());
			rs.add(map);
		}
		
		return rs;
	}
	
	private static boolean isBoColumn(List<BoAttrColumnPo> acList, String colName){
		if(BeanUtils.isEmpty(acList)){
			return true;
		}
		
		for(BoAttrColumnPo ac : acList){
			if(colName.equalsIgnoreCase(ac.getFieldName())){
				return true;
			}
		}
		
		return false;
	}
	
	public static List<FieldConfigPo> buildField(List<Column> fieldList){
		List<FieldConfigPo> rs = new ArrayList<FieldConfigPo>();
		
		FieldConfigPo field = null;
		String keyName = "";
		for(Column col : fieldList){
			field = new FieldConfigPo();
			field.setField(col.getName());
			field.setFieldComment(col.getComment());
			field.setShowList(StringPool.Y);
			field.setShowQuery(StringPool.Y);
			field.setSqlType(col.getColumnType());
			field.setLength(col.getCharLen());
			field.setPrecision(col.getDecimalLen());
			field.setScale(col.getDecimalLen());
			field.setJavaType(getJavaType(col));
			field.setPropName(getPropName(col.getName()));
			
			keyName = (StringPool.Y.equals(col.getIsPk())?"pk":"");
			field.setKeyName(keyName);
			
			field.setControl(getControl(col));
			IDictionaryService dicService = AppUtil.getBean(IDictionaryService.class);
			String label = dicService.getLabelByKey("fieldControl", getControl(col));
			field.setControlLabel(label);
			
			field.setQueryOp(getQueryOp(col));
			
			rs.add(field);
		}
		
		return rs;
	}
	
	public static List<FieldConfigPo> buildField(List<Column> fieldList, List<BoAttrColumnPo> acList){
		List<FieldConfigPo> rs = new ArrayList<FieldConfigPo>();
		
		FieldConfigPo field = null;
		String keyName = "";
		for(Column col : fieldList){
			if(!isBoColumn(acList, col.getName())){
				continue;
			}
			
			field = new FieldConfigPo();
			field.setField(col.getName());
			field.setFieldComment(col.getComment());
			field.setShowList(StringPool.Y);
			field.setShowQuery(StringPool.Y);
			field.setSqlType(col.getColumnType());
			field.setLength(col.getCharLen());
			field.setPrecision(col.getDecimalLen());
			field.setScale(col.getDecimalLen());
			field.setJavaType(getJavaType(col));
			
			field.setPropName(getPropName(col.getName(), acList));
			
			keyName = (StringPool.Y.equals(col.getIsPk())?"pk":"");
			field.setKeyName(keyName);
			
			field.setControl(getControl(col));
			IDictionaryService dicService = AppUtil.getBean(IDictionaryService.class);
			String label = dicService.getLabelByKey("fieldControl", getControl(col));
			field.setControlLabel(label);
			
			field.setQueryOp(getQueryOp(col));
			
			rs.add(field);
		}
		
		return rs;
	}
	
	private static String getControl(Column col) {
		if(Column.COLUMN_TYPE_INT.equals(col.getColumnType())){
			return "text";
		}else if(Column.COLUMN_TYPE_DATE.equals(col.getColumnType())){
			return "datePicker";
		}else if(Column.COLUMN_TYPE_VARCHAR.equals(col.getColumnType())){
			return "text";
		}else if(Column.COLUMN_TYPE_CLOB.equals(col.getColumnType())){
			return "editor";
		}else if(Column.COLUMN_TYPE_NUMBER.equals(col.getColumnType())
				&& (null == col.getDecimalLen() || 0 == col.getDecimalLen())){
			return "text";
		}else if(Column.COLUMN_TYPE_NUMBER.equals(col.getColumnType())
				&& (null != col.getDecimalLen() && 0 != col.getDecimalLen())){
			return "text";
		}
		
		return "text";
	}
	
	private static String getQueryOp(Column col) {
		if(Column.COLUMN_TYPE_INT.equals(col.getColumnType())){
			return "=";
		}else if(Column.COLUMN_TYPE_DATE.equals(col.getColumnType())){
			return "between";
		}else if(Column.COLUMN_TYPE_VARCHAR.equals(col.getColumnType())){
			return "like";
		}else if(Column.COLUMN_TYPE_CLOB.equals(col.getColumnType())){
			return "=";
		}else if(Column.COLUMN_TYPE_NUMBER.equals(col.getColumnType())
				&& (null == col.getDecimalLen() || 0 == col.getDecimalLen())){
			return "=";
		}else if(Column.COLUMN_TYPE_NUMBER.equals(col.getColumnType())
				&& (null != col.getDecimalLen() && 0 != col.getDecimalLen())){
			return "=";
		}
		
		return "like";
	}
	
	private static String getPropName(String name) {
		return StringUtil.convertSplit(name, "_");
	}
	
	private static String getPropName(String name, List<BoAttrColumnPo> acList) {
		if(BeanUtils.isNotEmpty(acList)){
			for(BoAttrColumnPo ac : acList){
				if(name.equalsIgnoreCase(ac.getFieldName())){
					return ac.getAttrCode();
				}
			}
		}
		
		return StringUtil.convertSplit(name, "_");
	}

	private static String getJavaType(Column col){
		if(Column.COLUMN_TYPE_INT.equals(col.getColumnType())){
			return "Integer";
		}else if(Column.COLUMN_TYPE_DATE.equals(col.getColumnType())){
			return "Date";
		}else if(Column.COLUMN_TYPE_VARCHAR.equals(col.getColumnType())){
			return "String";
		}else if(Column.COLUMN_TYPE_CLOB.equals(col.getColumnType())){
			return "String";
		}else if(Column.COLUMN_TYPE_NUMBER.equals(col.getColumnType())
				&& (null == col.getDecimalLen() || 0 == col.getDecimalLen())){
			return "Long";
		}else if(Column.COLUMN_TYPE_NUMBER.equals(col.getColumnType())
				&& (null != col.getDecimalLen() && 0 != col.getDecimalLen())){
			return "Double";
		}
		
		return "String";
	}

	public static List<Map<String, String>> buildColumn(SqlRowSetMetaData rowSetMetaData) {
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		int count = rowSetMetaData.getColumnCount();
		for(int i = 0; i < count; i ++){
			map = new HashMap<String, String>();
			map.put("id", rowSetMetaData.getColumnName(i));
			map.put("text", rowSetMetaData.getColumnName(i));
			map.put("comment", rowSetMetaData.getColumnLabel(i));
			rs.add(map);
		}
		
		return rs;
	}

	public static List<Map<String, String>> buildColumnByComment(List<Column> fieldList, String comment) {
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		for(Column col : fieldList){
			if(!col.getComment().contains(comment)){
				continue;
			}
			map = new HashMap<String, String>();
			map.put("id", col.getName());
			map.put("text", col.getName());
			map.put("comment", col.getComment());
			rs.add(map);
		}
		
		return rs;
	}

	public static List<Map<String, String>> buildColumnByComment(SqlRowSetMetaData rowSetMetaData, String queryComment) {
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> map = null;
		int count = rowSetMetaData.getColumnCount();
		for(int i = 0; i < count; i ++){
			map = new HashMap<String, String>();
			String comment = rowSetMetaData.getColumnLabel(i);
			if(!comment.contains(queryComment)){
				continue;
			}
			
			map.put("id", rowSetMetaData.getColumnName(i));
			map.put("text", rowSetMetaData.getColumnName(i));
			map.put("comment", comment);
			rs.add(map);
		}
		
		return rs;
	}

}
