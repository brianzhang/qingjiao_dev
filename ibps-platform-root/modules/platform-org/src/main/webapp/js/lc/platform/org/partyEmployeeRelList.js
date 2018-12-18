$("#fullName,#btnSelect").on("click", function(event){
	new PersonDialog({
		isSingle: true, //是否单选
		callback : function(userIds, fullNames) {
			$("#id").val(userIds.join(","));
			$("#fullName").val(fullNames.join(","));

			var underFrame = $("iframe", $("#tab-1"));
			underFrame.attr("src", __ctx + "/platform/org/partyEmployee/underList.htm?id=" + userIds.join(","));
			var superFrame = $("iframe", $("#tab-2"));
			superFrame.attr("src", __ctx + "/platform/org/partyEmployee/superiorList.htm?id=" + userIds.join(","));
		}
	}).show();
});

$("#btnClear").on("click", function(event){
	$("#id").val("");
	$("#fullName").val("");
//	var underFrame = $("iframe", $("#tab-1"));
//	underFrame.attr("src", __ctx + "/platform/org/partyEmployee/underList.htm?id=");
//	var superFrame = $("iframe", $("#tab-2"));
//	superFrame.attr("src", __ctx + "/platform/org/partyEmployee/superiorList.htm?id=");
});