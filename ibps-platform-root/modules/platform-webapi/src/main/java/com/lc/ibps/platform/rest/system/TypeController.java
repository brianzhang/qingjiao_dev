package com.lc.ibps.platform.rest.system;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.springframework.stereotype.Controller;

import com.lc.ibps.api.base.entity.WebAPIResult;
import com.lc.ibps.api.common.cat.model.IType;
import com.lc.ibps.api.common.cat.service.ITypeService;
import com.lc.ibps.base.core.util.AppUtil;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
/**
 * 系统分类标识接口
 *
 * <pre> 
 * 构建组：ibps-platform-webapi
 * 作者：zhongjh
 * 邮箱：zjh20140614@163.com
 * 日期：2017年8月28日-下午6:13:53
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Path("/webapi/typeService")
@Api(value = "/typeService",description="类型服务")
@Controller
public class TypeController {
	
	ITypeService typeService;
	
	public TypeController(){
		typeService = AppUtil.getBean(ITypeService.class);
		
	}
	
	@Path("/getTypes")
	@ApiOperation(value = "系统分类类型", notes = "系统分类类型")
	@POST
	public WebAPIResult getTypeByTypeId(
			@FormParam("catKey") @ApiParam(value = "系统分类key值", required = true) String catKey){
		WebAPIResult result = new WebAPIResult();
		List<IType> typePo = typeService.getByCatKey(catKey);
		result.setData(typePo);
		result.setResult(WebAPIResult.SUCCESS);
		result.setMessage("获取系统分类类型成功！");
		return result;
	}
	
}
