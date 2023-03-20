const city = require("./city.json");
const dtkab = require("./data_kabupaten.json");
// const dkab = require("./data.json")
const fs = require('fs');
const { json2tsv } = require("tsv-json/dist/source");

function rumusCityValue() {
  let isi = [];

  for (let kota of city) {
    // console.log(kota)

    const row  = [kota.id.toString(), kota.name.toString(), kota.provinceId.toString()]
    

    isi.push(row)
  }
  //   console.log(isi)
  const header = ["value"];

  isi.unshift(header);
  fs.writeFileSync("xCity", json2tsv(isi), "utf-8");
}

rumusCityValue()
