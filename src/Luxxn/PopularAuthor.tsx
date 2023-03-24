import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { ModelB24PopularAuthor } from "./helper/b24PopularAuthor";
import PageTitle from "@/layouts/page_title";

const PopularAuthorData = () => {
  const [datanya, setDatanya] = useState<ModelB24PopularAuthor>({});
  const [loadAll, handleLoadAll] = useDisclosure(false);

  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/b24/b24-api?get=popular-author");
    if (res.status == 200) {
      const data = await res.json();
      setDatanya(data[0].data);
    }
  };

  return (
    <>
      <Stack>
        <PageTitle />
        <SimpleGrid cols={6}>
          {datanya &&
            _.take(
              datanya.entries_from_most_popular_authors,
              !loadAll
                ? 20
                : datanya.entries_from_most_popular_authors?.length! - 1
            )?.map((v) => (
              <Paper key={v.id} p={"xs"}>
                <Stack justify={"center"} align={"center"} spacing={2}>
                  <Avatar src={v.author_avatar_url} radius={50} />
                  <Text
                    color={"gray.7"}
                    lineClamp={1}
                    fw={"bold"}
                    align="center"
                  >
                    {v.title}
                  </Text>
                  <Box>
                    <Text align="center" fw={"bold"} color={"gray"}>
                      {v.followers_count}
                    </Text>
                    <Text align="center" fz={12} color={"gray"}>
                      follower
                    </Text>
                  </Box>
                  <Box>
                    <Text align="center" fw={"bold"} color={"gray"}>
                      {v.estimated_social_reach}
                    </Text>
                    <Text align="center" fz={12} color={"gray"}>
                      mention
                    </Text>
                  </Box>
                  <Box>
                    <Text align="center" fw={"bold"} color={"gray"}>
                      {Intl.NumberFormat("id-ID", {
                        notation: "compact",
                      }).format(Number(v.host_traffic_visits))}
                    </Text>
                    <Text align="center" fz={12} color={"gray"}>
                      trafic
                    </Text>
                  </Box>
                </Stack>
              </Paper>
            ))}
          <Center h={"100%"}>
            <Button variant="white" onClick={handleLoadAll.toggle}>
              {loadAll ? "Minimize" : "Load All"}
            </Button>
          </Center>
        </SimpleGrid>
      </Stack>
    </>
  );
};
export default PopularAuthorData;
