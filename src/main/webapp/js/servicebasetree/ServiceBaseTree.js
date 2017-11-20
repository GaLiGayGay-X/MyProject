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
						}
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
								titlt : '基础服务列表',
								url : contextPath + "/getAllService",
								striped : true,// 隔行换色
								queryParams : {
									enumId : id,
									treeLayer :layer
								},
								rownumbers : true,
								fitColumns : true,
								loader : $.easyuiloader,
								singleSelect : true, //设置单选
								nowrap : true, //控制显示内容不换行
								pagination : true, //发送page(页码，起始值为1)，rows(每页显示行数)
								loadMsg : '正在加载,请稍后......',
								columns : [ [
										{field : 'serviceId',hidden : true},
										{field : 'service_Id',checkbox : true},
										{field : 'serviceCode',title : '服务资源编号',align : 'center',halign : 'center',width : '15%',formatter : famt},
										{field : 'serviceName', title : '服务名称', align : 'center', halign : 'center', width : '15%', formatter : famt},
										{field : 'dicname', title : '服务类型', align : 'center', halign : 'center', width : '15%', formatter : famt},
										
										{field : 'isEnable',title : '服务状态', align : 'center', width : '10%',formatter : famt},
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
										{field : 'operateTime', title : '注册时间', align : 'center', width : '15%', formatter : famt},
										{field : 'operation', title : '操作', align : 'center', width : '18%',
											formatter : function(value, row,
													index) {
												var str = '';
												// 注册状态
												str += '<span class="btn_ico_css" title="详情" onclick="ServiceBaseTree.serviceDetailShow(\''
														+ row.serviceId
														+ '\')"><i  class="glyphicon glyphicon-th-list"></i></span>&nbsp;&nbsp;';
												str += '<span class="btn_ico_css" title="修改" onclick="ServiceBaseTree.updateServiceBaseModal(\''
														+ row.serviceId
														+ '\');"><i  class="glyphicon glyphicon-cog"></i></span>&nbsp;&nbsp;';

												str += '<span class="btn_ico_css" title="发布" onclick=""><i  class="glyphicon glyphicon-ok"></i></span>&nbsp;&nbsp;';
												str += '<span class="btn_ico_css" title="删除" onclick="serviceDeleteObj.singleDeleteService(\''
														+ row.serviceId
														+ '\')"><i  class="glyphicon glyphicon-trash"></i></span>';

												str += '<span class="btn_ico_css"  title="启用" onclick=""><i class="glyphicon glyphicon-play"></i></span>&nbsp;&nbsp;';

												str += '<span class="btn_ico_css"  title="停用" onclick=""><i class="glyphicon glyphicon-stop"></i></span>&nbsp;&nbsp;';

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
		
		serviceDetailShow : function(serviceId){
			$("#serviceDetailModal").modal("show");
			$.ajax({
				type: "post",
				dataType: "json",
				data:{"id":serviceId},
				url: contextPath+"/getServiceBaseById",
				success : function(data){
					$("#serviceCode2").text(data.serviceCode);
					$("#serviceName2").text(data.serviceName);
					$("#dicName2").text(data.dicName);
					$("#serviceStatus2").text(data.serviceStatus);
					$("#operatePerson2").text(data.operatePerson);
					$("#operateTime2").text(data.operateTime);
					$("#devLanguage2").text(data.devLanguage);
					$("#bizLine2").text(data.bizLine);
					$("#topicType2").text(data.topicType);
					$("#keyElement2").text(data.keyElement);
					$("#remark").text(data.remark);
				},
				error :function(data){
					alert("请求错误......");
				}
			});
		},
		updateServiceBaseModal : function(serviceId){
			
			$.ajax({
				type: "post",
				dataType: "json",
				data:{"id":serviceId},
				url: contextPath+"/getServiceBaseById",
				success : function(data){
					$("#serviceUpdateModal").modal("show");
					$("#serviceCode3").val(data.serviceCode);
					$("#serviceName3").val(data.serviceName);
					$("#dicName3").val(data.dicName);
					$("#serviceStatus3").val(data.serviceStatus);
					$("#operatePerson3").val(data.operatePerson);
					$("#operateTime3").val(data.operateTime);
					$("#devLanguage3").val(data.devLanguage);
					$("#bizLine3").val(data.bizLine);
					$("#topicType3").val(data.topicType);
					$("#keyElement3").val(data.keyElement);
					$("#remark3").val(data.remark);
				},
				error :function(data){
					alert("请求错误......");
				}
			});
		}
	}
}();
ServiceBaseTree.init();