import PageTitle from "@/layouts/page_title";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { ModelB24ActiveAuthor } from "./helper/b24ActiveAuthor";

const ActiveAuthorData = () => {
  const [datanya, setDatanya] = useState<ModelB24ActiveAuthor>();
  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/b24/b24-api?get=active-author");

    if (res.status === 200) {
      const data = await res.json();

      setDatanya(data[0].data);
    }
  };

  return (
    <>
      <Stack>
        {/* <PageTitle text="Sering juga disebut Social Media Monitor, adalah proses mengidentifikasi dan menilai apa yang dibicarakan tentang perusahaan, individu, produk, atau merek di internet secara publik. Percakapan di internet menghasilkan sejumlah data yang besar dan tidak terstruktur." /> */}
        <Paper p={"md"} radius={20} bg={stylesGradient1}>
          <SimpleGrid cols={2}>
            {datanya &&
              datanya.most_active_authors?.map((v) => (
                <Stack key={v["authors_id"]} p={"xs"}>
                  {/* <Stack>{JSON.stringify(v)}</Stack> */}
                  <SimpleGrid cols={3}>
                    <Box px={"xs"}>
                      <Avatar src={v.author_avatar_url} />
                      <Text fz={12}>{v.author}</Text>
                    </Box>
                    <Box px={"xs"}>
                      <Text fw={"bold"}>
                        {v.followers_count &&
                          Intl.NumberFormat("id-ID", {
                            notation: "compact",
                          }).format(
                            Number(
                              `${v.author_followers_count}`.replace(
                                /[^\d]/g,
                                ""
                              )
                            )
                          )}
                      </Text>
                      <Text fz={12} c={"gray"}>
                        follower
                      </Text>
                    </Box>
                    <Box px={"xs"}>
                      <Text fw={"bold"}>{v.host_top}</Text>
                      <Text fz={12} c={"gray"}>
                        service
                      </Text>
                    </Box>
                  </SimpleGrid>
                  <Divider />
                </Stack>
              ))}
          </SimpleGrid>
        </Paper>
      </Stack>
    </>
  );
};
export default ActiveAuthorData;
