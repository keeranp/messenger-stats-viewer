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
    $("#charts").append("<canvas id='msgPerDay' width='300' height='100'></canvas>")
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

const createTimeBetweenMessageInfo = (timeBetweenMessageData, fileData) => {
    $("#charts").append("<div id='timeBetweenMessage'></div>")
    $("#timeBetweenMessage").append("<h2>Time between two messages</h2>")

    for (let i = 0; i < timeBetweenMessageData[0].length; i++) {
        //Longuest
        let daysLong = Math.floor(timeBetweenMessageData[0][i] / 86400)
        timeBetweenMessageData[0][i] -= daysLong * 86400

        let hoursLong = Math.floor(timeBetweenMessageData[0][i] / 3600)
        timeBetweenMessageData[0][i] -= hoursLong * 3600

        let minutesLong = Math.floor(timeBetweenMessageData[0][i] / 60)

        //Average
        let daysAverage = Math.floor(timeBetweenMessageData[1][i] / 86400)
        timeBetweenMessageData[1][i] -= daysAverage * 86400

        let hoursAverage = Math.floor(timeBetweenMessageData[1][i] / 3600)
        timeBetweenMessageData[1][i] -= hoursAverage * 3600

        let minutesAverage = Math.floor(timeBetweenMessageData[1][i] / 60)

        let className = fileData["participants"][i]["name"].replaceAll(' ', '-')

        $("#timeBetweenMessage").append("<h3 class='" + className + "'" + ">" + fileData["participants"][i]["name"] + "</h3>")
        $("#timeBetweenMessage").append("<p class='" + className + "-longuest" + "'" + ">Longuest time between two messages: " + daysLong + " days, " + hoursLong + " hours and " + minutesLong + " minutes." + "</p>")
        $("#timeBetweenMessage").append("<p class='" + className + "-average" + "'" + ">Average time between two messages: " + daysAverage + " days, " + hoursAverage + " hours and " + minutesAverage + " minutes." + "</p>")
    }
}

const updateTimeBetweenMessageInfo = (timeBetweenMessageData, fileData) => {
    for (let i = 0; i < timeBetweenMessageData[0].length; i++) {
        //Longuest
        let daysLong = Math.floor(timeBetweenMessageData[0][i] / 86400)
        timeBetweenMessageData[0][i] -= daysLong * 86400

        let hoursLong = Math.floor(timeBetweenMessageData[0][i] / 3600)
        timeBetweenMessageData[0][i] -= hoursLong * 3600

        let minutesLong = Math.floor(timeBetweenMessageData[0][i] / 60)

        //Average
        let daysAverage = Math.floor(timeBetweenMessageData[1][i] / 86400)
        timeBetweenMessageData[1][i] -= daysAverage * 86400

        let hoursAverage = Math.floor(timeBetweenMessageData[1][i] / 3600)
        timeBetweenMessageData[1][i] -= hoursAverage * 3600

        let minutesAverage = Math.floor(timeBetweenMessageData[1][i] / 60)

        let className = fileData["participants"][i]["name"].replaceAll(' ', '-')

        $("." + className + "-longuest").text("Longuest time between two messages: " + daysLong + " days, " + hoursLong + " hours and " + minutesLong + " minutes.")
        $("." + className + "-average").text("Average time between two messages: " + daysAverage + " days, " + hoursAverage + " hours and " + minutesAverage + " minutes.")
    }
}

const createAverageWordPerMessageInfo = (averageWordPerMessageData, fileData) => {
    $("#charts").append("<div id='averageWordPerMessage'></div>")
    $("#averageWordPerMessage").append("<h2>Average word per messages</h2>")

    for (let i = 0; i < averageWordPerMessageData.length; i++) {
        let className = fileData["participants"][i]["name"].replaceAll(' ', '-')

        $("#averageWordPerMessage").append("<h3 class='" + className + "'" + ">" + fileData["participants"][i]["name"] + "</h3>")
        $("#averageWordPerMessage").append("<p class='" + className + "-average-word" + "'" + "> " + Math.round( averageWordPerMessageData[i] * 100 + Number.EPSILON ) / 100 + " words per message.</p>")
    }
}

const updateAverageWordPerMessageInfo = (averageWordPerMessageData, fileData) => {

    for (let i = 0; i < averageWordPerMessageData.length; i++) {
        let className = fileData["participants"][i]["name"].replaceAll(' ', '-')
        
        $("." + className + "-average-word").text(Math.round( averageWordPerMessageData[i] * 100 + Number.EPSILON ) / 100 + " words per message.")
    }
}

module.exports = { createMessagePerDayChart, updateMessagePerDayChart, createTimeBetweenMessageInfo, updateTimeBetweenMessageInfo, createAverageWordPerMessageInfo, updateAverageWordPerMessageInfo }