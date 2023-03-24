import PageTitle from "@/layouts/page_title";
import { Badge, Paper, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

const MediaHastagData = () => {
    const [datanya, setDatanya] = useState();

  useShallowEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await fetch("/api/b24/b24-api?get=hastag");
    if (res.status === 200) {
      const data = await res.json();
      setDatanya(data[0].data);
    }
  };
    return (
        <>
        <PageTitle />
        <Paper p={"md"}>
          {datanya &&
            Object.keys(datanya).map((v) => (
              <Badge m={4} key={v} variant={"filled"} bg={"cyan"}>
                <Text align="left" >{v}</Text>
              </Badge>
            ))}
        </Paper>
        </>
    )
}
export default MediaHastagData