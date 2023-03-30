const fs = require("fs");
const PDFDocument = require("pdf-lib").PDFDocument;
const { Command } = require("commander");

const program = new Command();

program
  .name("PDF manipulation helper")
  .description("Split PDF and join them")
  .version("1.0.0");

program
  .command("split")
  .description("Split PDF into one file one page")
  .argument("<string>", "PDF filepath")
  .option("--start <string>", "start page default to 0", 0)
  .option("--end <string>", "end page default to last page")
  .action(async (filepath, options) => {
    console.log(`processing ${filepath}...`);

    if (!fs.existsSync("./splits")) {
      await fs.promises.mkdir("./splits");
    }

    if (!filepath) {
      throw new Error(`filepath is required`);
    }

    const docmentAsBytes = await fs.promises.readFile(filepath);
    const pdfDoc = await PDFDocument.load(docmentAsBytes);
    const totalPage = pdfDoc.getPageCount();

    let start, end;
    if (options.start) {
      start = parseInt(options.start) - 1;
    } else {
      start = 0;
    }

    if (options.end) {
      end = parseInt(options.end);
    } else {
      end = totalPage;
    }

    console.log(`split ${filepath} from: ${start + 1} until: ${end}`);

    const subDocument = await PDFDocument.create();

    for (let i = start; i < end; i++) {
      const [copiedPage] = await subDocument.copyPages(pdfDoc, [i]);
      subDocument.addPage(copiedPage);
    }

    const pdfBytes = await subDocument.save();
    await fs.promises.writeFile(
      `./splits/page_${start + 1}_to_${end}.pdf`,
      pdfBytes
    );
  });

program.parse();
