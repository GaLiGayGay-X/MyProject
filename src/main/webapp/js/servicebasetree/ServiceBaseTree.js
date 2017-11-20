var ServiceBaseTree = function() {
	var contextPath = UI.handleBaseURL();
	var treeLayer2 = null;
	var treeId = null;
	return {
		init : function() {
			this.treeInit();
			this.initGrid();
		},
		treeInit : function() {
			var zNodes = [];
			var setting = {
				data : {
					simpleDate : {
						enable : true,
/*						idKey : id,
						pIdKey : pId,
						rootPid : 0,
*/					}
				},

				async : {
					enable : true,
					isParent : true,
					url : contextPath + "/ztreeController/getServiceTypeTree",
					autoParam : ["id", "name", "level"],
					otherParam : {
						"otherParam" : "zTreeAsyncTest"
					},
					type : 'post',
				},
				callback : {
					onAsyncSuccess : function(event, id, zNodes, msg) {
							var treeObj = $.fn.zTree.getZTreeObj(id);
							var node = treeObj.getNodeByParam("isParent", true, null);
							treeObj.expandNode(node, true, false , true);
					},
					onClick : function(event, id, zNodes) {
						ServiceBaseTree.initGrid(zNodes.id, zNodes.name, zNodes.level);
						treeId = zNodes.id;
						treeLayer2 = zNodes.level;
					}
				},
			};
			$.fn.zTree.init($("#ztreeDemo"), setting, zNodes);
		},
		
		
		initGrid : function(id, name, layer) {
			function famt(value, row, index) {
				if (value != undefined) {
					return "<span title='" + value + "'>" + value + "</span>";
				}
			}
			$("#dataGrid")
					.datagrid(
							{
								url : contextPath + "/getAllService",
								striped : true,// 隔行换色
								queryParams : {
									enumId : id,
									treeLayer :layer
								},
								rownumbers : true,
								fitColumns : true,
								loader : $.easyuiloader,
								pagination : true,
								loadMsg : '正在加载......',
								columns : [ [
										{field : 'serviceId',hidden : true},
										{field : 'service_Id',checkbox : true},
										{field : 'serviceCode',title : '服务资源编号',align : 'center',halign : 'center',width : '18%',formatter : famt},
										{field : 'serviceName', title : '服务名称', align : 'center', halign : 'center', width : '15%', formatter : famt},
										{field : 'dicname', title : '服务类型', align : 'center', halign : 'center', width : '15%', formatter : famt},
										
										{field : 'isEnable',title : '服务状态', align : 'center', width : '10%',
											formatter : function(value, row,
													index) {
												var str = '';
												if (value != undefined) {
													if (row.isEnable == '0') {
														return "<img alt='未启用' src='"
																+ contextPath
																+ "/static/common/images/tixing_r.gif' />";
													} else if (row.isEnable == '1') {
														return "<img alt='启用' src='"
																+ contextPath
																+ "/static/common/images/tixing_g.gif' />";
														;
													}
												}
												return str;
											}
										},
										{field : 'serviceStatus', title : '服务流程状态', align : 'center', width : '10%',
											formatter : function(value, row,
													index) {
												var str = '';
												if (value != undefined) {
													if (row.serviceStatus == '1') {
														str += "注册";
													} else if (row.serviceStatus == '2') {
														str += "发布";
													}
												}
												return str;
											}
										},
										{field : 'operateTime', title : '注册时间', align : 'center', width : '12%', formatter : famt},
										{field : 'operation',title : '操作',align : 'center',width : '20%',
											formatter : function(value, row,
													index) {
												var str = '';
												// 注册状态
												str += '<span class="btn_ico_css" title="详情" onclick="serviceDetailObj.showDetailModal(\''
														+ row.serviceId
														+ '\')"><i  class="glyphicon glyphicon-th-list"></i></span>&nbsp;&nbsp;';
												str += '<span class="btn_ico_css" title="修改" onclick="serviceUpdate.updateService('
														+ index
														+ ');"><i  class="glyphicon glyphicon-cog"></i></span>&nbsp;&nbsp;';
												if (row.serviceStatus == '1') {
													str += '<span class="btn_ico_css" title="发布" onclick=""><i  class="glyphicon glyphicon-ok"></i></span>&nbsp;&nbsp;';
													str += '<span class="btn_ico_css" title="删除" onclick="serviceDeleteObj.singleDeleteService(\''
															+ row.serviceId
															+ '\')"><i  class="glyphicon glyphicon-trash"></i></span>';
												} else if (row.serviceStatus == '2') {
													if (row.isEnable == '0') {
														str += '<span class="btn_ico_css"  title="启用" onclick=""><i class="glyphicon glyphicon-play"></i></span>&nbsp;&nbsp;';
														str += '<span class="btn_ico_css" title="删除" onclick="serviceDeleteObj.singleDeleteService(\''
																+ row.serviceId
																+ '\')"><i  class="glyphicon glyphicon-trash"></i></span>';
													} else if (row.isEnable == '1') {
														str += '<span class="btn_ico_css"  title="停用" onclick=""><i class="glyphicon glyphicon-stop"></i></span>&nbsp;&nbsp;';
													}
												}
												return str;
											}
										} ] ],
								onLoadSuccess : function() {
									$("#dataGrid").datagrid("resize");
								},

							});
		},
		query : function(){
			var params = {};
			params.searchKey = $("#searchKey").val();
			params.enumId = treeId;
			params.treeLayer = treeLayer2;
			$("#dataGrid").datagrid("load",params);
		},
	}
}();
ServiceBaseTree.init();