/*
 * ヘッダー動的読み込み
 */
function LoadHeader(){
    var path = String(document.getElementById("anker").src);
    console.log("Loading header from " + path.replace("script/pc/initializer_pc.js","compornents/menubar_pc.html"));
    var header = document.createElement("div");
    header.id = "header-livwppxsss"
    document.getElementsByTagName("body")[0].prepend(header);
    header = document.createElement("div");
    header.style.height = "52px"
    document.getElementsByTagName("body")[0].prepend(header);
    $("#header-livwppxsss").load(path.replace("script/pc/initializer_pc.js","compornents/menubar_pc.html"));
}

//読み込み
LoadHeader();