const { Paragraph, TextRun, AlignmentType } = require("docx");

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

module.exports.centeredHeader = centeredHeader;
module.exports.redSectionHeader = redSectionHeader;
module.exports.normalText = normalText;
module.exports.callAndResponse = callAndResponse;
module.exports.penitentialAct = penitentialAct;
module.exports.newLine = newLine;
