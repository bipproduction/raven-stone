import { ModelCityValue } from "@/model/city_value";
import { ActionIcon, Box, Group, ScrollArea, Text } from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { MdTableView } from "react-icons/md";
import { Spreadsheet } from "react-spreadsheet";

const Dev = () => {
  return (
    <>
      <Text>Dev</Text>
      <DevCityValue />
    </>
  );
};

const DevCityValue = () => {
  const [listCityValue, setCityValue] = useState<any[]>([]);
  const [isTable, setistable] = useDisclosure(true);
  const [listJson, setlistJson] = useState<any[]>([]);
  useShallowEffect(() => {
    loadCityValue();
  }, []);

  const loadCityValue = async () => {
    fetch("/api/util/get-city-value")
      .then((v) => v.json())
      .then((v: ModelCityValue[]) => {
        setlistJson(v);
        const data = v.map((v) =>
          Object.values(v).map((vv) => ({
            value: vv,
          }))
        );

        data.unshift(
          Object.keys(v[0]).map((vv) => ({
            value: vv,
          }))
        );
        setCityValue(data);
      });
  };
  return (
    <>
      <Box p={"xs"} sx={{
        border: "1px solid gray"
      }}>
        <Group>
          <Text size={24}>City Value</Text>
          <ActionIcon onClick={setistable.toggle}>
            <MdTableView />
          </ActionIcon>
        </Group>
        <ScrollArea h={300}>
          {isTable ? (
            <Spreadsheet data={listCityValue} />
          ) : (
            <pre>{JSON.stringify(listJson, null, 2)}</pre>
          )}
        </ScrollArea>
      </Box>
    </>
  );
};

export default Dev;
