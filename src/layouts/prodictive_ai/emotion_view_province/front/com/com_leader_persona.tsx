import { api } from "@/lib/api";
import { Box, Card, Center, Paper, Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import randomColor from "randomcolor";
import { useState } from "react";
import { val_list_color } from "../val/val_list_color";
import _ from "lodash";
import useTranslate from "next-translate/useTranslation";

export function ComLeaderPersona({ provinceId }: { provinceId: any }) {
  const [listData, setListData] = useState<any[]>([]);
  // const [max, setMax] = useState(0);
  const { t, lang } = useTranslate();

  useShallowEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    fetch(api.apiLeaderPersonaByProvinceIdGet + `?provinceId=${provinceId}`)
      .then((v) => v.json())
      .then((v: any) => {
        if (v) {
          setListData(v);
        }
      });
  }

  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        return _.upperCase(params[0].name) + " : " + params[0].value + " %";
      },
    },
    angleAxis: {
      type: "category",
      data: _.sortBy(listData, "value").map((v) =>
        t("common:" + _.lowerCase(v.title))
      ),
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "white",
        fontSize:"10",
        formatter: function (params: any) {
          return _.startCase(params);
        },
      },
      startAngle: 60,
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        coordinateSystem: "polar",
        barWidth: 80,
        data: _.sortBy(listData, "value").map((v, i) => ({
          value: _.round(v.value, 2),
          itemStyle: {
            color: val_list_color[i],
          },
        })),
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    ],
  };
  return (
    <>
      {/* <pre>{JSON.stringify(listData, null, 2)}</pre> */}
      <Box p={"xs"} pt={20} pb={20}>
          <Title ta={"center"} c={"white"} fz={20} >
            {"LEADER TRAIT ASSESSMENT"}
          </Title>
        <Center pt={20}>
          <EChartsReact
            style={{
              width: "100%",
            }}
            option={option}
          />
        </Center>
      </Box>
    </>
  );
}
