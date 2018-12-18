package com.lc.ibps.grads.course.thread;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

import com.lc.ibps.base.web.util.AppFileUtil;
import com.lc.ibps.grads.course.persistence.entity.JobStdPo;
import com.lc.ibps.grads.course.persistence.entity.JobStdTbl;
import com.utils.CheckMSWordUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class CheckRepeat implements Callable<JSONObject> {
	private JobStdPo jsp;
	private String path;
	
	public CheckRepeat(JobStdPo jsp , String path) {
		this.jsp = jsp;
		this.path = path;
	}
	@Override
	public JSONObject call() throws Exception {
		String[] t = JobStdTbl.parseFile(jsp.getFile());
		try{
			List<String> paths = new ArrayList();
			paths.add(path);
			paths.add( AppFileUtil.getBasePath() + jsp.getFilePath().substring(1));
			CheckMSWordUtil cru = new CheckMSWordUtil();
			JSONArray ja = cru.checkRepeat(paths);
			if(ja.size()==1){
				return (JSONObject) ja.get(0);
			}
			return null;
		}catch(Exception e){
			e.getStackTrace();
			return null;
		}
		
	}

}
