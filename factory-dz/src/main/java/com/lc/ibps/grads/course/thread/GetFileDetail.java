package com.lc.ibps.grads.course.thread;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;

import com.lc.ibps.grads.course.repository.JobStdRepository;

public class GetFileDetail implements Callable<Map<String,String>> {
	private JobStdRepository j;
	private String f;
	private String i;
	
	public GetFileDetail(String i,JobStdRepository j , String f) {
		this.i=i;
		this.j = j;
		this.f = f;
	}
	@Override
	public Map call() throws Exception {
		Map<String, String> res = new HashMap<String,String>();
		res.put(i, j.getFileText(f));
		return res;
	}

}
