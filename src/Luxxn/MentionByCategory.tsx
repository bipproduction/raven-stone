import React from 'react';
import {
  Avatar,
  Badge,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconWorldWww } from '@tabler/icons-react';
import EChartsReact from "echarts-for-react";

import { useState } from "react";
import { EChartsOption } from "echarts";

const MentionByCategory = () => {
  const [datanya, setDatanya] = useState<any>();

  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/b24/b24-api?get=chart");
    if (res.status == 200) {
      const data = await res.json();
      setDatanya(data[0].data);
    }
  };

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "1%",
      left: "1%",
      // bottom: "1%",
      orient: "vertical"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
          
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data:
          datanya && datanya["chart_sources"]
            ? Object.keys(datanya["chart_sources"]).map((v) => ({
                name: datanya["chart_sources"][v]["site"],
                value: datanya["chart_sources"][v]["count"],
              }))
            : [],
      },
    ],
  };

  return (
    <>
    <SimpleGrid cols={2}>
          <Paper p={"md"}>
            {datanya &&
              Object.keys(datanya["tab_results_count"]).map((v) => (
                <SimpleGrid key={v} cols={2} p={"xs"}>
                  <Group>
                    <Avatar radius={50} color={"cyan"}>
                      <IconWorldWww />
                    </Avatar>
                    <Text>{v}</Text>
                  </Group>
                  <Grid>
                    <Grid.Col span={"auto"}>
                      <Slider
                        thumbChildren={
                          <Avatar radius={50}>
                            {datanya["tab_results_count"][v].percent}
                          </Avatar>
                        }
                        onChange={() => {}}
                        value={Number(datanya["tab_results_count"][v].percent)}
                      />
                    </Grid.Col>
                    <Grid.Col span={"content"}>
                      <Text>%</Text>
                    </Grid.Col>
                  </Grid>
                </SimpleGrid>
              ))}
          </Paper>

          <Paper p={"md"}>
            <EChartsReact option={option} />
          </Paper>
        </SimpleGrid>
    </>
  );
}

export default MentionByCategory;
