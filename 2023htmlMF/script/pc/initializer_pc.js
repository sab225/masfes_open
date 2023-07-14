/*
 * Jqueryの読み込み
 */
function JqueryLoader(){
    console.log("Loading jquery...");
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.src = "https://code.jquery.com/jquery-3.7.0.min.js"
    script.integrity = "sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
}
//読み込み
JqueryLoader();

/*
 * 必須コンポーネントの読み込み
 */
window.addEventListener("load", function(){
    console.log("Loading...");
    var path = document.getElementById("anker").src;
    const nessesaryModules = [
        [String(path).replace("initializer_pc.js","importer.js"),"",""]
    ]//src,integrity,crossorigin　の順
    nessesaryModules.forEach(function (element){
        var script = document.createElement("script")
        script.type = "text/javascript";
        script.src = element[0];
        if(element[1]){
            script.integrity = element[1];
        }
        if(element[2]){
            script.crossOrigin = element[2];
        }
        document.body.prepend(script);
        console.log("Add:"+element[0]);
    })
    var script = document.createElement("style")
        script.rel = "stylesheet";
        script.src = String(path).replace("script/pc/initializer_pc.js","style/color.css");
        
  });