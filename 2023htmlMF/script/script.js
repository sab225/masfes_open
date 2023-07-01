window.addEventListener("load", function(){
    //相対パスを絶対パス化するためのルートアドレスを取得
    var path = String(document.getElementById("anker").src).replace("script/initializer.js","");
    //id:news の タグに、./compornents/new.htmlの内容を投影
    $("#news").load(path+"compornents/new.html");
    console.log("fin");
}
);