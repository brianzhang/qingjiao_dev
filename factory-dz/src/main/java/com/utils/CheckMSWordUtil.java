package com.utils;


import java.io.File;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;


public class CheckMSWordUtil {

	MainAlgorithm l = new MainAlgorithm();
	
	public String read(String filePath){
		return l.readWord(filePath);
	}
	/**
	 * 查重主方法,将查重结果保存至outPath,查重将相似度大于0.6的文件返回
	 * @param filePath
	 * @param outPath
	 */
	public JSONArray checkRepeat(String filePath) {
		String[] text = null;// 存储学生论文的字符串数组
		String[] name = null;// 存储学生姓名等信息
		Object[] object = null;// 存储学生论文相似的学生信息
		File[] f = new File(filePath).listFiles();
		name = new String[f.length];
		for (int i = 0; i < f.length; i++) {
			name[i] = f[i].getName();
		}
		text = new String[f.length];
		text = l.readWord(filePath, name);
		object = l.EDcalculate(text, name);// **
		return l.getCheckInfo(object);
	}
	
	/**
	 * 比较列表中文件重复度
	 * @param filePath
	 * @param outPath
	 */
	public JSONArray checkRepeat(List<String> filePathList) {
		String[] text = null;// 存储学生论文的字符串数组
		String[] name = null;// 存储学生姓名等信息
		Object[] object = null;// 存储学生论文相似的学生信息
		name = new String[filePathList.size()];
		for (int i = 0; i < filePathList.size(); i++) {
			name[i] = new File(filePathList.get(i)).getName();
		}
		
		text = new String[filePathList.size()];
		text = l.readWord(filePathList);
		object = l.EDcalculate(text, name);// **
		return l.getCheckInfo(object);
	}
	
	/**
	 * 计算文档字数
	 */
	public int count(String filePath){
		String text = "";// 存储学生论文的字符串数组
		text = l.readWord(filePath);
		return getMSWordsCount(text);
	}
	private  int getMSWordsCount(String context){
        int words_count = 0;
        //中文单词
        String cn_words = context.replaceAll("[^(\\u4e00-\\u9fa5，。《》？；’‘：“”【】、）（……￥！·)]", "");
        int cn_words_count = cn_words.length();
        //非中文单词
        String non_cn_words = context.replaceAll("[^(a-zA-Z0-9`\\-=\';.,/~!@#$%^&*()_+|}{\":><?\\[\\])]", " ");
        int non_cn_words_count = 0;
        String[] ss = non_cn_words.split(" ");
        for(String s:ss){
        if(s.trim().length()!=0) non_cn_words_count++;
        }
        //中文和非中文单词合计
        words_count = cn_words_count + non_cn_words_count;
        return words_count;
    }
}
