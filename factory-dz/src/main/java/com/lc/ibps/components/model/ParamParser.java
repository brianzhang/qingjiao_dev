package com.lc.ibps.components.model;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.lc.ibps.components.model.interfaces.AbstractParam;
import com.utils.Json2Po;

import net.sf.json.JSONArray;

public class ParamParser {
	public static void parse(JSONArray ja,Class T,Map args){
		List<AbstractParam> li = Json2Po.parse(ja, T);
		ExecutorService pool = Executors.newFixedThreadPool(9);
		for(AbstractParam ap:li){
			pool.submit(new ParamThread(ap,args));
		}
	}
}
class ParamThread implements Runnable {
	Map args;
	AbstractParam ap;
	public ParamThread(AbstractParam ap,Map args){
		this.args = args;
		this.ap = ap;
	}
	@Override
	public void run() {
		ap.translate(args);
	}
}

