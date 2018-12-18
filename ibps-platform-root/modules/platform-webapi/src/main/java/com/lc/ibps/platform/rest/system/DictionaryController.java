package com.lc.ibps.platform.rest.system;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.common.cat.constants.CategoryConstants;
import com.lc.ibps.api.common.cat.model.IDictionary;
import com.lc.ibps.api.common.cat.model.IType;
import com.lc.ibps.api.common.cat.service.IDictionaryService;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.common.cat.service.impl.DefaultTypeService;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;

/**
 * 数据字典接口
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年8月31日-上午11:48:09
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/dictionaryService")
@Api(value = "/dictionaryService",description="数据字典服务")
@Controller
public class DictionaryController {
	
	private IDictionaryService dictionaryService;
	private DefaultTypeService typeService;
	
	public DictionaryController(){
		dictionaryService = AppUtil.getBean(IDictionaryService.class);
		typeService = AppUtil.getBean(DefaultTypeService.class);
	}
	
	@Path("/getValByTypeKey")
	@ApiOperation(value = "获取数据字典值", notes = "数据字典服务")
	@GET
	public WebAPIResult getValByTypeKey(
			@QueryParam("type") @ApiParam(value = "分类表key值", required = true) String type,
			@QueryParam("key") @ApiParam(value = "数据字典表key值", required = true) String key){
		WebAPIResult result = new WebAPIResult();
		String name = dictionaryService.getLabelByKey(type, key);
		result.setData(name);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("获取数据字典值成功！");
		return result;
	}
	
	@Path("/getDicByType")
	@ApiOperation(value = "获取数据字典", notes = "数据字典服务")
	@GET
	public WebAPIResult getDicByType(
			@QueryParam("type") @ApiParam(value = "分类表key值", required = true) String type){
		WebAPIResult result = new WebAPIResult();
		List<IDictionary> data = dictionaryService.findByType(type);
		result.setData(data);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("获取数据字典成功！");
		return result;
	}
	
	
	@Path("/getDicInfo")
	@ApiOperation(value = "获取数据字典类型", notes = "数据字典服务")
	@GET
	public WebAPIResult getDicInfo(
			@QueryParam("typeKey") @ApiParam(value = "分类表key值", required = true) String typeKey){
		WebAPIResult result = new WebAPIResult();
		IType data = typeService.getByCategoryKeyAndTypeKey(CategoryConstants.CAT_DIC.key(), typeKey);
		result.setData(data);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("获取数据字典类型成功！");
		return result;
	}
	
}
