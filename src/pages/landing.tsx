import { fDb } from "@/lib/fbs";
import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  MediaQuery,
  Paper,
  Space,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useInterval, useShallowEffect } from "@mantine/hooks";
import { onChildChanged, ref } from "firebase/database";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import _ from "lodash";
import {
  MdAccountCircle,
  MdSwapVerticalCircle
} from "react-icons/md";
import QRCode from "react-qr-code";
import { v4 } from "uuid";
// const id = v4();

const val_user = atomWithStorage<any | null>("test_user", {});
const val_qr = atomWithStorage<string | null>("test_qr_id", null);

export default function Landing() {
  const [user, setUser] = useAtom(val_user);
  const [qrValue, setQrValue] = useAtom(val_qr);

  const interval = useInterval(function () {
    console.log("set qr value");
    setQrValue(v4());
  }, 5000);

  useShallowEffect(() => {
    setQrValue(v4());
  }, []);

  useShallowEffect(() => {
    interval.start();
    return interval.stop;
  });

  useShallowEffect(() => {
    return onChildChanged(ref(fDb, `eagle_2/auth/`), (snapshot: any) => {
      if (snapshot) {
        const _list = _.keys(snapshot.val());
        if (_list.includes(qrValue!)) {
          interval.stop();
          setUser(snapshot.val()[qrValue!]);
          console.log(snapshot.val()[qrValue!]);
        }
      }
    });
  }, [qrValue]);

  if (!user || !user.name)
    return (
      <>
        <Stack spacing={0}>
          <Box h={200} bg={"teal"}></Box>
          <Box h={800} bg={"gray.8"}></Box>
          <Box pos={"absolute"} top={70} w={"100%"}>
            <Center>
              <Stack spacing={"lg"}>
                <Group>
                  <MdSwapVerticalCircle size={52} color="white" />
                  <Title order={3} color="white">
                    Eagle Eye
                  </Title>
                </Group>
                <Paper maw={820} bg={"white"} py={"lg"}>
                  <Flex wrap={"wrap"} p={"lg"}>
                    <Stack spacing={"lg"} p={"lg"}>
                      <Title c={"black"} order={3}>
                        Gunakan Eagle Eye Di Komputer Anda
                      </Title>
                      <Text c={"black"}>
                        1. Buka Eagle Eye Di Hanphone Anda
                      </Text>
                      <Text c={"black"}>2. Ketuk Tombol Login Web</Text>
                      <Text c={"black"}>
                        3. Arahkan Hanphone Ke Layar Ini Untuk Scan QrCode
                      </Text>
                    </Stack>
                    <MediaQuery smallerThan={"sm"} styles={{ width: "100%" }}>
                      <Flex justify={"center"}>
                        <Box w={250} p={"lg"} pos={"relative"}>
                          <QRCode
                            size={250}
                            style={{
                              height: "auto",
                              maxWidth: "100%",
                              width: "100%",
                            }}
                            value={qrValue ?? ""}
                            viewBox={`0 0 256 256`}
                          />
                        </Box>
                      </Flex>
                    </MediaQuery>
                  </Flex>
                  <Space h={100} />
                  <Stack bg={"gray.1"} spacing={"lg"} p={"lg"} align="center">
                    <Title c={"black"} order={3}>
                      Tutorial
                    </Title>
                    <Text c={"black"}>Perlu Bantuan Untuk Pemula</Text>
                    <Image
                      src={
                        "https://ebi.ai/wp-content/uploads/2022/05/QR1-1.png"
                      }
                      width={300}
                      height={300}
                      alt={"apa"}
                    />
                  </Stack>
                </Paper>
              </Stack>
            </Center>
          </Box>
        </Stack>
      </>
    );

  return (
    <>
      {
        <Group position="center">
          <Paper p={"lg"}>
            <Stack>
              <Group>
                <MdAccountCircle size={42} color="teal" />
                <Title>{`Hi' ${user!.name}`}</Title>
              </Group>
              <Button
                color="orange"
                onClick={() => {
                  setUser(null);
                }}
              >
                Logout
              </Button>
            </Stack>
          </Paper>
        </Group>
      }
    </>
  );
}
