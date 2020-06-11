

/*
    回调函数
*/



function e(m,n,Callback){  

    var d = m+n;  

    console.log("一个从父函数e 产生的参数将要被传递给回调函数 ，这个参数是:"+d);  

     

    //这里才写你想调用的函数---参数要正确  

    Callback(d);   

}  

function callback(data){  

        console.log("我是回调函数，我的名字叫:callback ,我接收到来自父函数的参数，参数是:"+data);   

}

e(1,2,callback)  
