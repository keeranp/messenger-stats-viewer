const utils = require("./utils")

const createChartDatasets = (chartData, fileData) => {
    const datasets = []

    for (let i = 0; i < fileData["participants"].length; i++) {
        datasets.push({
            label: fileData["participants"][i]["name"],
            data: chartData.map((value, index) => { return value[i] }),
            fill: true,
            backgroundColor: utils.hexToRgbA(utils.colorScheme[i], 0.4),
            borderColor: utils.hexToRgbA(utils.colorScheme[i], 0.5)
        })
    }

    return datasets
}

const createMessagePerDayChart = (msgPerDayData, fileData) => {
    $("body").append("<div id='charts'><canvas id='msgPerDay' width='300' height='100'></canvas></div>")
    const msgPerDayCtx = document.getElementById("msgPerDay").getContext("2d")

    const msgPerDayChartData = {
        labels: msgPerDayData[0],
        datasets: createChartDatasets(msgPerDayData[1], fileData)
    }

    const config = {
        type: "line",
        data: msgPerDayChartData,
        options: {}
    }

    const msgPerDayChart = new Chart(msgPerDayCtx, config)
}

const updateMessagePerDayChart = (msgPerDayData, fileData) => {
    const msgPerDayChart = Chart.getChart("msgPerDay")
    msgPerDayChart.data.labels = msgPerDayData[0]
    msgPerDayChart.data.datasets = createChartDatasets(msgPerDayData[1], fileData)
    msgPerDayChart.update()
}

module.exports = { createMessagePerDayChart, updateMessagePerDayChart }