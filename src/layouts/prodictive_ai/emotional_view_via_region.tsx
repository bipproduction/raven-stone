import { listEmotionColor } from "@/assets/list_emotion_color";
import { gSelectedView } from "@/g_state/g_dasboard";
import { gIndonesiaMap } from "@/g_state/g_indonesia_map";
import { gListKabupaten } from "@/g_state/g_map_state";
import { api } from "@/lib/api";
import { useHookstate } from "@hookstate/core";
import { Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { registerMap } from "echarts";
import EChartsReact, { EChartsOption } from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";

const EmotionalViewViaRegion = () => {
  const [search, setSearch] = useState<string>("");
  const [opt, setOpt] = useState();
  //   const indoensiaMap = useHookstate(gIndonesiaMap)

  const dataIndonesiaMap: { [key: string]: any } = {
    ..._.clone(gIndonesiaMap.value),
  };

  //   dataIndonesiaMap?.features?.forEach((apa: any) => {
  //     if (apa.properties.name) {
  //       apa.properties.name = apa.properties.NAME_2;
  //       apa.properties.value = apa.properties.Shape_Leng;
  //     }
  //   });

  registerMap("indonesia", gIndonesiaMap.value as any);

  const option: EChartsOption = {
    toolbox: {
      show: true,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b: any) => {
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
        data: gListKabupaten.value
          .filter((v) => _.lowerCase(v.City.name).includes(_.lowerCase(search)))
          .map((v, i) => {
            const dt = _.omit<{}>(v, ["id", "City"]);

            const ky = Object.keys(dt);
            const vl = Object.values(dt);

            const emotion = ky[vl.indexOf(_.max(vl))];

            return {
              name: v.City.name,
              data: v,
              itemStyle: {
                color: listEmotionColor.find(
                  (v) => _.lowerCase(v.name) == emotion
                )?.color,
              },
            };
          }),
      },
    ],
  };

  if (gSelectedView.value != "Emotional View Via Region")
    return <>{gSelectedView.value}</>;
  return (
    <>
      <Text>Emotional View Via Region</Text>
      {/* {JSON.stringify(dataIndonesiaMap.features.map((v: any) => v.properties))} */}
      {!_.isEmpty(dataIndonesiaMap.features) && (
        <EChartsReact
          style={{
            height: 500,
          }}
          option={option}
        />
      )}
    </>
  );
};

export default EmotionalViewViaRegion;
