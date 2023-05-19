import { mc_list_candidate } from "@/layouts/map_controll/map_controll_state";
import { api } from "@/lib/api";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  NumberInput,
  Paper,
  ScrollArea,
  SimpleGrid,
  Spoiler,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect, useViewportSize } from "@mantine/hooks";
import { atom, useAtom } from "jotai";
import { atomWithStorage, loadable } from "jotai/utils";
import _ from "lodash";
import { MdDownload, MdEdit, MdSave, MdUpload } from "react-icons/md";
import ReactSheet from "react-spreadsheet";
import { useState } from "react";
import { RichTextEditor } from "@mantine/tiptap";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import toast from "react-simple-toasts";
import prs from "html-react-parser";
import { _fun_loadNationWideRating } from "./fun_dev_nation_wide_rating";
import { _val_listNation } from "./val_dev_nation_wide_rating";
import Link from "next/link";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload } from "@tabler/icons-react";
import Papa from "papaparse";

const _muncul_modal = atomWithStorage("dev_nation_wide_v2_muncul_modal", false);
const _target_data = atomWithStorage<any | undefined>(
  "dev_nation_wide_v2_target_data",
  undefined
);

export function DevNationWideRatingv2() {
  const [listNationWideRating, setListNationWideRating] =
    useAtom(_val_listNation);
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);
  const { width, height } = useViewportSize();
  const w = 70;
  const [openModal, setOpenModal] = useAtom(_muncul_modal);
  const [targetData, setTargetData] = useAtom(_target_data);

  useShallowEffect(() => {
    _fun_loadNationWideRating({ setListNationWideRating });
  }, []);
  if (!listNationWideRating)
    return (
      <>
        <Center h={"100vh"}>
          <Loader />
        </Center>
      </>
    );
  return (
    <Stack
      spacing={"lg"}
      // bg={"dark"}
      // w={width}
      // pos={"relative"}
      // sx={{
      //   zIndex: 100,
      // }}
    >
      {/* {JSON.stringify(listNationWideRating[0])} */}
      <Stack>
        <Title p={"xs"}>Dev Nation Wide Rating</Title>
        <Flex gap={"lg"}>
          <Flex>
            <Link href={api.apiPredictiveAiNationWideRatingDownload}>
              <ActionIcon size={"lg"} radius={"xl"}>
                <MdDownload size={24} />
              </ActionIcon>
            </Link>
            <Text>Download</Text>
          </Flex>
          <ButtonModalUpload />
        </Flex>
      </Stack>
      <Box
        sx={{
          overflow: "scroll",
        }}
      >
        <Table
          highlightOnHover
          withColumnBorders
          withBorder
          // bg={"gray"}
          sx={{
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                position: "sticky",
                top: 0,
                zIndex: 101,
                // backgroundColor: "lightgray",
              }}
            >
              <th>
                <Title order={5}>Action</Title>
              </th>
              <th
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 100,
                  backgroundColor: "#343A3F",
                }}
              >
                <Title order={5}>Candidate 1</Title>
              </th>
              <th
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 100,
                  backgroundColor: "#343A3F",
                }}
              >
                <Title order={5}>Candidate 2</Title>
              </th>
              <th>
                <Title order={5}>trust</Title>
              </th>
              <th>
                <Title order={5}>joy</Title>
              </th>
              <th>
                <Title order={5}>surprise</Title>
              </th>
              <th>
                <Title order={5}>anticipation</Title>
              </th>
              <th>
                <Title order={5}>sadness</Title>
              </th>
              <th>
                <Title order={5}>fear</Title>
              </th>
              <th>
                <Title order={5}>anger</Title>
              </th>
              <th>
                <Title order={5}>disgust</Title>
              </th>
              <th>
                <Title order={5}>Rate</Title>
              </th>
              <th>
                <Title order={5}>Text</Title>
              </th>
            </tr>
          </thead>
          <tbody>
            {listNationWideRating.map((v, i) => (
              <tr key={i}>
                <td>
                  <ActionIcon
                    onClick={() => {
                      setTargetData(v);
                      setOpenModal(true);
                    }}
                    radius={100}
                    bg={"orange"}
                    size={"md"}
                    variant="gradient"
                  >
                    <MdEdit color="white" size={24} />
                  </ActionIcon>
                </td>
                <td
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 100,
                    backgroundColor: "#343A3F",
                  }}
                >
                  <Flex w={200} gap={"md"} direction={"row"} align={"end"}>
                    <Avatar
                      src={
                        listCandidate?.find((v2) => v2.id == v.candidate_1_id)
                          .img
                      }
                    ></Avatar>
                    <Text lineClamp={1}>{v["candidate_1_name"]}</Text>
                  </Flex>
                </td>
                <td
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 100,
                    backgroundColor: "#343A3F",
                  }}
                >
                  <Flex w={200} gap={"md"} direction={"row"} align={"end"}>
                    <Avatar
                      src={
                        listCandidate?.find((v2) => v2.id == v.candidate_2_id)
                          .img
                      }
                    ></Avatar>{" "}
                    <Text lineClamp={1}>{v["candidate_2_name"]}</Text>
                  </Flex>
                </td>
                <td>
                  <Text w={w}>{v.trust}</Text>
                </td>
                <td>
                  <Text w={w}>{v.joy}</Text>
                </td>
                <td>
                  <Text w={w}>{v.surprise}</Text>
                </td>
                <td>
                  <Text w={w}>{v.anticipation}</Text>
                </td>
                <td>
                  <Text w={w}>{v.sadness}</Text>
                </td>
                <td>
                  <Text w={w}>{v.fear}</Text>
                </td>
                <td>
                  <Text w={w}>{v.anger}</Text>
                </td>
                <td>
                  <Text w={w}>{v.disgust}</Text>
                </td>
                <td>
                  <Text w={w}>{v.rate}</Text>
                </td>
                <td>
                  <Text lineClamp={4} w={700}>
                    {prs(v.text)}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <ModalEditData />
    </Stack>
  );
}

const _val_open_modal_upload_nation_wide_rating = atomWithStorage(
  "_val_open_modal_upload_nation_wide_rating",
  false
);

function ButtonModalUpload() {
  const [open, setOpen] = useAtom(_val_open_modal_upload_nation_wide_rating);
  const [listNation, setListNationWideRating] = useAtom(_val_listNation);
  return (
    <>
      <Flex>
        <ActionIcon size={"lg"} radius={"xl"} onClick={() => setOpen(true)}>
          <MdUpload size={24} />
        </ActionIcon>
        <Text>Upload</Text>
      </Flex>
      <Modal opened={open} onClose={() => setOpen(false)}>
        <Dropzone
          onDrop={(val) => {
            const file = val[0];
            if (!file.name.includes("nation-wide-rating"))
              return toast("file salah");

            const reader = new FileReader();

            reader.onload = async () => {
              const csvData = reader.result;
              const data = Papa.parse(csvData as any, {
                header: true,
              }).data;

              fetch(api.apiPredictiveAiNationWideRatingCsvUpdate, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(async (res) => {
                if (res.status == 201) {
                  await _fun_loadNationWideRating({ setListNationWideRating });
                  setOpen(false);
                  return toast("success");
                }

                return toast("failed");
              });
            };

            reader.readAsText(file);
          }}
        >
          <Dropzone.Accept>
            <IconUpload size="3.2rem" stroke={1.5} />
          </Dropzone.Accept>
          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Dropzone>
      </Modal>
    </>
  );
}

function ModalEditData() {
  const [openModal, setOpenModal] = useAtom(_muncul_modal);
  const [targetData, setTargetData] = useAtom(_target_data);
  // const [listNationWideRating, setListNationWideRating] = useAtom(_listNation);
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);
  const [listNationWideRating, setListNationWideRating] =
    useAtom(_val_listNation);
  if (!targetData) return <></>;
  return (
    <>
      <Modal
        // bg={"gray"}
        size={"xl"}
        opened={openModal}
        closeOnClickOutside={false}
        onClose={() => {
          setTargetData(undefined);
          setOpenModal(false);
        }}
      >
        <Stack>
          <Flex gap={"md"} align={"center"} justify={"center"}>
            <Stack align="center" p={"md"}>
              <Title order={3}>
                {
                  listCandidate?.find((v) => v.id == targetData.candidate_1_id)
                    .name
                }
              </Title>
              <Image
                radius={10}
                width={100}
                height={100}
                src={
                  listCandidate?.find((v) => v.id == targetData.candidate_1_id)
                    .img
                }
                alt=""
              />
            </Stack>
            <Stack align="center" p={"md"}>
              <Title order={3}>
                {
                  listCandidate?.find((v) => v.id == targetData.candidate_2_id)
                    .name
                }
              </Title>
              <Image
                radius={10}
                width={100}
                height={100}
                src={
                  listCandidate?.find((v) => v.id == targetData.candidate_2_id)
                    .img
                }
                alt=""
              />
            </Stack>
          </Flex>
          <Flex gap={"md"}>
            <Stack
              p={"md"}
              // bg={"gray.1"}
            >
              <Title order={3}>EMOTION</Title>
              <SimpleGrid cols={2}>
                <TextInput
                  label={"trust"}
                  min={0}
                  placeholder={targetData.trust}
                  onChange={(e) => {
                    setTargetData({ ...targetData, trust: e.target.value });
                  }}
                />
                <TextInput
                  label={"joy"}
                  min={0}
                  placeholder={targetData.joy}
                  onChange={(e) => {
                    setTargetData({ ...targetData, joy: e.target.value });
                  }}
                />
                <TextInput
                  label={"surprise"}
                  min={0}
                  placeholder={targetData.surprise}
                  onChange={(e) => {
                    setTargetData({ ...targetData, surprise: e.target.value });
                  }}
                />
                <TextInput
                  label={"anticipation"}
                  min={0}
                  placeholder={targetData.anticipation}
                  onChange={(e) => {
                    setTargetData({ ...targetData, anticipation: e.target.value });
                  }}
                />
                <TextInput
                  label={"sadness"}
                  min={0}
                  placeholder={targetData.sadness}
                  onChange={(e) => {
                    setTargetData({ ...targetData, sadness: e.target.value });
                  }}
                />
                <TextInput
                  label={"fear"}
                  min={0}
                  placeholder={targetData.fear}
                  onChange={(e) => {
                    setTargetData({ ...targetData, fear: e.target.value });
                  }}
                />
                <TextInput
                  label={"anger"}
                  min={0}
                  placeholder={targetData.anger}
                  onChange={(e) => {
                    setTargetData({ ...targetData, anger: e.target.value });
                  }}
                />
                <TextInput
                  label={"disgust"}
                  min={0}
                  placeholder={targetData.disgust}
                  onChange={(e) => {
                    setTargetData({ ...targetData, disgust: e.target.value });
                  }}
                />
              </SimpleGrid>
            </Stack>
            <Stack
              p={"md"}
              // bg={"gray.1"}
            >
              <Title order={3}>RATE</Title>
              <TextInput
                label={"rate"}
                min={0}
                placeholder={targetData.rate}
                onChange={(e) => {
                  setTargetData({ ...targetData, rate: e.currentTarget.value });
                }}
              />
            </Stack>
          </Flex>

          <Stack bg={"gray.1"} p={"xs"}>
            <Title order={3}>Content</Title>
            <ContentEditor
              content={targetData.text ?? ""}
              onKlick={async (val) => {
                // setTargetData({ ...targetData, text: val });
                const body = targetData;
                body.text = val;

                await fetch(api.apiDevDevNationWideRatingV2Update, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
                }).then(async (v) => {
                  if (v.status == 201) {
                    await _fun_loadNationWideRating({
                      setListNationWideRating,
                    });
                    return toast("success");
                  }

                  return toast("error");
                });
              }}
            />
          </Stack>
          {/* {JSON.stringify(targetData)} */}
        </Stack>
      </Modal>
    </>
  );
}

function ContentEditor({
  content,
  onKlick,
}: {
  content: string;
  onKlick: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
  });

  return (
    <>
      <Stack
      // bg={"gray.1"}
      >
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
        <Group position="right">
          <Button onClick={() => onKlick(editor?.getHTML()!)}>Save</Button>
        </Group>
      </Stack>
    </>
  );
}
