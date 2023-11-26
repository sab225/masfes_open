const output929 = document.getElementById("t_timetable929");
const output930 = document.getElementById("t_timetable930");
const tableOuter = document.getElementById("t_tableOuter");
const buttonBefore = document.getElementById("t_selectBefore");
const buttonAfter = document.getElementById("t_selectAfter");
const showDate = document.getElementById("t_date");

// ここに[t_dateに表示する日時, ファイルのパス, 出力するタグ]の順にデータを記述
const csvData = [
    ["2023年 9月 30日(土)", "/newvar/script/timetables/930.csv", output929],
    ["2023年 10月 1日(日)", "/newvar/script/timetables/931.csv", output930]
]

csv_data(csvData);

// CSVを読み込んでタグとして表示する関数
function csv_data(data) {
    let progress = 0;

    for (let i = 0; i < data.length; i++) {
        const request = new XMLHttpRequest();
        request.open("GET", data[i][1], true);
        request.send();
        request.addEventListener("load", function (e) {
            // CSVファイルの中身から<table>の中身を作成する
            const response = e.target.responseText;
            const dataArray = [];
            // 改行で区切ったり、余分なスペースを消したりする
            const dataString = response.split("\n");
            for (let i = 0; i < dataString.length; i++) {
                dataArray[i] = dataString[i].split(/,|[\r]/);
                // if(i != dataString.length - 1) {
                //     dataArray[i].pop();
                // }
            }
            // タグにする
            let insertElement = "";
            for (let i = 0; i < dataArray.length; i++) {
                insertElement += "<tr>";
                for (let j = 0; j < dataArray[i].length; j++) {
                    let span = "";
                    let resultString = "";
                    let classes = "";
                    // 文字列から$w,$hとその値を抽出し、colspan,rowspanを調整する
                    // はみ出る<td>がでないように調整する
                    if (dataArray[i][j].match(/^\$w/)) {
                        const elementWidth = dataArray[i][j].slice(2, 3);
                        span = " colspan=" + elementWidth;
                        resultString = dataArray[i][j].slice(3);
                        dataArray[i].length -= elementWidth - 1;
                    } else if (dataArray[i][j].match(/^\$h/)) {
                        const elementHeight = dataArray[i][j].slice(2, 3);
                        span = " rowspan=" + elementHeight;
                        resultString = dataArray[i][j].slice(3);
                        for (let k = 1; k < elementHeight; k++) {
                            dataArray[i + k][j] = "cannotSeeThis";
                        }
                    } else {
                        resultString = dataArray[i][j];
                    }
                    if (resultString == "cannotSeeThis") {
                        classes += " style=\"display:none;\"";
                    }

                    // 予定が書かれているタグと場所の欄は色付け
                    if (j > 0 && resultString != "") {
                        const hue = (j - 1) * 40;
                        const saturation = Math.min(i, 1) * -60 + 100;
                        const luminousity = Math.min(i, 1) * 25 + 30;
                        classes += " style=\"background-color:hsl(" + hue + ", " + saturation + "%, " + luminousity + "%);\"";
                        if (i > 0) {
                            classes += " class=\"t_contents\"";
                        }
                    }
                    insertElement += "<td" + span + classes + ">" + resultString + "</td>";
                }
                insertElement += "</tr>";
            };
            data[i][2].innerHTML = insertElement;
            // <table>の中身作成ここまで

            // ページを一つ読み込んだら、progressを1加算
            progress++;

            // progress = CSV_Dataの長さ（＝すべてのファイルが読み込まれ、タグ化されたなら）処理を実行
            if (progress == data.length) {
                // 選択ボタンを押したときの処理諸々
                let selection = 0;
                executeSlide(selection);

                buttonBefore.addEventListener("click", function () {
                    selection -= 1;
                    executeSlide(selection);
                })

                buttonAfter.addEventListener("click", function () {
                    selection += 1;
                    executeSlide(selection);
                })

                function executeSlide() {
                    selection = Math.min(Math.max(selection, 0), csvData.length - 1);
                    tableOuter.style.height = csvData[selection][2].offsetHeight + "px";
                    showDate.innerHTML = csvData[selection][0];
                    for (let i = 0; i < csvData.length; i++) {
                        csvData[i][2].style.transform = "translateX(" + (i - selection) * 100 + "%)";
                    }
                }
            }
        });
    }
}