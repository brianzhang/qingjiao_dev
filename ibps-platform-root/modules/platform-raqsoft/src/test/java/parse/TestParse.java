package parse;

import org.json.JSONObject;

import com.runqian.report4.model.ReportDefine;
import com.runqian.report4.usermodel.DataSetConfig;
import com.runqian.report4.usermodel.DataSetMetaData;
import com.runqian.report4.usermodel.Param;
import com.runqian.report4.usermodel.ParamMetaData;
import com.runqian.report4.util.ReportUtils;

public class TestParse {

	public static void main(String[] args) throws Exception {
//		String reportFile = "D:/Program Files (x86)/reportHome/webapps/demo/reportFiles/test1.raq";
		String reportFile = "E:/workspace/ibps/ibps-platform-root/modules/platform-raqsoft/src/main/webapp/reportFiles/rlzyqkb.raq";
		ReportDefine rd = (ReportDefine) ReportUtils.read(reportFile);
		
		
		
	
		
		System.out.println(rd.getJson().toString());
		DataSetMetaData dsmd = rd.getDataSetMetaData();
		
		
		
		System.out.println(">---------------------------------------------<");
		int count = dsmd.getDataSetConfigCount();
		
		for (int i = 0; i < count; i++) {
			DataSetConfig dsc = dsmd.getDataSetConfig(i);
			System.out.println(dsc.getName()+":"+dsc.getDataSourceName());
			JSONObject j = dsc.getJson();
			System.out.println(j.toString());
			System.out.println(j.get("_$1"));
		}
		System.out.println(">----------------------------------------------<");
		

		ParamMetaData pmd = rd.getParamMetaData();

		System.out.println();
		Param p = null;
		for (int i = 0; i < pmd.getParamCount(); i++) {
			p = pmd.getParam(i);
			System.out.println("paramName:" + p.getParamName());
			System.out.println("paramType:" + p.getParamType());
			System.out.println("value:" + p.getValue());
			System.out.println("dataType:" + p.getDataType());
			System.out.println("description:" + p.getDescription());
			System.out.println("format:" + p.getFormat());
			System.out.println("precision:" + p.getPrecision());
			System.out.println("-----------------------------------");
			System.out.println();

		}
	}

}
