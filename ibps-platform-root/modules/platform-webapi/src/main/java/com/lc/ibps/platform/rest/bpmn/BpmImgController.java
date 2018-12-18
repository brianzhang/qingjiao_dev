package com.lc.ibps.platform.rest.bpmn;

import java.io.InputStream;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.bpmn.api.service.DiagramService;


/**
 * 流程定义 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：caij@bpmhome.cn
 * 创建时间：2017-08-30 9:37:25
 * </pre>
 */
@Controller("bpmImgRest")
@RequestMapping("/api/webapi/bpmImage")
public class BpmImgController extends GenericController {

	@Resource
	private DiagramService diagramService;
	
	/**
	 * 生成流程图
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("gen")
	public void gen(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		
		String defId = RequestUtil.getString(request, "defId","");
		String bpmnInstId =  RequestUtil.getString(request, "bpmnInstId","");
		String taskId =  RequestUtil.getString(request, "taskId","") ;
		
		InputStream is = diagramService.genImage(defId,bpmnInstId,taskId);
		
		this.reInputStream(is, reponse, "image/png");
	}
	
}
