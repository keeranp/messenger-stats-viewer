const { Chart } = require("chart.js")
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

const createMessagePieChart = (messageProportionData, fileData) => {
    $("#charts").append("<div id='msgPieContainer'><canvas id='msgPieChart'></canvas></div>")
    const msgPieChartCtx = document.getElementById("msgPieChart").getContext("2d")

    const msgPieChartData = {
        labels: messageProportionData[0],
        datasets: [{
            label: "Message proportion",
            data: messageProportionData[1],
            backgroundColor: () => {
                let colors = []
                for (let i = 0; i < messageProportionData[0].length; i++) {
                    colors.push(utils.colorScheme[i])
                }
                return colors
            }
        }]
    }

    const config = {
        type: "pie",
        data: msgPieChartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            radius: '80%',
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "black",
                        font: {
                            size: 14,
                            weight: 500
                        }
                    }
                },
                title: {
                    display: true,
                    text: "Who talks the most",
                    color: "black",
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    }

    new Chart(msgPieChartCtx, config)
}

const updateMessagePieChart = (messageProportionData, fileData) => {
    const msgPieChart = Chart.getChart("msgPieChart")


    msgPieChart.data.labels = messageProportionData[0]
    msgPieChart.data.datasets = [{
        label: "Message proportion",
        data: messageProportionData[1],
        backgroundColor: () => {
            let colors = []
            for (let i = 0; i < messageProportionData[0].length; i++) {
                colors.push(utils.colorScheme[i])
            }
            return colors
        }
    }]

    msgPieChart.update()
}


const createMessagePerDayChart = (msgPerDayData, fileData) => {
    $("#charts").append("<div id='msgPerDayContainer'><canvas id='msgPerDayChart'></canvas></div>")
    const msgPerDayChartCtx = document.getElementById("msgPerDayChart").getContext("2d")

    const msgPerDayChartData = {
        labels: msgPerDayData[0],
        datasets: createChartDatasets(msgPerDayData[1], fileData)
    }

    const config = {
        type: "line",
        data: msgPerDayChartData,
        options: {
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: "black",
                        font: {
                            size: 14,
                            weight: 500
                        }
                    }
                },
                title: {
                    display: true,
                    text: "How many messages per day did you send",
                    color: "black",
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    }

    new Chart(msgPerDayChartCtx, config)
}

const updateMessagePerDayChart = (msgPerDayData, fileData) => {
    const msgPerDayChart = Chart.getChart("msgPerDayChart")
    msgPerDayChart.data.labels = msgPerDayData[0]
    msgPerDayChart.data.datasets = createChartDatasets(msgPerDayData[1], fileData)
    msgPerDayChart.update()
}

const createTimeBetweenMessageInfo = (timeBetweenMessageData, fileData) => {
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

        $("#stats").append("<div id='" + className + "'></div>")
        $("#" + className).append("<h3 class='" + className + "'" + ">" + fileData["participants"][i]["name"] + "</h3>")
        $("#" + className).append("<p class='" + className + "-longuest" + "'" + ">Longuest time between two messages: " + daysLong + " days, " + hoursLong + " hours and " + minutesLong + " minutes." + "</p>")
        $("#" + className).append("<p class='" + className + "-average" + "'" + ">Average time between two messages: " + daysAverage + " days, " + hoursAverage + " hours and " + minutesAverage + " minutes." + "</p>")
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
    for (let i = 0; i < averageWordPerMessageData.length; i++) {
        let className = fileData["participants"][i]["name"].replaceAll(' ', '-')

        $("#" + className).append("<p class='" + className + "-average-word" + "'" + "> " + Math.round(averageWordPerMessageData[i] * 100 + Number.EPSILON) / 100 + " words per message.</p>")
    }
}

const updateAverageWordPerMessageInfo = (averageWordPerMessageData, fileData) => {

    for (let i = 0; i < averageWordPerMessageData.length; i++) {
        let className = fileData["participants"][i]["name"].replaceAll(' ', '-')

        $("." + className + "-average-word").text(Math.round(averageWordPerMessageData[i] * 100 + Number.EPSILON) / 100 + " words per message.")
    }
}

module.exports = { createMessagePieChart, updateMessagePieChart, createMessagePerDayChart, updateMessagePerDayChart, createTimeBetweenMessageInfo, updateTimeBetweenMessageInfo, createAverageWordPerMessageInfo, updateAverageWordPerMessageInfo }