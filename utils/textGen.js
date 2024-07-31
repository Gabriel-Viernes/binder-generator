const { Paragraph, TextRun, AlignmentType } = require("docx");
const { getIntentions } = require("./data.js");
const { parseDayAndTime } = require("./textUtils.js");

function centeredHeader(text) {

    return new Paragraph({
        style: "date",
        alignment: AlignmentType.CENTER,
        text: `${text}`
    })
}

function redSectionHeader(text) {
    return new Paragraph({
        style: "section-header",
        text: `${text}`
    })
}

function normalText(text) {
    return new Paragraph({
        style: "normal",
        text: `${text}`
    })
}

function callAndResponse(text, secondText) {
    return new Paragraph({
        style: "normal",
        children: [
            new TextRun(text),
            new TextRun({
                text: secondText,
                bold: true
            })
        ]
    })
}

function intention(dayTime) {
    let data;
    if(dayTime) {
        data = getIntentions(dayTime);
    } else {
        data = getIntentions();
    }

    let { intentions, deceasedIntentions, deceasedParish } = data;
    console.log(intentions, deceasedIntentions, deceasedParish)

    let deceased;

    let bodyText = [];

    for(let i = 0; i < intentions.length; i++) {

        bodyText.push(highlighted(parseDayAndTime(intentions[i][0])))
        bodyText.push(newLine())

        let currentDayIntentions = [
            new TextRun({
                style: "normal",
                text: "*For the faithful departed _________ "
            })]
        
        deceased = deceasedParish.concat(deceasedIntentions[i].slice(1))

        deceased = deceased.filter((value) => 
            value.length > 0
        )

        console.log(deceased)
        
        for (let j = 0; j < deceased.length; j++) {

            if(deceased[j] != undefined && deceased[j].length > 0) {
                if(j == deceased.length - 1) {
                    currentDayIntentions.push(new TextRun({
                        style: "normal",
                        bold: true,
                        text: `and ${deceased[j]},`
                    }))               

                    break;
                }

                currentDayIntentions.push(new TextRun({
                    style: "normal",
                    bold:true,
                    text: `${deceased[j]}, `
                }))
            }

        }


        currentDayIntentions.push(new TextRun({
            style: "normal",
            text: " may they rest in peace."
        }))
        currentDayIntentions.push(new TextRun({
            style: "normal",
            bold: true,
            text: " We pray to the Lord."
        }))
        bodyText.push(new Paragraph({
            style: "normal",
            children: currentDayIntentions
        }))
        bodyText.push(newLine())
    }


    return bodyText;
}

function penitentialAct(data, lang) {
    let temp = [];
    if(lang === "eng") {
        temp.push(callAndResponse(data[0].penitAct, "Lord, have mercy"));
        temp.push(callAndResponse(data[1].penitAct, "Christ, have mercy"));
        temp.push(callAndResponse(data[2].penitAct, "Lord, have mercy"));
    } else if (lang === "sp") {
        temp.push(callAndResponse(data[0].penitAct, "Señor, ten piedad."));
        temp.push(callAndResponse(data[1].penitAct, "Cristo, ten piedad"));
        temp.push(callAndResponse(data[2].penitAct, "Señor, ten piedad."));

    }
    return temp;
}

function newLine() {
    return new Paragraph({
        children: [
            new TextRun({
                break: 1
            })
        ]
    })
}

function horizontalBorder() {
    return new Paragraph({
        border: {
            bottom: {
                color: "000000",
                style: "single",
                size: 2
            }
        }
    })
}

function highlighted(text){
    return new Paragraph({
        style: "highlighted",
        children: [
            new TextRun({
                text: text,
                bold: true
            })
        ]
    })
}



module.exports.centeredHeader = centeredHeader;
module.exports.redSectionHeader = redSectionHeader;
module.exports.normalText = normalText;
module.exports.callAndResponse = callAndResponse;
module.exports.penitentialAct = penitentialAct;
module.exports.newLine = newLine;
module.exports.horizontalBorder = horizontalBorder;
module.exports.highlighted = highlighted;
module.exports.intention = intention;
