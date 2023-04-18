import { funLoadMapData } from "@/fun_load/func_load_map_data";
import { slistCandidate } from "@/s_state/s_list_candidate";
import { sListKabupaten } from "@/s_state/s_list_kabupaten";
import { Button, Group, Loader, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { EChartsOption, registerMap } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";

const listEmotionColor = [
  {
    id: "1",
    name: "Trust",
    color: "#00A651",
  },
  {
    id: "2",
    name: "Joy",
    color: "#EC008C",
  },
  {
    id: "3",
    name: "Surprise",
    color: "#8B5E3C",
  },
  {
    id: "4",
    name: "Anticipation",
    color: "#F7941D",
  },
  {
    id: "5",
    name: "Sadness",
    color: "#00AEEF",
  },
  {
    id: "6",
    name: "Fear",
    color: "#FFDE17",
  },
  {
    id: "7",
    name: "Anger",
    color: "#ED1C24",
  },
  {
    id: "8",
    name: "Disgust",
    color: "#414042",
  },
];

const isMuncul = signal(false);

export function MapControllMapView() {
  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/indonesia-map");
    // const resCandidate = await fetch("/api/get-candidate");
    // if (!res.status) return console.log("error get indonesia map");
    // if (!resCandidate.ok) return console.log("error get candidate");
    const dataMap = await res.json();
    // const dataCandidate = await resCandidate.json();
    // slistCandidate.value = dataCandidate;

    // for (let apa of dataMap.features) {
    //   apa.properties.name = apa.properties.NAME_2;
    //   apa.properties.value = apa.properties.Shape_Leng;
    //   // ini.push(apa.properties.NAME_1)
    // }
    registerMap("indonesia", dataMap);
    await funLoadMapData();
    isMuncul.value = true
    // setIsmap(true);
  };

  const option: EChartsOption = {
    toolbox: {
      show: true,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        if (!a.data) return "kosong";
        const datanya = _.omit(a.data.data, "id", "City");
        const ky = Object.keys(datanya);
        return `
            <h3>${a.data.data.City.name}</h3>
            ${ky.map((v) => `${v}: ${datanya[v]}`).join("<br/>")}
            `;
      },
    },
    visualMap: {
      show: false,
      height: 0,
      width: 0,
    },
    series: [
      {
        name: "Indonesia",
        type: "map",
        map: "indonesia",
        roam: true,
        scaleLimit: {
          min: 1.2,
          max: 20,
        },
        // zoom: 20,
        label: {
          show: false,
          fontWeight: "bold",
          formatter: (v: any) => {
            return `${v.name}`;
          },
        },
        emphasis: {
          label: {
            show: true,
            color: "black",
            textBorderColor: "white",
            textBorderWidth: 4,
          },
        },
        data: sListKabupaten.value.map((v, i) => {
          const dt = _.omit<{}>(v, ["id", "City"]);

          const ky = Object.keys(dt);
          const vl = Object.values(dt);

          const emotion = ky[vl.indexOf(_.max(vl))];

          const adaNol = _.max(vl) == 0;
          return {
            name: v.City.name,
            data: v,
            itemStyle: {
              color: adaNol
                ? "white"
                : listEmotionColor.find((v) => _.lowerCase(v.name) == emotion)
                    ?.color,
            },
          };
        }),
      },
    ],
  };

  return (
    <>
      <Stack>
        {/* <Group>
          <Button compact onClick={() => (isMuncul.value = true)}>
            show map
          </Button>
        </Group> */}
        {isMuncul.value && <EChartsReact option={option} />}
      </Stack>
    </>
  );
}
