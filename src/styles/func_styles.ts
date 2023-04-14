import fs from 'fs'
// Baca file warna.txt
const data: any = fs.readFileSync('warna_radial.txt', 'utf8');

// const regex = /\/\*\s*(.*?)\s*\*\//g;
// const matches = data.match(regex);

// const hasil = matches.map((match: any) => {
//   return { name: match.replace(/\/\*\s*|\s*\*\//g, "") };
// });

// console.log(hasil);

const regex = /\/\*\s*(.*?)\s*\*\/(?:\s|\n)*(.*?)background:\s*(.*?);/gis;
const matches = [...data.matchAll(regex)];

const hasil = matches.map(match => {
    return {
        name: match[1],
        background: match[3]
    };
});

const hasil2: any = {}
for (let h of hasil) {
    hasil2[h.name] = h.background
}

fs.writeFileSync('styles_radial.ts', 'export const stylesRadial = ' + JSON.stringify(hasil2, null, 2))
console.log("success")

export { }