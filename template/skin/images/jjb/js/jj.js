/*我的网址 2011.11.23晴天修改*/
function q$(id){return document.getElementById(id)}
function kk_y(id,m1,m2,m3){
	if(qTcms.U_GetUid()==0){
		User_login()
	}else{
		var mm1,mm2,mm3
		mm1=q$("h_"+id).innerHTML;
		mm2=q$("h_"+id).href;
		mm3=q$("h_"+id).className
		DvWnd.open("自定义网址",qtCms_m1+"?id="+id+"&m1="+escape(mm1)+"&m2="+escape(mm2)+"&m3="+escape(mm3),400,200,1)	
	}
}
//增加一个名站
function kk_y_a(){
	var mm1,mm2,id;
	id=""
	mm1="";
	mm2="";
	DvWnd.open("添加网址",qtCms_m5+"?id="+id+"&m1="+escape(mm1)+"&m2="+escape(mm2),400,200,1)	
}
function kk_y_a_a(v1,v2,v3){
	if(v3=="zt_red")v3=1
	else if (v3=="zt_green")v3=2
	else v3=0
	
	J1616.www.famous._append({data:[v1,v2,v3],id:0})	
}
//用户登陆框
function User_login(){
	//m_login.html	
	DvWnd.open("登陆",qtCms_m2,450,350,1)	
}
//用户注册框
function User_reg(){
	//m_login.html	
	DvWnd.open("用户注册",qtCms_m3,450,350,1)	
}
//用户中心
function User_members(){
	DvWnd.open("用户中心",qtCms_m4,450,350,1)	
}

function User_login_f(){

	window.location.reload();
}