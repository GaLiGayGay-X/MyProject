<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath }"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>indexPage</title>
<script type="text/javascript" src="${ctx }/staticSource/js/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticSource/js/jquery.ztree.core.min.js"></script>
<script type="text/javascript" src="${ctx }/staticSource/js/bootstrap.js"></script>
<script type="text/javascript" src="${ctx }/staticSource/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticSource/js/global.js"></script>
<link rel="stylesheet" href="${ctx }/staticSource/css/bootstrap.css">
<link rel="stylesheet" href="${ctx }/staticSource/css/metroStyle/metroStyle.css">
<link rel="stylesheet" href="${ctx }/staticSource/css/easyui.css">
<script type="text/javascript" src="${ctx }/staticSource/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${ctx }/staticSource/js/jquery.validate.min.js"></script>
<script type="text/javascript" src="${ctx }/staticSource/js/messages_zh.js"></script>
<style type="text/css">
	.error{
				color: red;
			}
</style>
</head>
<body>
	<div class="row-fluid">
		<div class="col-md-3" style="width: 15%">
			<ul id="ztreeDemo" class="ztree" style="height: 480px; font-size: 12px; padding-bottom: 30px; overflow: auto;"></ul>
		</div>
		<div class="col-md-12" style="height: 480px; width: 85%">
			<form class="form-horizontal form-bordered" action="#">
				<div class="form-body">
					<div class="form-group">
						<div class="col-md-12" style="padding-left: 1px; margin-left: 15px;">
							<div class="col-md-3" style="padding-left: 0px;">
								<input type="text" placeholder="请输入服务资源编号或服务名称" id="searchKey" class="form-control searchBarFom">
							</div>
							<div class="col-md-2">
								<button class="btn btn-success rounded" type="button" id="btn-4" onclick="ServiceBaseTree.query()">
									<i class="fa fa-search"></i>查询
								</button>
								&nbsp;
								<button id="btn-1" class="btn btn-primary rounded" type="reset">
									<i class="fa fa-eraser"></i> 清空
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<table id="dataGrid" style="height: 600px;"></table>
		</div>
	</div>
	<!-- 服务详情  --start -->
	<div id="serviceDetailModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width: 678px; height: 425px; margin-top: 130px;">
				<div class="modal-header" style="background-color: #204D74;">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white;">&times;</button>
					<h4 class="modal-title" id="myModalLabel" style="color: white;">服务详情</h4>
				</div>
				<div class="modal-body" style="margin-bottom: 70px;height: 250px;">
				<table class="table table-bordered" id="baseInfoTab2" style="width: 100%;">
					<tbody>
						<tr>
							<td colspan="6" style="text-align: left">基本信息</td>
						</tr>
						<tr>
							<td style="width: 16%;background-color:#E8E8E8;" align="right">服务编号:</td>
							<td style="width: 32%" colspan="2"><span id="serviceCode2"></span></td>
							<td style="width: 16%;background-color:#E8E8E8;" align="right">服务名称:</td>
							<td style="width: 32%" colspan="2"><span id="serviceName2"></span></td>
						</tr>
						<tr>
							<td style="background-color:#E8E8E8;" align="right">服务类型:</td>
							<td colspan="2"><span id="dicName2"></span></td>
							<td style="background-color:#E8E8E8;" align="right">服务状态:</td>
							<td colspan="2"><span id="serviceStatus2"></span></td>
						</tr>
						<tr>
							<td style="background-color:#E8E8E8;" align="right">操作人:</td>
							<td colspan="2"><span id="operatePerson2"></span></td>
							<td style="background-color:#E8E8E8;" align="right">操作时间:</td>
							<td colspan="2"><span id="operateTime2"></span></td>
						</tr>
						<tr>
							<td style="background-color:#E8E8E8;" align="right">开发语言:</td>
							<td colspan="2"><span id="devLanguage2"></span></td>
							<td style="background-color:#E8E8E8;" align="right">业务条线:</td>
							<td colspan="2"><span id="bizLine2"></span></td>
						</tr>
						<tr>
							<td style="background-color:#E8E8E8;" align="right">专题:</td>
							<td colspan="2"><span id="topicType2"></span></td>
							<td style="background-color:#E8E8E8;" align="right">要素:</td>
							<td colspan="2"><span id="keyElement2"></span></td>
						</tr>
						<tr>
							<td style="background-color:#E8E8E8;" align="right">备注:</td>
							<td colspan="6"><span id="remark"></span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer" style="padding-top: 5px;">
				<button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
			</div>
			</div>
		</div>
	</div>
	<!-- 服务详情  --end -->
	<!-- 服务详修改 --start -->
	<div id="serviceUpdateModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width: 678px; height: 530px; margin-top: 130px;">
				<div class="modal-header" style="background-color: #204D74;">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white">&times;</button>
					<h4 class="modal-title" id="myModalLabel" style="color: white;">服务修改</h4>
				</div>
				<form action="" method="post" id="serviceUpdateForm">
					<div class="modal-body" style="height: 380px;">
						<table class="table table-bordered" id="baseInfoTab2" style="width: 100%;">
							<tbody>
								<tr>
									<td colspan="6" style="text-align: left">基本信息</td>
								</tr>
								<tr>

									<td style="width: 16%; background-color: #E8E8E8;" align="right">服务编号:</td>
									<td style="width: 32%" colspan="2"><input id="serviceCode3" name="serviceCode3" class="form-control" /></td>
									<td style="width: 16%; background-color: #E8E8E8;" align="right">服务名称:</td>
									<td style="width: 32%" colspan="2"><input id="serviceName3" name="serviceName3" class="form-control" /></td>
								</tr>
								<tr>
									<td style="background-color: #E8E8E8;" align="right">服务类型:</td>
									<td colspan="2">
										<select id="dicName3" name="dicName3" class="form-control">
												<option value="1">java</option>
												<option value="2">c++</option>
										</select>
									</td>
									<td style="background-color: #E8E8E8;" align="right">服务状态:</td>
									<td colspan="2">
										<input id="serviceStatus3" name="serviceStatus3" style="width: 100%;" class="form-control" readonly="readonly"/>
									</td>
								</tr>
								<tr>
									<td style="background-color: #E8E8E8;" align="right">操作人:</td>
									<td colspan="2"><input id="operatePerson3" class="form-control" disabled="true" /></td>
									<td style="background-color: #E8E8E8;" align="right">操作时间:</td>
									<td colspan="2"><input id="operateTime3" class="form-control" disabled="true" /></td>
								</tr>
								<tr>
									<td style="background-color: #E8E8E8;" align="right">开发语言:</td>
									<td colspan="2">
										<select id="devLanguage3" name="devLanguage3" class="form-control">
												<option value="JAVA语言">JAVA语言</option>
												<option value="C语言">C语言</option>
										</select>
									</td>
									<td style="background-color: #E8E8E8;" align="right">业务条线:</td>
									<td colspan="2">
										<select id="bizLine3" name="bizLine3" class="form-control">
												<option value="1">java</option>
												<option value="2">c++</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="background-color: #E8E8E8;" align="right">专题:</td>
									<td colspan="2">
										<select id="topicType3" name="topicType3" class="form-control">
												<option value="1">java</option>
												<option value="2">c++</option>
										</select>
									</td>
									<td style="background-color: #E8E8E8;" align="right">要素:</td>
									<td colspan="2">
										<select id="keyElement3" name="keyElement3" class="form-control">
												<option value="1">java</option>
												<option value="2">c++</option>
										</select>
									</td>
								</tr>
								<tr>
									<td style="background-color: #E8E8E8;" align="right">备注:</td>
									<td colspan="6"><input id="remark3" class="form-control" /></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="modal-footer" style="margin-top: 30px;">
						<button class="btn btn-success" type="submit">修改</button>
						<button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- 服务修改  --end -->
	
</body>
<script type="text/javascript"
	src="${ctx }/js/servicebasetree/ServiceBaseTree.js"></script>
</html>
