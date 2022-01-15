const utf8 = require('utf8');

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

const cleanData = (files, mainResolve) => {
    let promises = []
    let mainReader = new FileReader()

    mainReader.onload = event => {
        let data = JSON.parse(event.target.result);
        data["messages"] = []
        data["title"] = utf8.decode(data["title"])

        for (let participant of data["participants"]) {
            participant['name'] = utf8.decode(participant['name'])
        }

        for (const file of files) {
            let filePromise = new Promise(resolve => {
                let reader = new FileReader()

                reader.onload = event => {
                    newData = JSON.parse(event.target.result)

                    for (let message of newData["messages"]) {
                        try {
                            if (message["content"]) message['content'] = utf8.decode(message['content'])

                            if (message["reactions"]) {
                                for (let reaction of message["reactions"]) {
                                    reaction["reaction"] = utf8.decode(reaction["reaction"])
                                }
                            }

                            message["sender_name"] = utf8.decode(message["sender_name"])
                        } catch (e) {
                            console.log(e)
                            console.log(message)
                        }
                    }

                    resolve(newData["messages"])
                }
                reader.readAsText(file)
            })
            promises.push(filePromise)
        }

        Promise.all(promises).then(messages => {
            for (let message of messages) {
                data["messages"] = data["messages"].concat(message)
            }

            data["messages"] = data["messages"].reverse()
            mainResolve(data)
        })
    }

    mainReader.readAsText(files[0])
}

const hexToRgbA = (hex, opacity) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length == 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')'
    }
    throw new Error('Bad Hex');
}


module.exports = { cleanData, hexToRgbA, colorScheme }