import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { IconMessage } from "@tabler/icons-react";
import { IconShare } from "@tabler/icons-react";
import { IconThumbUp } from "@tabler/icons-react";
import { ModelB24SosialMedia } from "./helper/b24SocialMedia";
import PageTitle from "@/layouts/page_title";
import { stylesGradient1 } from "@/styles/styles_gradient_1";

const SocialMediaData = () => {
  const [datanya, setDatanya] = useState<ModelB24SosialMedia>();
  const [loadAll, setLoadAll] = useDisclosure(false);
  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/b24/b24-api?get=sosial-media");
    if (res.status == 200) {
      const data = await res.json();
      setDatanya(data[0].data);
    }
  };
  return (
    <>
      <Stack>
        {/* <PageTitle text="Sering juga disebut Social Media Monitor, adalah proses mengidentifikasi dan menilai apa yang dibicarakan tentang perusahaan, individu, produk, atau merek di internet secara publik. Percakapan di internet menghasilkan sejumlah data yang besar dan tidak terstruktur."/> */}
        <SimpleGrid spacing={"lg"} cols={2}>
          {datanya &&
            _.take(
              datanya.most_interactive_entries_from_social_media,
              !loadAll
                ? 6
                : datanya.most_interactive_entries_from_social_media?.length! -
                    1
            )?.map((v) => (
              <Paper bg={stylesGradient1} radius={10} p={"xs"} key={v.id}>
                <Grid align={"start"}>
                  <Grid.Col w={150} span={"content"}>
                    <Stack align={"center"}>
                      <Avatar color={"blue"} radius={50}>
                        {v.host?.substring(0, 1)}
                      </Avatar>
                      <Text size={12} lineClamp={1} sx={{ overflow: "clip" }}>
                        {v.host}
                      </Text>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={"auto"}>
                    <Stack>
                      <Text>{v.title}</Text>
                      <Text color={"gray"} fz={12}>
                        {v.content}
                      </Text>
                    </Stack>
                  </Grid.Col>
                </Grid>
                <Grid justify={"space-around"} p={"xs"} align={"center"}>
                  <Group>
                    <IconMessage color="blue" />
                    <Text fz={"xs"}>{v.comments_count}</Text>
                  </Group>
                  <Group>
                    <IconShare color="blue" />
                    <Text fz={"xs"}>{v.shares_count}</Text>
                  </Group>
                  <Group>
                    <IconThumbUp color="blue" />
                    <Text fz={"xs"}>{v.shares_count}</Text>
                  </Group>
                </Grid>
              </Paper>
            ))}
        </SimpleGrid>
        <Group position="right">
          <Button onClick={setLoadAll.toggle} variant="white">
            {loadAll ? "Minimize" : "Load All"}
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default SocialMediaData;
