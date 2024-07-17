const docx = require("docx");
const fs = require("fs");
const doc = new docx.Document ({
    sections: [{
        children: [
            new docx.Paragraph ({
                children: [new docx.TextRun("Hello World")],
            })
        ]
    }]
})

docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("test.docx", buffer);
})


