const docx = require("docx");
const fs = require("fs");
const csvParse = require("csv-parse/sync");
const getLiturgicalDate= require("./utils/liturgicalDate.js");
const {capitalize, convertToOrdinal, convertMonthToWords } = require("./utils/textUtils.js")
const { centeredHeader, redSectionHeader, normalText, callAndResponse, penitentialAct, newLine } = require("./utils/textGen.js");


const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, PageBreak } = docx;
const { parse } = csvParse;


async function gatherInfo() {
    let data = fs.readFileSync("./input.csv", 'utf8');

    data = parse(data, {
        bom:true,
        columns:true
    });

    console.log(data);

    data[0].date = new Date(data[0].date);

    data[0].liturgicalDate = await getLiturgicalDate(data[0].date);
    return data;
}

let doc;

gatherInfo().then((data) => {
    console.log(data);
    doc = new Document ({
        styles: {
            paragraphStyles: [
                {
                    id: "date",
                    name: "date",
                    run: {
                        size: 28,
                        bold: true,
                        font: "Arial"
                    }
                },
                {
                    id: "section-header",
                    name: "section-header",
                    run: {
                        size: 28,
                        bold: true,
                        font: "Arial",
                        color: "c9211e"
                    }
                },
                {
                    id: "normal",
                    name: "normal",
                    run: {
                        size: 28,
                        font: "Arial"
                    }
                }
            ]
        },
        sections: [
            {
                children: [
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
                    centeredHeader(`Prayers of the Faithful, ${convertMonthToWords(data[0].date.getUTCMonth()+1)} ${data[0].date.getUTCDate()-1}-${data[0].date.getUTCDate()+5}`)



                                            
                ]
            }
        ]
    })
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("test.doc", buffer);
    })
})


//`${convertToOrdinal(data[0].liturgicalDate.season_week)} ${capitalize(data[0].liturgicalDate.weekday)} of ${capitalize(data[0].liturgicalDate.season)} Time`





