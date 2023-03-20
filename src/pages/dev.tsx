import { api } from "@/lib/api";
import { ModelCityValue } from "@/model/city_value";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useInputState, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdArrowBack, MdTableView } from "react-icons/md";
import toast from "react-simple-toasts";

const Dev = () => {
  const syncNationWideChart = async () => {
    const res = await fetch(api.apiDevSyncNationWideChart);
    return res.ok;
  };

  const router = useRouter();

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
    await fetch(api.apiSeederProvince).then(async (v) => v.ok);

  const seederCandidate = async () =>
    await fetch(api.apiSeederCandidate).then(async (v) => v.ok);
  return (
    <>
      <Stack spacing={0} pos={"static"}>
        <Flex
          pos={"fixed"}
          w={"100%"}
          h={70}
          p={"md"}
          bg={"gray.2"}
          gap={"md"}
          direction={"row"}
        >
          <ActionIcon size={34} onClick={() => router.replace("/dashboard")}>
            <MdArrowBack size={34} />
          </ActionIcon>
          <Text size={24}>Dev</Text>
        </Flex>
        <Container bg={"gray.3"} mt={70} pos={"static"}>
          <Stack>
            {/* <DevCityValue /> */}

            <Card>
              <Stack>
                <Stack spacing={0}>
                  <Text>From Google Sheet</Text>
                  <Text size={16} color={"gray"}>
                    sync data dari google sheet
                  </Text>
                </Stack>
                <Group>
                  <ButtonSync
                    loadData={syncNationWideChart}
                    name={"Sync NationWide Chart"}
                  />
                  <ButtonSync
                    loadData={syncSourceOfMention}
                    name={"sync source of mention"}
                  />
                  <ButtonSync
                    loadData={syncWordCloud}
                    name={"sync word cloud"}
                  />
                </Group>
              </Stack>
            </Card>
            <Card>
              <Stack>
                <Stack spacing={0}>
                  <Text>Generate Api</Text>
                  <Text size={16} color={"gray"}>
                    otomatis generate api dari folder api ;! hanya untuk
                    developer
                  </Text>
                </Stack>
                <ButtonSync loadData={generateApi} name={"generate api"} />
              </Stack>
            </Card>
            <Card>
              <Stack>
                <Stack spacing={0}>
                  <Text>Seeder</Text>
                  <Text size={16} color={"gray"}>
                    Seeder data dari json ke database jika ada penginstalan awal
                  </Text>
                </Stack>
                <Group>
                  <ButtonSync
                    loadData={seederProvince}
                    name={"seeder province"}
                  />
                  <ButtonSync loadData={seederCity} name={"seeder city"} />
                  <ButtonSync
                    loadData={seederCityValue}
                    name={"seeder city value"}
                  />
                  <ButtonSync
                    loadData={seederEmotion}
                    name={"seeder emotion"}
                  />
                  <ButtonSync
                    loadData={seederCandidate}
                    name={"seeder candidate"}
                  />
                </Group>
                <Stack spacing={0}>
                  <Text color={"orange"} fw={"bold"}>
                    Danger Zone
                  </Text>
                  <Text size={16} color={"gray"}>
                    Hati hati karena akan menghapus dan mereplace ulang semua
                    data yang ada di content data
                  </Text>
                </Stack>
                <ButtonSync
                  bg="orange"
                  loadData={seederDataContent}
                  name={"seeder data content"}
                />
              </Stack>
            </Card>
            <B24Dev />
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

const B24Dev = () => {
  const [cookie, setCookie] = useInputState("");
  const [b24Link, setB24Link] = useState<any[]>([]);

  useShallowEffect(() => {
    loadCookie();
    getApiLink();
  }, []);

  const loadCookie = async () => {
    const res = await fetch(api.apiUtilStore + "?name=cookie");
    if (res.status == 200) {
      //   console.log(await res.text(), "ini adalah cookinya");
      const data = await res.json();
      setCookie(data.value.cookie);
    } else {
      console.log("cookienya kosong");
    }
  };

  const updateCookie = async () => {
    if (_.isEmpty(cookie)) return toast("kekosongan tiadk dapat disimpan");
    const body = {
      name: "cookie",
      value: {
        cookie: cookie,
      },
    };
    const res = await fetch(api.apiUtilStore, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status === 201;
  };

  const syncB24 = async () => {
    const res = await fetch(api.apiB24B24Api + "?update=true");
    return res.status === 201;
  };

  const getApiLink = async () => {
    const res = await fetch(api.apiB24B24Api);
    if (res.status === 200) {
      const data = await res.json();
      setB24Link(data);
    }
  };

  return (
    <>
      <Card>
        <Stack>
          <Stack>
            <Text>B24</Text>
            <Stack>
              <Text>Cookie</Text>
              {/* <Text>{cookie}</Text> */}
              <Textarea
                // autosize
                minRows={4}
                rows={40}
                value={cookie}
                onChange={(val) => setCookie(val.currentTarget.value)}
              />
              <Group position="right">
                <ButtonSync
                  loadData={updateCookie as any}
                  name={"update cookie"}
                />
              </Group>
            </Stack>
            <Stack>
              <Text>Update B24</Text>
              <ButtonSync
                loadData={syncB24}
                name={"sync b24"}
                disable={_.isEmpty(cookie)}
              />
            </Stack>
          </Stack>
          <Stack>
            <Text>Link</Text>
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {b24Link.map((v, i) => (
                  <tr key={v}>
                    <td>{i + 1}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

interface ModelLoadData {
  loadData: () => Promise<boolean>;
  name: string;
  disable?: boolean;
  bg?: string;
}

const ButtonSync = ({ loadData, name, disable, bg }: ModelLoadData) => {
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
        bg={bg ?? ""}
        disabled={disable}
        w={200}
        leftIcon={isLoading && <Loader color={"orange"} />}
        onClick={load}
      >
        {name}
      </Button>
    </>
  );
};

// const DevCityValue = () => {
//   const [listCityValue, setCityValue] = useState<any[]>([]);
//   const [isTable, setistable] = useDisclosure(true);
//   const [listJson, setlistJson] = useState<any[]>([]);
//   useShallowEffect(() => {
//     loadCityValue();
//   }, []);

//   const loadCityValue = async () => {
//     fetch("/api/util/get-city-value")
//       .then((v) => v.json())
//       .then((v: ModelCityValue[]) => {
//         setlistJson(v);
//         const data = v.map((v) =>
//           Object.values(v).map((vv) => ({
//             value: vv,
//           }))
//         );

//         data.unshift(
//           Object.keys(v[0]).map((vv) => ({
//             value: vv,
//           }))
//         );
//         setCityValue(data);
//       });
//   };
//   return (
//     <>
//       <Box
//         p={"xs"}
//         sx={{
//           border: "1px solid gray",
//         }}
//       >
//         <Group>
//           <Text size={24}>City Value</Text>
//           <ActionIcon onClick={setistable.toggle}>
//             <MdTableView />
//           </ActionIcon>
//         </Group>
//         <ScrollArea h={300}>
//           {isTable ? (
//             <Spreadsheet data={listCityValue} />
//           ) : (
//             <pre>{JSON.stringify(listJson, null, 2)}</pre>
//           )}
//         </ScrollArea>
//       </Box>
//     </>
//   );
// };

export default Dev;
