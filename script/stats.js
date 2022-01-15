const messagePerDay = data => {
    let particpants = []
    for(let participant of data["participants"]){
        particpants.push(participant["name"])
    }
    
    let days = []
    let numSentMsg = new Array(particpants.length).fill(0)

    previousTime = new Date(data["messages"][0]["timestamp_ms"])
    days.push(previousTime.toISOString().split('T')[0])

    for (let message of data["messages"]) {
        let time = new Date(message["timestamp_ms"])
        if (previousTime.getTime() + 86400000 < time.getTime()) {
            previousTime = time
            days.push(previousTime.toISOString().split('T')[0])
            numSentMsg[days.length - 1] = new Array(particpants.length).fill(0)
        }
        numSentMsg[days.length - 1][particpants.indexOf(message["sender_name"])]++
    }
    
    return [days, numSentMsg]
}

module.exports = messagePerDay