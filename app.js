const { Chart } = require("chart.js")
const messagePerDay = require("./stats")
const utils = require("./utils")

const colorScheme = [
    "#25CCF7", "#FD7272", "#54a0ff", "#00d2d3",
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e",
    "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6",
    "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d",
    "#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#dfe6e9",
    "#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#ffeaa7",
    "#fab1a0", "#ff7675", "#fd79a8", "#fdcb6e", "#e17055",
    "#d63031", "#feca57", "#5f27cd", "#54a0ff", "#01a3a4"
]

document.getElementById("import").onclick = () => {
    let files = document.getElementById("selectFiles").files

    if (files.length === 0) {
        if ($("#error").length === 0) {
            $("body").append("<h6 id='error'>No file selected.</h6>")
        }
    } else {
        if ($("#error").length > 0) {
            $("#error").remove()
        }

        //Clean the JSON files because they are incorrectly encoded and merge them into one file.
        new Promise(resolve => utils.cleanData(files, resolve)).then(data => {
            if ($("#charts").length === 0) {
                $("body").append("<div id='charts'><canvas id='msgPerDay' width='300' height='100'></canvas></div>")
                const msgPerDayCtx = document.getElementById("msgPerDay").getContext("2d")
                let msgPerDayData = messagePerDay(data)
                const msgPerDayLabels = msgPerDayData[0]

                const datasets = []
                for (let i = 0; i < data["participants"].length; i++) {
                    datasets.push({
                        label: data["participants"][i]["name"],
                        data: msgPerDayData[1].map((value, index) => { return value[i] }),
                        fill: true,
                        backgroundColor: utils.hexToRgbA(colorScheme[i], 0.4),
                        borderColor: utils.hexToRgbA(colorScheme[i], 0.5)
                    })
                }

                const msgPerDayChartData = {
                    labels: msgPerDayLabels,
                    datasets: datasets
                }

                const config = {
                    type: "line",
                    data: msgPerDayChartData,
                    options: {}
                }

                const msgPerDayChart = new Chart(msgPerDayCtx, config)
            } else {
                let msgPerDayData = messagePerDay(data)
                const msgPerDayChart = Chart.getChart("msgPerDay")
                msgPerDayChart.data.labels = msgPerDayData[0]

                const datasets = []
                for (let i = 0; i < data["participants"].length; i++) {
                    datasets.push({
                        label: data["participants"][i]["name"],
                        data: msgPerDayData[1].map((value, index) => { return value[i] }),
                        fill: true,
                        backgroundColor: utils.hexToRgbA(colorScheme[i], 0.4),
                        borderColor: utils.hexToRgbA(colorScheme[i], 0.5)
                    })
                }

                msgPerDayChart.data.datasets = datasets
                msgPerDayChart.update()
            }
        })
    }
}