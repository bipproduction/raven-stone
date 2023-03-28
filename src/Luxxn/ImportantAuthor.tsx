import React from "react";
import {
  Avatar,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconDeviceTv } from "@tabler/icons-react";
import { Divider } from "antd";
import _ from "lodash";
import { useState } from "react";
import { ModelB24MostImportantAuthor } from "./helper/b24ImportantAuthor";
import PageTitle from "@/layouts/page_title";
import { stylesGradient1 } from "@/styles/styles_gradient_1";

function ImportantAuthorData() {
  const [datanya, setDatanya] = useState<ModelB24MostImportantAuthor[]>();

  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/b24/b24-api?get=important-author");
    if (res.status == 200) {
      const data = await res.json();
      setDatanya(data[0].data["most_important_authors"]);
    }
  };
  return (
    <>
      {/* <PageTitle text="Sering juga disebut Social Media Monitor, adalah proses mengidentifikasi dan menilai apa yang dibicarakan tentang perusahaan, individu, produk, atau merek di internet secara publik. Percakapan di internet menghasilkan sejumlah data yang besar dan tidak terstruktur." /> */}
      <SimpleGrid cols={3}>
        {datanya &&
          datanya.map((v) => (
            <Paper key={v.author} p={"xs"} bg={stylesGradient1}>
              <Stack key={v["authors_id"]}>
                <Flex align={"center"} justify={"space-between"}>
                  <Group>
                    <Avatar m={"xs"} src={v.author_avatar_url} radius={50} />
                    <Text lineClamp={4}>{_.startCase(v.author)}</Text>
                  </Group>
                  <IconDeviceTv />
                </Flex>
                <Flex gap={8} justify={"space-between"}>
                  <Stack spacing={2}>
                    <Text fz={12} fw={"bold"}>
                      {Intl.NumberFormat("id-ID", {
                        notation: "compact",
                      }).format(Number(v.author_followers_count))}
                    </Text>
                    <Text size={12} color={"gray"}>
                      follower
                    </Text>
                  </Stack>
                  <Stack spacing={2}>
                    <Text fz={12} fw={"bold"}>
                      {Intl.NumberFormat("id-ID", {
                        notation: "compact",
                      }).format(
                        Number(`${v.share_of_voice}`.replace(/[^\d]/g, ""))
                      )}
                    </Text>
                    <Text size={12} c={"gray"}>
                      share
                    </Text>
                  </Stack>
                  <Stack spacing={2}>
                    <Text fz={12} fw={"bold"}>
                      {Intl.NumberFormat("id-ID", {
                        notation: "compact",
                      }).format(
                        Number(
                          `${v.estimated_social_reach}`.replace(/[^\d]/g, "")
                        )
                      )}
                    </Text>
                    <Text size={12} c={"gray"}>
                      mention
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            </Paper>
          ))}
      </SimpleGrid>
    </>
  );
}

export default ImportantAuthorData;
