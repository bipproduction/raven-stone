import { gUser } from "@/g_state/auth/g_user";
import { gIsDev } from "@/g_state/g_is_dev";
import DevAuthProvider from "@/layouts/dev/dev_auth_provider";
import { api } from "@/lib/api";
import { fDb } from "@/lib/fbs";
import { ModelCityValue } from "@/model/city_value";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useInputState, useShallowEffect } from "@mantine/hooks";
import { onValue, ref, set } from "firebase/database";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdArrowBack, MdArrowForwardIos, MdTableView } from "react-icons/md";
import toast from "react-simple-toasts";
import Swal from "sweetalert2";

const Dev = () => {
  const user = useHookstate(gUser);
  const syncNationWideChart = async () => {
    const res = await fetch(api.apiDevSyncNationWideChart);
    return res.ok;
  };

  const router = useRouter();

  const syncSourceOfMention = async () =>
    await fetch(api.apiDevSyncSourceOfMention).then(
      async (v) => v.status == 200
    );

  const syncWordCloud = async () =>
    await fetch(api.apiDevSyncWordCloud).then(async (v) => v.status == 200);

  const generateApi = async () =>
    await fetch("/api/generate/api").then(async (v) => v.status == 200);

  const seederCityValue = async () =>
    await fetch(api.apiSeederCityValue).then(async (v) => v.status == 200);

  const seederCity = async () =>
    await fetch(api.apiSeederCity).then(async (v) => v.status == 200);

  const seederDataContent = async () =>
    await fetch(api.apiSeederDataContent).then(async (v) => v.status == 200);

  const seederEmotion = async () =>
    await fetch(api.apiSeederEmotion).then(async (v) => v.status == 200);

  const seederProvince = async () =>
    await fetch(api.apiSeederProvince).then(async (v) => v.status == 200);

  const seederCandidate = async () =>
    await fetch(api.apiSeederCandidate).then(async (v) => v.status == 200);

  const seederCandidateValue = async () =>
    await fetch(api.apiSeederApiSeederCandidateValue).then(
      async (v) => v.status == 200
    );

  const seederUser = async () =>
    await fetch(api.apiSeederSeederUser).then(async (v) => v.status == 200);

  const seederUserRole = async () =>
    await fetch(api.apiSeederSeederUserRole).then(
      async (res) => res.status == 200
    );

  return (
    <>
      <DevAuthProvider>
        <Stack spacing={0} pos={"static"} bg={"gray.3"}>
          
          <Container bg={"gray.3"} mt={70} pos={"static"}>
            <Stack>
              {/* <DevCityValue /> */}

              <UtilDev />
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
                      Seeder data dari json ke database jika ada penginstalan
                      awal
                    </Text>
                  </Stack>
                  <Group>
                    <ButtonSync
                      loadData={seederUserRole}
                      name={"seeder user role"}
                    />
                    <ButtonSync loadData={seederUser} name={"seeder user"} />

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

                    <ButtonSync
                      loadData={seederCandidateValue}
                      name={"seeder candidate value"}
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
                    bg="pink"
                    loadData={seederDataContent}
                    name={"seeder data content"}
                  />
                </Stack>
              </Card>
              <B24Dev />
            </Stack>
          </Container>
        </Stack>
      </DevAuthProvider>
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
        disabled={isLoading}
        w={200}
        leftIcon={isLoading && <Loader color={"orange"} />}
        onClick={load}
      >
        {name}
      </Button>
    </>
  );
};

const UtilDev = () => {
  const [updateInfo, setUpdateInfo] = useState(false);

  useShallowEffect(() => {
    return onValue(ref(fDb, "/eagle_2/update"), (snap) => {
      setUpdateInfo(snap.val());
    });
  }, []);
  const infoUpdate = () => {
    set(ref(fDb, "/eagle_2/update"), !updateInfo);
  };

  return (
    <>
      <Stack>
        <Paper p={"md"}>
          <Group>
            <Stack>
              <Text>Util</Text>
              <Button onClick={infoUpdate}>
                Info Update {updateInfo.toString()}
              </Button>
            </Stack>
          </Group>
        </Paper>
      </Stack>
    </>
  );
};

export default Dev;
