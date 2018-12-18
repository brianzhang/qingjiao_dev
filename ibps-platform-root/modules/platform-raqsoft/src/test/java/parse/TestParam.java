package parse;

import com.runqian.report4.model.ReportDefine;
import com.runqian.report4.usermodel.Param;
import com.runqian.report4.usermodel.ParamMetaData;
import com.runqian.report4.util.ReportUtils;

public class TestParam {
	public static void main(String[] args) throws Exception {
		String reportFile = "D:/Program Files (x86)/reportHome/webapps/demo/reportFiles/param.raq";
		ReportDefine rd = (ReportDefine) ReportUtils.read(reportFile);

		System.out.println(rd.getJson().toString());

		System.out.println(">----------------------------------------------<");

		ParamMetaData pmd = rd.getParamMetaData();

		System.out.println();
		Param p = null;
		for (int i = 0; i < pmd.getParamCount(); i++) {
			p = pmd.getParam(i);
			System.out.println("paramName:" + p.getParamName());
			System.out.println("paramType:" + p.getParamType());
			System.out.println("dataType:" + p.getDataType());
			System.out.println("description:" + p.getDescription());
			System.out.println("format:" + p.getFormat());
			System.out.println("precision:" + p.getPrecision());
			System.out.println("-----------------------------------");
			System.out.println();

		}
	}

}
