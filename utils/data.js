const fs = require("fs");
const { parse } = require("csv-parse/sync");

function getIntentions(day) {
    let intentions = fs.readFileSync("./intentions.csv", "utf8");
    let deceasedIntentions = fs.readFileSync("./deceasedIntentions.csv", "utf8");
    let input = fs.readFileSync("./input.csv", "utf8");

    intentions = parse(intentions.trim(), {
        bom: true,
    })

    deceasedIntentions = parse(deceasedIntentions, {
        bom: true,
    })

    let parishIntentions = parse(input, {
        bom: true,
    })

    let deceasedParish = [];

    for(let i = 0; i < parishIntentions.length; i++) {
        if(parishIntentions[i].sick.length > 0 && parishIntentions[i] != undefined) {
            deceasedParish.push(parishIntentions[i].sick)
        }
    }

    let data;
    let intentionsFiltered = []
    let deceasedIntentionsFiltered = []

    if(day) {
        for(let i = 0; i < intentions.length; i++) {
            if(intentions[i][0] === day) {
                for(let j = 1; j < intentions[i].length; j++) {
                    if(intentions[i][j].length > 0 && intentions[i][j] != undefined) {
                        intentionsFiltered.push(intentions[i][j]);
                    }
                }
            }
        }

        for(let i = 0; i < deceasedIntentions.length;i++) {
            if(deceasedIntentions[i][0] === day) {
                for (let j = 1; j < deceasedIntentions[i].length; j++) {
                    if(deceasedIntentions[i][j].length > 0 && deceasedIntentions[i][j] != undefined) {

                        deceasedIntentionsFiltered.push(deceasedIntentions[i][j]);
                    }
                }
            }
        }

        data = { intentionsFiltered, deceasedIntentionsFiltered, deceasedParish }    
        return data;

    }

    console.log(intentionsFiltered)
    console.log(deceasedIntentionsFiltered)


    data = { intentions, deceasedIntentions, deceasedParish };
    return data;
}
console.log(getIntentions())

module.exports.getIntentions = getIntentions;
