import React from 'react';
import {
    Avatar,
    Badge,
    Chip,
    Grid,
    Group,
    Paper,
    SimpleGrid,
    Space,
    Text,
    Title,
    Tooltip,
  } from "@mantine/core";
  import { useDisclosure, useShallowEffect } from "@mantine/hooks";
  import { Button, Card } from "antd";
  import _ from "lodash";
  import { useState } from "react";
import PageTitle from '@/layouts/page_title';


const MediaLinkData = () => {
    const [datanya, setDatanya] = useState()
    const [loadAll, handleLoadAll] = useDisclosure(false)

    useShallowEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const res = await fetch("/api/b24/b24-api?get=link")
        if (res.status == 200) {
          const data = await res.json()
          setDatanya(data[0].data)
        }
    }

  return (
    <>
    <PageTitle />
      <Paper p={"lg"} radius={"md"}>
        <Grid>
          {datanya && 
          _.take(
            Object.keys(datanya),
              !loadAll ? 32 : Object.keys(datanya).length - 1
          ).map((v) => (
            <Tooltip label={v} key={v}>
                <Badge
                m={2}
                variant={"outline"}
                title={v}
                key={v}
                pos={"relative"}
                leftSection={<Avatar color={"pink"}>{datanya[v]}</Avatar>}
                >
                  <Text w={200}>
                    {v}
                  </Text>
                </Badge>
            </Tooltip>
          ))}
        </Grid>
        <Space h={40}/>
        <Group position='right'>
          <Button onClick={handleLoadAll.toggle}>
            {loadAll ? "Minimize" : "Load All"}
          </Button>
        </Group>
      </Paper>
    </>
  );
}

export default MediaLinkData;
