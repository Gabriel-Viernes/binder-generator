const { AlignmentType, HeadingLevel, Paragraph, TextRun, PageBreak } = require("docx");
const { centeredHeader, redSectionHeader, normalText, callAndResponse, penitentialAct, newLine, horizontalBorder, highlighted } = require("./textGen.js");
const {capitalize, convertToOrdinal, convertMonthToWords } = require("./textUtils.js")
const { parse } = require("csv-parse/sync");
const fs = require("fs")

function getIntentions() {
    let intentions = fs.readFileSync("./intentions.csv", "utf8");
    let deceasedIntentions = fs.readFileSync("./deceasedIntentions.csv", "utf8");
    let parishDeceased = fs.readFileSync("./input.csv", "utf8");

    intentions = parse(intentions, {
        bom: true,
        columns: true
        
    })

    deceasedIntentions = parse(deceasedIntentions, {
        bom: true,
        columns:true
    })

    parishDeceased = parse(parishDeceased, {
        bom: true,
        columns: true
    })


    let data = [intentions, deceasedIntentions, parishDeceased];
    return data;
}

function generateIntentions(data, day) {
    //day valid values: [sat16, sun8, sun930, sun1130, sun1330, sun1600, mon9, tue9, tue19, wed9, thu9, fri9]
    let finalParagraph = [];
    function getDayIntentions() {
        let intentions = [];
        let deceasedIntentions = [];

        for(let i = 0; i < data[0].length; i++) {
            if(day.length > 0 || day != undefined) {
                let temp = data[0][parseInt(i)][`${day}`]
                if(temp != undefined && temp.length > 0) {
                    intentions.push(temp);
                }
            }
        }

    }
    getDayIntentions();
}



function weekendEngGen(data) {
    let intentions = getIntentions();
    generateIntentions(intentions, "sat16");
    
    console.log(intentions)
    let textBodyEng = [
        centeredHeader(`${convertMonthToWords(data[0].date.getUTCMonth()+1)} ${data[0].date.getUTCDate()}, ${data[0].date.getUTCFullYear()}`),
        centeredHeader(`${data[0].liturgicalDate.celebrations[0].title}`
),
        newLine(),
        redSectionHeader("Celebrant:"),
        normalText(data[0].introEng),
        newLine(),
        centeredHeader("Penitential Act"),
        redSectionHeader("Deacon:"),
        callAndResponse(data[0].penitAct, " Lord have mercy"),
        newLine(),
        callAndResponse(data[1].penitAct, " Christ have mercy"),
        newLine(),
        callAndResponse(data[2].penitAct, " Lord have mercy"),
        redSectionHeader("Celebrant:"),
        normalText("May Almighty God have mercy on us, forgive us our sins and bring us to everlasting life."),
        new Paragraph({
            style: "normal",
            children: [
                new TextRun({
                    text: "Gloria:",
                    bold: true
                })
            ]
        }),
        new Paragraph({
            children: [
                new PageBreak()
            ]
        }),
        centeredHeader(`Prayers of the Faithful, ${convertMonthToWords(data[0].date.getUTCMonth()+1)} ${data[0].date.getUTCDate()-1}-${data[0].date.getUTCDate()+5}`),
        redSectionHeader(`Celebrant:`),
        normalText(`${data[0].pofIntroEng}`),
        newLine(),
        redSectionHeader(`Deacon/Lector: `),
        newLine()
    ];

    let sick = [
        new TextRun({
            text:`* For those who are sick, especially`,
        })
    ];

    for(let i = 0; i < data.length; i++) {
        if(data[i].sick != undefined && data[i].sick.length != 0) {
            sick.push(new TextRun({
                text: ` ${data[i].sick},`,
                bold: true
            }))
        }
        if(data[i].pofEng != undefined && data[i].pofEng.length != 0) {
            textBodyEng.push(new Paragraph({
                style: "normal",
                children: [
                    new TextRun({
                        text: `* ${data[i].pofEng}, `,
                    }),
                    new TextRun({
                        text: `we pray to the Lord`,
                        bold: true
        
                    })
                ]
            }))
            textBodyEng.push(newLine());
        }
    }

    sick.push(new TextRun({
        text: `that they be healed by the grace of God,`
    }))

    sick.push(new TextRun({
        text: ` we pray to the Lord.`,
        bold: true
    }))

    textBodyEng.push(new Paragraph({
        style: "normal",
        children: sick
    }))
    
    textBodyEng.push(
        horizontalBorder(),
        newLine(),
        highlighted("Saturday 4 p.m."),
    );


    return textBodyEng;
}

module.exports.weekendEngGen = weekendEngGen;
