import { listEmotionColor } from "@/assets/list_emotion_color";
import { gIndonesiaMap } from "@/g_state/g_indonesia_map";
import { gListKabupaten } from "@/g_state/g_map_state";
import { gSelectedView } from "@/g_state/g_selected_view";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { stylesGradientRed } from "@/styles/styles_gradient_red";
import { Paper } from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import { registerMap } from "echarts";
import EChartsReact, { EChartsOption } from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import PageTitle from "../page_title";
import SelectCandidateView from "./select_candidate_view";

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
  const update = useForceUpdate();
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
                  <div style="width: 300px; background: ${stylesGradientRed} ;padding:8px; color: gray">
                  <h3>${a.data.data.City.name}</h3>
                  ${ky.map((v) => `${v}: ${datanya[v]}`).join("<br/>")}
                  </div>
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

  if (gSelectedView.value != "Emotional View Via Region")
    return <>{gSelectedView.value}</>;
  return (
    <>
      <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
      <SelectCandidateView onProccess={() => {}} onUpdate={update} />
      <Paper h={550} bg={stylesGradient1}>
        {!_.isEmpty(dataIndonesiaMap.features) && (
          <EChartsReact
            style={{
              height: 500,
            }}
            option={option}
          />
        )}
      </Paper>
    </>
  );
};

export default EmotionalViewViaRegion;
