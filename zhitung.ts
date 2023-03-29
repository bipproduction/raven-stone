import client from "@/lib/prisma_db"
import _ from "lodash"


const getProvinceValue = async () => {
    const province = await client.province.findMany({
        select: {
            id: true,
            name: true,
            City: {
                select: {
                    id: true,
                    name: true,
                    CityValue: {
                        select: {
                            value: true
                        }
                    }
                }
            }
        }
    })

    const pro = province.map((v) => ({
        id: v.id,
        name: v.name,
        value: _.sumBy(v.City.map((v2) => ({
            data: _.sumBy(v2.CityValue, 'value')
        })), 'data')
    }))

    return pro
}

const main = () => {
    const nilai_total = 8773;
    const data_item = [
      { name: 'pendidikan', value: 8773 },
      { name: 'infrastruktur', value: 12085 },
      { name: 'layanan_kesehatan', value: 642 },
      { name: 'keagamaan', value: 126763 },
      { name: 'kemiskinan', value: 119291 },
      { name: 'lapangan_pekerjaan', value: 30329 },
      { name: 'keadilan_sosial', value: 53391 }
    ];
    
    // Hitung total nilai dari data_item
    let total_value = 0;
    for (let i = 0; i < data_item.length; i++) {
      total_value += data_item[i].value;
    }
    
    // Hitung proporsi pengurangan untuk setiap nilai dari data_item
    let decrease_prop = (total_value - nilai_total) / total_value;
    
    // Kurangi nilai dari setiap data_item dengan proporsi yang sesuai
    for (let i = 0; i < data_item.length; i++) {
      let current_value = data_item[i].value;
      let decrease_value = current_value * decrease_prop;
      let new_value = Math.round(current_value - decrease_value);
      data_item[i].value = new_value;
      total_value -= decrease_value;
    }
    
    console.log(_.sum(data_item.map((v) =>v.value))); // Hasil akhir dari data_item yang sudah diolah
    
}

main()



export { }