import { fDb } from "@/lib/fbs";
import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  List,
  MediaQuery,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ListItem } from "@mantine/core/lib/List/ListItem/ListItem";
import { useShallowEffect } from "@mantine/hooks";
import { onChildChanged, ref } from "firebase/database";
import _ from "lodash";
import { useState } from "react";
import { MdSwapVerticalCircle } from "react-icons/md";
import Iframe from "react-iframe";
import QRCode from "react-qr-code";
import { v4 } from "uuid";
const id = v4();

export default function Landing() {
  const [user, setUser] = useState("");

  useShallowEffect(() => {
    return onChildChanged(ref(fDb, `eagle_2/auth/`), (snapshot: any) => {
      if (snapshot) {
        const _list = _.keys(snapshot.val());
        if (_list.includes(id)) {
          setUser(snapshot.val()[id]);
          console.log(snapshot.val()[id]);
        }
      }
    });
  }, []);

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
                    <Text c={"black"}>1. Buka Eagle Eye Di Hanphone Anda</Text>
                    <Text c={"black"}>2. Ketuk Tombol Login Web</Text>
                    <Text c={"black"}>
                      3. Arahkan Hanphone Ke Layar Ini Untuk Scan QrCode
                    </Text>
                  </Stack>
                  <MediaQuery smallerThan={"sm"} styles={{ width: "100%" }}>
                    <Flex justify={"center"}>
                      <Box w={250} p={"lg"}>
                        <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={id}
                          viewBox={`0 0 256 256`}
                        />
                        <Text>{JSON.stringify(user)}</Text>
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
                    src={"https://ebi.ai/wp-content/uploads/2022/05/QR1-1.png"}
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
}
