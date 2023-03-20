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
        <Paper p={"md"} radius={20}>
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
