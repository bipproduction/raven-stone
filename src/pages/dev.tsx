import { api } from "@/lib/api";
import { ModelCityValue } from "@/model/city_value";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Loader,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { MdTableView } from "react-icons/md";
import toast from "react-simple-toasts";
import { Spreadsheet } from "react-spreadsheet";

const Dev = () => {
  const syncNationWideChart = async () => {
    const res = await fetch(api.apiDevSyncNationWideChart);
    return res.ok;
  };

  const syncSourceOfMention = async () =>
    await fetch(api.apiDevSyncSourceOfMention).then(async (v) => v.ok);

  const syncWordCloud = async () =>
    await fetch(api.apiDevSyncWordCloud).then(async (v) => v.ok);

  const generateApi = async () =>
    await fetch("/api/generate/api").then(async (v) => v.ok);

  const seederCityValue = async () =>
    await fetch(api.apiSeederCityValue).then(async (v) => v.ok);

  const seederCity = async () =>
    await fetch(api.apiSeederCity).then(async (v) => v.ok);

  const seederDataContent = async () =>
    await fetch(api.apiSeederDataContent).then(async (v) => v.ok);

  const seederEmotion = async () =>
    await fetch(api.apiSeederEmotion).then(async (v) => v.ok);

  const seederProvince = async () =>
    await fetch(api.apiSeederCityValue).then(async (v) => v.ok);

  return (
    <>
      <Text>Dev</Text>
      {/* <DevCityValue /> */}
      <Group p={"md"}>
        <ButtonSync
          loadData={syncNationWideChart}
          name={"Sync NationWide Chart"}
        />
        <ButtonSync
          loadData={syncSourceOfMention}
          name={"sync source of mention"}
        />
        <ButtonSync loadData={syncWordCloud} name={"sync word cloud"} />
        <ButtonSync loadData={generateApi} name={"generate api"} />

        <ButtonSync loadData={seederCityValue} name={"seeder city value"} />

        <ButtonSync loadData={seederCity} name={"seeder city value"} />

        <ButtonSync loadData={seederDataContent} name={"seeder data content"} />

        <ButtonSync loadData={seederEmotion} name={"seeder emotion"} />
        <ButtonSync loadData={seederProvince} name={"seeder province"} />
      </Group>
    </>
  );
};

interface ModelLoadData {
  loadData: () => Promise<boolean>;
  name: string;
}

const ButtonSync = ({ loadData, name }: ModelLoadData) => {
  const [isLoading, setisLoading] = useState(false);

  const load = async () => {
    setisLoading(true);
    if (await loadData()) {
      toast("success");
      return setisLoading(false);
    }

    toast("error");
    return setisLoading(false);
  };

  return (
    <>
      <Button
        w={200}
        leftIcon={isLoading && <Loader color={"orange"} />}
        onClick={load}
      >
        {name}
      </Button>
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
      <Box
        p={"xs"}
        sx={{
          border: "1px solid gray",
        }}
      >
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
