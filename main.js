const docx = require("docx");
const fs = require("fs");
const csvParse = require("csv-parse/sync");
const getLiturgicalDate= require("./utils/liturgicalDate.js");
const { weekendEngGen } = require("./utils/weekendEngGen.js");

const { AlignmentType, Document, HeadingLevel, HighlightColor, Packer, Paragraph, TextRun, PageBreak } = docx;
const { parse } = csvParse;

async function gatherInfo() {
    let data = fs.readFileSync("./input.csv", 'utf8');

    data = parse(data, {
        bom:true,
        columns:true
    });


    data[0].date = new Date(data[0].date);

    data[0].liturgicalDate = await getLiturgicalDate(data[0].date);
    return data;
}

let doc;

gatherInfo().then((data) => {
    const textBodyEng = weekendEngGen(data);

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
                },
                {
                    id: "highlighted",
                    name: "highlighted",
                    run: {
                        size: 28,
                        font: "Arial",
                        shading: {
                            fill: "ffff00"
                        }
                    }
                }
            ]
        },
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 500,
                            right: 1000,
                            bottom: 500,
                            left: 1000
                        }
                    }
                },
                children: textBodyEng
            }
        ]
    })
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("test.doc", buffer);
    })
})


//`${convertToOrdinal(data[0].liturgicalDate.season_week)} ${capitalize(data[0].liturgicalDate.weekday)} of ${capitalize(data[0].liturgicalDate.season)} Time`





