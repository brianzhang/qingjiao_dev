package com.lc.ibps.platform.codegen.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.form.constants.FormMode;
import com.lc.ibps.base.bo.persistence.entity.BoAttrColumnPo;
import com.lc.ibps.base.bo.persistence.entity.BoDefPo;
import com.lc.ibps.base.bo.persistence.entity.BoTablePo;
import com.lc.ibps.base.bo.repository.BoAttrColumnRepository;
import com.lc.ibps.base.bo.repository.BoDefRepository;
import com.lc.ibps.base.bo.repository.BoTableRepository;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.db.util.TableMetaUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.table.ITableMeta;
import com.lc.ibps.base.framework.table.model.Column;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.ds.persistence.entity.DataSourcePo;
import com.lc.ibps.common.ds.persistence.service.DataSourceSetService;
import com.lc.ibps.components.codegen.domain.TableConfig;
import com.lc.ibps.components.codegen.persistence.entity.FieldConfigPo;
import com.lc.ibps.components.codegen.persistence.entity.TableConfigPo;
import com.lc.ibps.components.codegen.repository.TableConfigRepository;
import com.lc.ibps.platform.codegen.builder.TableConfigBuilder;
import com.lc.ibps.platform.codegen.builder.TableDataBuilder;

import net.sf.json.JSONObject;

/**
 * 表配置 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-02 20:17:50
 *</pre>
 */
@Controller
@RequestMapping("/platform/codegen/tableConfig/")
public class TableConfigController extends GenericController{
	@Resource
	private TableConfigRepository tableConfigRepository;
	@Resource
	private ITableMeta tableMeta;
	@Resource
	private BoTableRepository boTableRepository;
	@Resource
	private BoDefRepository boDefRepository;
	@Resource
	private BoAttrColumnRepository boAttrColumnRepository;
	@Resource
	private DataSourceSetService dataSourceSetService;
	
	/**
	 * 【表配置】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<TableConfigPo> tableConfigList=(PageList<TableConfigPo>)tableConfigRepository.query(queryFilter);
		TableConfigBuilder.build(tableConfigList);
		return new PageJson(tableConfigList);
	}
	
	/**
	 * 获取表配置
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("design")
	@ResponseBody
	public Map<String, String> design(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String id = RequestUtil.getString(request, "id", "");
		TableConfigPo tableConfig = tableConfigRepository.loadCascade(id);
		Map<String, String> rsMap = new HashMap<String, String>();
		rsMap.put("result", "true");
		if(StringUtil.isEmpty(tableConfig.getBoId())){
			rsMap.put("mode", FormMode.CODE_GEN.key());
			rsMap.put("code", tableConfig.getTableName());
		}else{
			BoDefPo bindBoDefPo = boDefRepository.get(tableConfig.getBoId());
			if(BeanUtils.isEmpty(bindBoDefPo)){
				rsMap.put("result", "false");
				rsMap.put("msg", "业务对象不存在！");
			}else{
				if(StringPool.N.equals(bindBoDefPo.getIsMain())){
					rsMap.put("result", "false");
					rsMap.put("msg", "业务对象不是主版本不能创建表单！");
				}else{
					rsMap.put("mode", FormMode.BO.key());
					rsMap.put("code", bindBoDefPo.getCode());
				}
			}
		}
		
		return rsMap;
	}
	
	/**
	 * 获取表配置列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("tableConfigList")
	@ResponseBody
	public List<Map<String, String>> tableConfigList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tableName = RequestUtil.getString(request, "tableName", "");
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		queryFilter.setPage(null);
		queryFilter.addFilter("TABLE_NAME_", "%" + tableName + "%", QueryOP.LIKE);
		List<TableConfigPo> tableConfigList = tableConfigRepository.query(queryFilter);
		List<Map<String, String>> rs = TableDataBuilder.buildTableConfig(tableConfigList);
		return rs;
	}
	
	/**
	 * 获取表列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("tableList")
	@ResponseBody
	public List<Map<String, String>> tableList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tableName = RequestUtil.getString(request, "tableName", "");
		String tableSource = RequestUtil.getString(request, "tableSource", "table");
		String boId = RequestUtil.getString(request, "boId", "");
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		Map<String, String> tableMap = null;
		try {
			ITableMeta meta = tableMeta;
			if(StringUtil.isEmpty(boId)){
				if (StringUtil.isNotEmpty(dsAlias)) {
					meta = TableMetaUtil.getTableMetaByDsAlias(dsAlias);
					if(BeanUtils.isEmpty(meta)){
						throw new Exception();
					}
				}else{
					throw new Exception();
				}
			}
			tableMap = meta.getTablesByName(tableName);
			
		} catch (Exception e) {
			logger.error("数据源【"+dsAlias+"】不存在！");
		} finally {
			DbContextHolder.clearDataSource();
		}
		if(BeanUtils.isEmpty(tableMap)){
			return null;
		}
		List<BoTablePo> boTableList = boTableRepository.findByMainBodef();
		
		tableMap = this.filterTable(tableSource, boId, tableMap, boTableList);
		return TableDataBuilder.buildTable(tableMap);
	}
	
	/**
	 * 过滤表名
	 *
	 * @param tableSrouce
	 * @param tableMap
	 * @param boTableList 
	 */
	private Map<String, String> filterTable(String tableSource, String boId, Map<String, String> tableMap, List<BoTablePo> boTableList) {
		Map<String, String> rsTableMap = new HashMap<String, String>();
		if("bo".equals(tableSource)){
			if(BeanUtils.isEmpty(boTableList)){
				return rsTableMap;
			}else{
				BoDefPo boDef = null;
				BoTablePo boTablePo = null;
				if(StringUtil.isNotEmpty(boId)){
					boDef = boDefRepository.get(boId);
					boTablePo = boTableRepository.getByDefCode(boDef.getCode(), boDef.getVersion());
				}
				
				if(BeanUtils.isEmpty(boTablePo)){
					for(BoTablePo table : boTableList){
						if(tableMap.containsKey(table.getName().toUpperCase())){
							rsTableMap.put(table.getName().toUpperCase(), tableMap.get(table.getName().toUpperCase()));
						}else if(tableMap.containsKey(table.getName().toLowerCase())){
							rsTableMap.put(table.getName().toLowerCase(), tableMap.get(table.getName().toLowerCase()));
						}else{
							rsTableMap.put(table.getName(), tableMap.get(table.getName()));
						}
					}
				}else{
					if(tableMap.containsKey(boTablePo.getName().toUpperCase())){
						rsTableMap.put(boTablePo.getName().toUpperCase(), tableMap.get(boTablePo.getName().toUpperCase()));
					}else if(tableMap.containsKey(boTablePo.getName().toLowerCase())){
						rsTableMap.put(boTablePo.getName().toLowerCase(), tableMap.get(boTablePo.getName().toLowerCase()));
					}else{
						rsTableMap.put(boTablePo.getName(), tableMap.get(boTablePo.getName()));
					}
				}
			
				return rsTableMap;
			}
		}else if("table".equals(tableSource)){
			if(BeanUtils.isEmpty(boTableList)){
				return tableMap;
			}else{
				for(BoTablePo table : boTableList){
					tableMap.remove(table.getName());
					tableMap.remove(table.getName().toUpperCase());
					tableMap.remove(table.getName().toLowerCase());
				}
				return tableMap;
			}
		}
		
		return rsTableMap;
	}
	
	/**
	 * 获取表列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("ptableList")
	@ResponseBody
	public List<Map<String, String>> ptableList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tableName = RequestUtil.getString(request, "tableName", "");
		String tableSource = RequestUtil.getString(request, "tableSource", "table");
		String boId = RequestUtil.getString(request, "boId", "");
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		
		if(StringUtil.isEmpty(boId)){
			DataSourcePo dsPo = dataSourceSetService.getByAlias(dsAlias);
			if(BeanUtils.isEmpty(dsPo)){
				logger.error("数据源【"+dsAlias+"】不存在！");
				return null;
			}
			DbContextHolder.setDataSource(dsAlias, dsPo.getDbType());
		}
		
		Map<String, String> tableMap = tableMeta.getTablesByName(tableName);
		
		List<BoTablePo> boTableList = boTableRepository.findByMainBodef();
		
		tableMap = this.filterPTable(tableSource, boId, tableMap, boTableList);
		
		List<Map<String, String>> rs = TableDataBuilder.buildTable(tableMap);
		
		return rs;
	}
	
	/**
	 * 过滤表名
	 *
	 * @param tableSrouce
	 * @param tableMap
	 * @param boTableList 
	 */
	private Map<String, String> filterPTable(String tableSource, String boId, Map<String, String> tableMap, List<BoTablePo> boTableList) {
		Map<String, String> rsTableMap = new HashMap<String, String>();
		if("bo".equals(tableSource)){
			if(BeanUtils.isEmpty(boTableList)){
				return rsTableMap;
			}else{
				for(BoTablePo table : boTableList){
					if(tableMap.containsKey(table.getName().toUpperCase())){
						rsTableMap.put(table.getName().toUpperCase(), tableMap.get(table.getName().toUpperCase()));
					}else if(tableMap.containsKey(table.getName().toLowerCase())){
						rsTableMap.put(table.getName().toLowerCase(), tableMap.get(table.getName().toLowerCase()));
					}else{
						rsTableMap.put(table.getName(), tableMap.get(table.getName()));
					}
				}
			
				return rsTableMap;
			}
		}else if("table".equals(tableSource)){
			if(BeanUtils.isEmpty(boTableList)){
				return tableMap;
			}else{
				for(BoTablePo table : boTableList){
					tableMap.remove(table.getName());
					tableMap.remove(table.getName().toUpperCase());
					tableMap.remove(table.getName().toLowerCase());
				}
				return tableMap;
			}
		}
		
		return rsTableMap;
	}
	
	/**
	 * 获取表列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("pcolumnList")
	@ResponseBody
	public List<Map<String, String>> pcolumnList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tableName = RequestUtil.getString(request, "tableName", "");
		String columnName = RequestUtil.getString(request, "columnName", "");
		String boId = RequestUtil.getString(request, "boId", "");
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		
		List<BoAttrColumnPo> acList = null;
		if(StringUtil.isNotEmpty(boId)){
			acList = boAttrColumnRepository.findByDefId(boId);
			BoDefPo boPo = boDefRepository.get(boId);
			
			String bodsAlias = boPo.getDsAlias();
			if(StringUtil.isNotEmpty(bodsAlias)){
				DataSourcePo dsPo = dataSourceSetService.getByAlias(bodsAlias);
				if(BeanUtils.isEmpty(dsPo)){
					logger.error("数据源【"+bodsAlias+"】不存在！");
					return null;
				}
				DbContextHolder.setDataSource(bodsAlias, dsPo.getDbType());
			}
		}else if(StringUtil.isNotEmpty(dsAlias)){
			DataSourcePo dsPo = dataSourceSetService.getByAlias(dsAlias);
			if(BeanUtils.isEmpty(dsPo)){
				logger.error("数据源【"+dsAlias+"】不存在！");
				return null;
			}
			DbContextHolder.setDataSource(dsAlias, dsPo.getDbType());
		}
		
		List<Column> fieldList = tableMeta.getColumnsByTableName(tableName);
		
		List<Map<String, String>> rs = TableDataBuilder.buildColumn(fieldList, acList, columnName);
		
		return rs;
	}

	/**
	 * 获取表列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("columnList")
	@ResponseBody
	public List<Map<String, String>> columnList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tableName = RequestUtil.getString(request, "tableName", "");
		String columnName = RequestUtil.getString(request, "columnName", "");
		String boId = RequestUtil.getString(request, "boId", "");
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		
		List<BoAttrColumnPo> acList = null;
		if(StringUtil.isNotEmpty(boId)){
			acList = boAttrColumnRepository.findByDefId(boId);
			BoDefPo boPo = boDefRepository.get(boId);
			
			String bodsAlias = boPo.getDsAlias();
			if(StringUtil.isNotEmpty(bodsAlias)){
				DataSourcePo dsPo = dataSourceSetService.getByAlias(bodsAlias);
				if(BeanUtils.isEmpty(dsPo)){
					logger.error("数据源【"+bodsAlias+"】不存在！");
					return null;
				}
				DbContextHolder.setDataSource(bodsAlias, dsPo.getDbType());
			}
		}else if(StringUtil.isNotEmpty(dsAlias)){
			DataSourcePo dsPo = dataSourceSetService.getByAlias(dsAlias);
			if(BeanUtils.isEmpty(dsPo)){
				logger.error("数据源【"+dsAlias+"】不存在！");
				return null;
			}
			DbContextHolder.setDataSource(dsAlias, dsPo.getDbType());
		}
		
		List<Column> fieldList = tableMeta.getColumnsByTableName(tableName);
		
		List<Map<String, String>> rs = TableDataBuilder.buildColumn(fieldList, acList, columnName);
		
		return rs;
	}
	
	/**
	 * 获取字段列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("fieldList")
	@ResponseBody
	public List<FieldConfigPo> fieldList(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String tableName = RequestUtil.getString(request, "tableName", "");
		String boId = RequestUtil.getString(request, "boId", "");
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		
		List<BoAttrColumnPo> acList = null;
		if(StringUtil.isNotEmpty(boId)){
			acList = boAttrColumnRepository.findByDefId(boId);
			BoDefPo boPo = boDefRepository.get(boId);
			
			String bodsAlias = boPo.getDsAlias();
			if(StringUtil.isNotEmpty(bodsAlias)){
				DataSourcePo dsPo = dataSourceSetService.getByAlias(bodsAlias);
				if(BeanUtils.isEmpty(dsPo)){
					logger.error("数据源【"+bodsAlias+"】不存在！");
					return null;
				}
				DbContextHolder.setDataSource(bodsAlias, dsPo.getDbType());
			}
		}else if(StringUtil.isNotEmpty(dsAlias)){
			DataSourcePo dsPo = dataSourceSetService.getByAlias(dsAlias);
			if(BeanUtils.isEmpty(dsPo)){
				logger.error("数据源【"+dsAlias+"】不存在！");
				return null;
			}
			DbContextHolder.setDataSource(dsAlias, dsPo.getDbType());
		}
		
		List<Column> fieldList = tableMeta.getColumnsByTableName(tableName);
		
		List<FieldConfigPo> rs = TableDataBuilder.buildField(fieldList, acList);
		
		return rs;
	}
	
	/**
	 * 编辑【表配置】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		
		TableConfigPo tableConfig=null;
		if(StringUtil.isNotEmpty(id)){
			tableConfig=tableConfigRepository.loadCascade(id);
			TableConfigBuilder.build(tableConfig);
		}else{
			tableConfig=new TableConfigPo();
			tableConfig.setCreator(ContextUtil.getCurrentUserId());
			tableConfig.setCreateTime(new Date());
		}
		
		List<DataSourcePo> dataSourceList = dataSourceSetService.query(getQuerFilter(request));
		
		return getAutoView()
				.addObject("tableConfig", tableConfig)
				.addObject("dataSourceList", dataSourceList)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【表配置】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		TableConfigPo tableConfig=null;
		if(StringUtil.isNotEmpty(id)){
			tableConfig=tableConfigRepository.loadCascade(id);
			TableConfigBuilder.build(tableConfig);
		}
		return getAutoView().addObject("tableConfig", tableConfig).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【表配置】信息
	 *
	 * @param request
	 * @param response
	 * @param  tableConfig
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			TableConfigPo tableConfigPo = getFromRequest(request);
			if(tableConfigRepository.exsitTableConfig(tableConfigPo.getId(), tableConfigPo.getTableName())){
				message=new ResultMessage(ResultMessage.WARN, "表配置【" + tableConfigPo.getTableName() + "】已存在");
			}else{
				//构造领域对象和保存数据
				TableConfig tableConfig =tableConfigRepository.newInstance(tableConfigPo);
				tableConfig.saveCascade();
				message=new ResultMessage(ResultMessage.SUCCESS, "保存表配置成功");
			}
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对表配置操作失败",e.getMessage());
			logger.error("对表配置操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private TableConfigPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<FieldConfigPo> fieldConfigPoList = getFieldConfigPoList(jsonObj);
		TableConfigPo tableConfigPo = getTableConfigPo(jsonObj);
		tableConfigPo.setFieldConfigPoList(fieldConfigPoList);

		return tableConfigPo;
	}
	
	/** 
	 * 获取表配置数据
	 *
	 * @param jsonObj
	 */
	private TableConfigPo getTableConfigPo(JSONObject jsonObj){
		TableConfigPo tableConfigPo = (TableConfigPo) JsonUtil.getDTO(jsonObj.toString(), TableConfigPo.class);
		return tableConfigPo;
	}
	
	/** 
	 * 获取字段配置数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<FieldConfigPo> getFieldConfigPoList(JSONObject jsonObj){
		List<FieldConfigPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("fieldConfigPoList").toString(), 
													FieldConfigPo.class);
		jsonObj.discard("fieldConfigPoList");
		return rs;
	}
	
	/**
	 *  批量删除【表配置】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			TableConfig tableConfig =tableConfigRepository.newInstance();
			tableConfig.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除表配置成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除表配置失败，" + e.getMessage());
			logger.error("删除表配置失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
