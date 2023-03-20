import { BackgroundImage, Box, Group, Paper, SimpleGrid, Stack, Text} from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import React, { useState } from 'react';
import _ from "lodash";
import { Tooltip } from "antd";
import { IconWifi } from '@tabler/icons-react';
import WARNA from './WARNA/Warna';

const Statistic = () => {
const [datanya, setDatanya] = useState()

useShallowEffect(() => {
  loadData()
},[])

const loadData = async () => {
  const res = await fetch("/api/b24/b24-api?get=statistic")
  if (res.status == 200) {
    const data = await res.json()
    setDatanya(data[0].data)
  }
}

  return (
    <>
    <SimpleGrid cols={4}>
      {datanya && 
        Object.keys(datanya).map((v, i) => (
          <Paper key={v} bg={WARNA.blue1} pos={'relative'} shadow={"xs"}>
              <BackgroundImage
              src='/public/ImgMedia/bg-1.png'
              radius={5}
              >
                <Box
                h={"100%"}
                w={"100%"}
                bg={WARNA.blue1}
                pos={"absolute"}
                sx={{opacity: 0.8, borderRadius: 5}}
                ></Box>
                 <Box sx={{ zIndex: 900 }}>
                    <Stack p={"md"} align={"stretch"} pos={"relative"}>
                      <Group position="right"><IconWifi  color='white'/></Group>
                      <Text c={"orange.4"} fw={"bolder"} size={24}>{datanya[v]} {v.includes("percent")? "%": ""}</Text>
                      <Tooltip title={_.upperCase(v)}>
                        <Text fw={"initial"} c={"white"} lineClamp={1}>
                          {_.upperCase(v)}
                        </Text>
                      </Tooltip>
                    </Stack>
                  </Box>

              </BackgroundImage>
          </Paper>

        ))}


    </SimpleGrid>
    
    </>
  );
}

export default Statistic;
