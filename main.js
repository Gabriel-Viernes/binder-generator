const docx = require("docx");
const fs = require("fs");
const csvParse = require("csv-parse/sync");
const getLiturgicalDate= require("./utils/liturgicalDate.js");
const {capitalize, convertToOrdinal, convertMonthToWords } = require("./utils/ordinal.js")


const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } = docx;
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
                }
            ]
        },
        sections: [{
            children: [
                new Paragraph ({
                    style: "date",
                    alignment: AlignmentType.CENTER,
                    text: `${convertMonthToWords(data[0].date.getUTCMonth()+1)} ${data[0].date.getUTCDate()}, ${data[0].date.getUTCFullYear()}`,
                }),
                new Paragraph ({
                    style: "date",
                    alignment: AlignmentType.CENTER,
                    text: `${convertToOrdinal(data[0].liturgicalDate.season_week)} ${capitalize(data[0].liturgicalDate.weekday)} of ${capitalize(data[0].liturgicalDate.season)} Time`
                })
            ]
        }]
    })
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("test.doc", buffer);
    })
})





