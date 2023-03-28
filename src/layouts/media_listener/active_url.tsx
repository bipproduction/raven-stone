import { ModelB24ActiveUrl } from "@/model/media_listener/active_url";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import {
  Text,
  Box,
  Paper,
  Group,
  Center,
  Stack,
  SimpleGrid,
  Title,
  BackgroundImage,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconCellSignal5, IconChartBar } from "@tabler/icons-react";
import { useState } from "react";
import PageTitle from "../page_title";
import MediaListenerTitle from "./media_listener_title";


const ActiveUrl = () => {
  const [dataUrl, setDataUrl] = useState<ModelB24ActiveUrl>();

  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/b24/b24-api?get=active-url");
    if (res.status === 200) {
      const data = await res.json();
      setDataUrl(data[0].data);
    }
    // console.log(res)
  };
  //   console.log(dataUrl);

  return (
    <>
      <Stack spacing={0}>
        {/* <Title order={3}>Active Url</Title> */}
        {/* <PageTitle text="Sering juga disebut Social Media Monitor, adalah proses mengidentifikasi dan menilai apa yang dibicarakan tentang perusahaan, individu, produk, atau merek di internet secara publik. Percakapan di internet menghasilkan sejumlah data yang besar dan tidak terstruktur." /> */}
        <MediaListenerTitle title="Active Url" />
        <SimpleGrid cols={4}>
          {dataUrl &&
            dataUrl["most_active_urls"].map((v) => (
              <Paper
                key={v["host"]}
                bg={stylesGradient1} pos={"relative"} shadow={"xs"}
              >
                <BackgroundImage
                  src={"/asset/media-listener/bg-blue.jpeg"}
                  radius={5}
                >
                  <Box
                    h={"100%"}
                    w={"100%"}
                    
                    pos={"absolute"}
                    style={{ borderRadius: 5, backdropFilter: `blur(20px)` }}
                  ></Box>
                  <Box style={{ zIndex: 900 }} pos={"relative"} p={"md"}>
                    <Stack align={"center"} justify={"center"}>
                      <Group position="right">
                        <IconCellSignal5 color="white" />
                      </Group>
                      <Text size={24} fw={"bold"} color={"white"}>
                        {v.count}
                      </Text>
                      <Text color={"white"}>{v.host}</Text>
                    </Stack>
                  </Box>
                </BackgroundImage>
              </Paper>
            ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};

export default ActiveUrl;
