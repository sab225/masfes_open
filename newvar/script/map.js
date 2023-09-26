$(() => {
    $(function(){
        $('.contents').each(function(i, elem){
            var contentsPOS = $(elem).offset().top;
            $(window).on('load scroll resize', function(){
                var winHeight = $(window).height();
                var scrollTop = $(window).scrollTop();
                var showClass = 'show';
                var timing = 100;
                if (scrollTop >= contentsPOS - winHeight + timing){
                  $(elem).addClass(showClass);
                } else {
                  $(elem).removeClass(showClass);
                }
            });
        });
    });

})

/*消しても問題ない
$(() => {
    let floor = 5;
    $("#map-iframe").on("load",() => {
        $("#map-iframe").contents().find("*[stroke]").each((index, element) => {
            let color = $(element).attr("stroke");
            color = invertRgb(color);
            $(element).attr("stroke",color);
        });
        $("#map-iframe").contents().find('svg > g > g:first-child > g:first-child > path').each((index, element) => {
            let color = $(element).attr("fill");
            if(color == "#ffffff"){
                color = invertRgb(color);
            }
            $(element).attr("fill",color);
        });
    });
    $("#zoom").on("input",() => {
        let value = $("#zoom").val();
        $("#map-iframe").contents().find("svg").css({
            "width": value + "%",
            "height": value + "%"
        });
    });
    $("#map-down").click(() => {
        if (floor != 1) {
            let i = 0;
            const intervalId = setInterval(() => {
                $("#map-iframe").contents().find("#" + (floor + 1) + "F").css({
                    //"transform": "translate(0,-" + i +"%)",
                    "opacity": (100 - 2* i) / 100
                });
                console.log(i);
                if (i >= 100) {
                    clearInterval(intervalId);
                }
                i += 1;
            }, 1);
            floor --;
        }
    })
});

function invertRgb(color) {
    console.log(color)
    if (color !== undefined){
        for (let j = 1; j < 6; j += 2) {
            let temp = parseInt(color.substr(j , 2) ,16);
            temp = 255 - temp;
            temp = temp.toString(16);
            color = color.substring(0,j) + temp + color.substring(j + 2, 6);
        }
        return color;
    }
}*/