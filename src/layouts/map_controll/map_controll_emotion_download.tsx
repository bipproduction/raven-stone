import { api } from "@/lib/api";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import Link from "next/link";
import { useState } from "react";
import { MdDownload, MdThumbDown } from "react-icons/md";
import { mc_list_candidate_count } from "./map_controll_state";
import { _fun_mc_load_data } from "./map_controll_fun";

const _openModal = atomWithStorage(
  "map_controll_download_emotion_modal",
  false
);

export function MapControllEmotionDownload() {
  const [listCandidateDataCount, setLsistCandidateDataCount] = useAtom(
    mc_list_candidate_count
  );
  const [open, setOpen] = useAtom(_openModal);
  const [selectedId, setSelectedId] = useState<number>();

  useShallowEffect(() => {
    sSelectedDate.subscribe(() => {
      //   loadData();
      _fun_mc_load_data(setLsistCandidateDataCount);
    });
  }, []);

  //   function loadData() {
  //     fetch(
  //       api.apiDevMapControllCandidateCountContent +
  //         "?date=" +
  //         sSelectedDate.value
  //     )
  //       .then((res) => res.json())
  //       .then(setLsistCandidateDataCount);
  //   }
  return (
    <>
      <Stack p={"md"}>
        <SimpleGrid cols={3} w={400} spacing={0}>
          {listCandidateDataCount?.map((v) => (
            <Box
              key={v.id}
              p={"xs"}
              sx={{
                border: "1px solid white",
              }}
            >
              <Stack key={v.id} spacing={0} align="center" justify="center">
                <Title c={"gray"} order={3}>
                  {v.count > 0 ? (
                    <ActionIcon
                      size={32}
                      //   href={`/api/dev/download-content?date=${sSelectedDate.value}&candidateId=${v.id}`}
                      onClick={() => {
                        setSelectedId(v.id);
                        setOpen(true);
                      }}
                    >
                      <MdDownload size={32} color="green" />
                    </ActionIcon>
                  ) : (
                    <MdThumbDown 
                    // color="gray" 
                    />
                  )}
                </Title>
                <Title
                  h={30}
                  align="center"
                  order={3}
                  color={v.count > 0 ? "green.8" : ""}
                  lineClamp={2}
                  w={70}
                  size={12}
                >
                  {v.name}
                </Title>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
        <Text fz={12} c={"gray"} bg={"cyan.1"} p={"xs"}>
          * Press icon download to download data , by curent selected date
        </Text>

        <Modal opened={open} onClose={() => setOpen(false)}>
          <Stack>
            <Title order={3}>PORPOSE</Title>
            <SimpleGrid cols={2}>
              <Stack bg={"gray.1"} justify="space-between" p={"xs"}>
                <Stack spacing={0}>
                  <Title>For Update</Title>
                  <Text size={"xs"}>
                    jika ingin mengambil data dan memperbaikinya , include id
                    dari data tersebut
                  </Text>
                </Stack>
                <Center>
                  <Link
                    href={
                      api.apiDevEmotionDownload +
                      `?date=${sSelectedDate.value}&candidateId=${selectedId}&type=update`
                    }
                  >
                    <MdDownload size={32} color="green" />
                  </Link>
                </Center>
              </Stack>
              <Stack bg={"gray.1"} justify="space-between" p={"xs"}>
                <Stack spacing={0}>
                  <Title>For Insert</Title>
                  <Text size={"xs"}>
                    jika ingin mengambil struktur data dan digunakan untuk
                    keperluan inject data baru , bukan update
                  </Text>
                </Stack>
                <Center>
                  <Link
                    href={
                      api.apiDevEmotionDownload +
                      `?date=${sSelectedDate.value}&candidateId=${selectedId}&type=insert`
                    }
                  >
                    <MdDownload size={32} color="green" />
                  </Link>
                </Center>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Modal>
      </Stack>
    </>
  );
}
