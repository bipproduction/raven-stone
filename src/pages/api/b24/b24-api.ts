import client from '@/lib/prisma_db';
import ip from 'ip';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import store from "store2";
// import Db from '../../../fun/db';

// const cookies = `_gcl_au=1.1.267244021.1671613960; _ga=GA1.3.997477616.1671614007; _fbp=fb.1.1671614008453.1431495334; _hjSessionUser_158833=eyJpZCI6IjMwNzhmNGNjLWMzZTAtNThmMC04ZWM0LTE0OTU1OGNhOGVkYiIsImNyZWF0ZWQiOjE2NzE2MTQwMDc3NTQsImV4aXN0aW5nIjp0cnVlfQ==; intercom-device-id-7d95c7a1f40e65f71000a61e8f048680ca2bd6f2=a7a5568f-6e40-49c1-a1eb-afbca54fe1bd; unlockTwitterDialogShown297787670=1; projectHasJustAdded962085146=1; projectHasJustAdded962092104=1; OptanonAlertBoxClosed=2022-12-22T03:51:58.642Z; projectHasJustAdded962519524=1; mobileVersion-573319852=1; _hjSessionUser_1039750=eyJpZCI6Ijk2YjIzYzM5LWRlZmMtNWIwZS1hZjE4LWQ0OWEzZDYxNGM5OCIsImNyZWF0ZWQiOjE2NzE2ODk4NTkyNzEsImV4aXN0aW5nIjp0cnVlfQ==; projectHasJustAdded962595068=1; projectHasJustAdded962597553=1; projectHasJustAdded962600038=1; projectHasJustAdded962922591=1; showMaxProjectRequiredPhrasesSetsWarning=1; projectHasJustAdded962923088=1; unlockTwitterDialogShown298087589=1; projectHasJustAdded962951914=1; projectHasJustAdded962952411=1; G_ENABLED_IDPS=google; b24er=P7wi6v/8E+axPXREmnSC7BKUW5eJYUpiiyHdYlIQABLy0VhN1gyzpxJZrCGOyr3QIUaJKukkw9267/PFBmFWbIEvLyZ0FCHYs3w8J6mkRUQ=; b24el=whfRBM+ylF3/EZclg7PaLpFzdZdRDXItlCFO+kBwlB5lh5UUTno6RkrVgw4MRfCmyQDe1L+chwMsaWnNrW96HpgtU/dlEXFhQItFtsXe7C4=; kemrcaw=792333a62540976f3c5a6beeaf621401%573880048; hpkemrcaw=573880048.298089534.0; _gcl_aw=GCL.1679189185.Cj0KCQjwwtWgBhDhARIsAEMcxeDJ5400AYqYN3Qz1bE06jPOuO_jVlb1tKa6YKDivJJ03YxAbqUGQxkaAkANEALw_wcB; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Mar+19+2023+09:26:25+GMT+0800+(Central+Indonesia+Time)&version=202302.1.0&isIABGlobal=false&hosts=&consentId=848aa7aa-18d9-463f-bc01-630664bb757c&interactionCount=1&landingPath=NotLandingPage&groups=C0002:1,C0003:1,C0004:1,C0001:1&geolocation=ID;&AwaitingReconsent=false; _gid=GA1.2.1556971703.1679189186; _gac_UA-109906-9=1.1679189186.Cj0KCQjwwtWgBhDhARIsAEMcxeDJ5400AYqYN3Qz1bE06jPOuO_jVlb1tKa6YKDivJJ03YxAbqUGQxkaAkANEALw_wcB; _dc_gtm_UA-109906-9=1; _hp2_ses_props.2979368351={"r":"https://www.google.com/","ts":1679189186390,"d":"brand24.com","h":"/","q":"?adgr=txt-brand-iv&keyword-ext=brand%2024&placement&location=9126930&gclid=Cj0KCQjwwtWgBhDhARIsAEMcxeDJ5400AYqYN3Qz1bE06jPOuO_jVlb1tKa6YKDivJJ03YxAbqUGQxkaAkANEALw_wcB"}; b24el_today=ifQGKUwAK5BsiDM5x2THjWAhW9d18jHzGviYBNtfXWwuEFDX6WxRulHujAb2KkhXQevDjs4j/dR0PrAvfYNrsw==; PHPSESSID=fc5ebbda7fcdd43376ef3561ef77d5ab; gtm-user-login-submit=1; _gid=GA1.3.1556971703.1679189186; _gac_UA-109906-9=1.1679189186.Cj0KCQjwwtWgBhDhARIsAEMcxeDJ5400AYqYN3Qz1bE06jPOuO_jVlb1tKa6YKDivJJ03YxAbqUGQxkaAkANEALw_wcB; _hp2_props.2979368351={"account_id":"298089534"}; _ga=GA1.1.997477616.1671614007; _uetsid=1478e790c5f511ed87c43d4cd9e39b92; _uetvid=baf1a210810f11edb984e32b3005a000; _hp2_id.2979368351={"userId":"7956534958720880","pageviewId":"3036578587141126","sessionId":"7196748383817304","identity":"malik@baliinteraktifperkasa.com","trackerVersion":"4.0","identityField":null,"isIdentified":1,"oldIdentity":null}; _hjIncludedInSessionSample_158833=1; _hjSession_158833=eyJpZCI6IjhmNzIzY2Y3LTkyODAtNGU2Mi1iZGJhLTJiZGJiZmM2MGY2YyIsImNyZWF0ZWQiOjE2NzkxODkxOTI5MzMsImluU2FtcGxlIjp0cnVlfQ==; _hjAbsoluteSessionInProgress=1; intercom-session-7d95c7a1f40e65f71000a61e8f048680ca2bd6f2=NXpHT29QVm82WWoyOHlscDZiWldtVmlUU1hJNERNOFZWd1phU3hzSHZvd0duOWFhN3RiMGh4L0dxTUhYc0tGMS0tQTRCc2w2Z3BCSzdNMXhoZERXaXFIQT09--3247c2a43963526382298bba7c9b17c308792799; _ga_73Z0NEGTVL=GS1.1.1679189185.176.1.1679189212.0.0.0; _clck=1ky46xz|1|fa1|0; _clsk=13jwrdq|1679189214408|1|1|g.clarity.ms/collect`;
const listName: {
    name?: string,
    path?: string,
    del?: Promise<any>,
    create?: (data: {}) => Promise<any>,
    get?: Promise<any>,
}[] = [
        {
            name: "sosial-media",
            path: "load-most-interactive-entries-from-social-media",
            del: client.b24SosialMedia.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24SosialMedia.create({
                data: {
                    data: data
                }
            }),
            get: client.b24SosialMedia.findMany()

        },
        {
            name: "popular-author",
            path: "load-entries-from-most-popular-authors",
            del: client.b24PopularAuthor.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24PopularAuthor.create({
                data: {
                    data: data
                }
            }),
            get: client.b24PopularAuthor.findMany()
        },
        {
            name: "statistic",
            path: "load-statistics",
            del: client.b24Statistic.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24Statistic.create({
                data: {
                    data: data
                }
            }),
            get: client.b24Statistic.findMany()
        },
        {
            name: "chart",
            path: "load-chart-sources",
            del: client.b24Chart.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24Chart.create({
                data: {
                    data: data
                }
            }),
            get: client.b24Chart.findMany()
        },
        {
            name: "hastag",
            path: "hashtags-analytics",
            del: client.b24Hastag.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24Hastag.create({
                data: {
                    data: data
                }
            }),
            get: client.b24Hastag.findMany()
        },
        {
            name: "link",
            path: "links-analytics",
            del: client.b24Link.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24Link.create({
                data: {
                    data: data
                }
            }),
            get: client.b24Link.findMany()
        },
        {
            name: "important-author",
            path: "load-most-important-authors",
            del: client.b24importantAuthor.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24importantAuthor.create({
                data: {
                    data: data
                }
            }),
            get: client.b24importantAuthor.findMany()
        },
        {
            name: "active-author",
            path: "load-most-active-authors",
            del: client.b24ActiveAuthor.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24ActiveAuthor.create({
                data: {
                    data: data
                }
            }),
            get: client.b24ActiveAuthor.findMany()
        },
        {
            name: "active-url",
            path: "load-most-active-urls",
            del: client.b24ActiveUrl.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24ActiveUrl.create({
                data: {
                    data: data
                }
            }),
            get: client.b24ActiveUrl.findMany()
        },
        {
            name: "important-url",
            path: "load-most-important-urls",
            del: client.b24ImportantUrl.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24ImportantUrl.create({
                data: {
                    data: data
                }
            }),
            get: client.b24ImportantUrl.findMany()
        },
        {
            name: "popular-word",
            path: "get-most-popular-words",
            del: client.b24PopularWord.deleteMany({ where: { id: { gte: 1 } } }),
            create: (data: {}) => client.b24PopularWord.create({
                data: {
                    data: data
                }
            }),
            get: client.b24PopularWord.findMany()
        }
    ]

// const dataCookie = await client.store.findUnique({ where: { name: "cookie" } })
const loadData = async (path: string) => {
    const dataCookie = await client.store.findUnique({ where: { name: "cookie" } })
    const cookie: any = dataCookie?.value!
    return await fetch(`https://app.brand24.com/panel/${path}/sid/973295975`, {
        method: "POST",
        headers: {
            "cookie": cookie.cookie
        }
    })
};

const b24Api = async (req: NextApiRequest, res: NextApiResponse) => {

    const { name, update,  get } = req.query

    // menampilkan cooie yang sudah tersimpan
    // if (cookie) {
    //     return res.status(200).send(store.get('cookie').toString())
    // }

    // menyimpan cookie
    // if (login) {
    //     store('cookie', login)
    //     return res.status(201).send(store('cookie'))
    // }

    // update data
    if (update) {

        for (let itm of listName) {
            await itm.del
            console.log("delete : ", itm.name)
            const getData = await loadData(itm.path!)
            try {
                const resultData = await getData.json();
                await itm.create!(resultData)
                console.log("create : ", itm.name)
            } catch (error: any) {
                console.log("", error)
                return res.status(500).send(error.toString())
            }

        }

        console.log("success")
        return res.status(201).send("success")
    }

    // untuk mengecek data satu persatu
    if (name) {
        const data = listName.filter((v) => v.name === name)
        if (_.isEmpty(data)) {
            return res.status(404).end()
        }

        const result = await loadData(data[0].path!)
        if (result.status == 200) {
            const hasil = await result.text();
            return res.status(200).send(hasil)
        } else {
            return res.status(result.status).end()
        }
    }

    if (get) {

        const getData = listName.find((v) => v.name == get)
        if (_.isEmpty(getData)) {
            return res.status(404).send("404")
        } else {
            return res.status(200).json(await getData.get)
        }

    }


    console.log("lolos kesini")
    return res.status(200).json(listName.map((val) => `/api/b24/b24-api?get=${val.name}`))

}

export default b24Api