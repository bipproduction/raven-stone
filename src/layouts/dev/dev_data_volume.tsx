import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  NumberInput,
  Paper,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import data_volume from "./../../../bin/perhitungan/city_value.json";
import _ from "lodash";
import { useState } from "react";
import { useForceUpdate, useHover, useShallowEffect } from "@mantine/hooks";
import { httpdevGetCityValue } from "@/http/http_dev_get_city_value";
import {
  MdCheck,
  MdCheckBox,
  MdClose,
  MdEdit,
  MdInfo,
  MdNotifications,
  MdSearch,
} from "react-icons/md";

const DevDataVolume = () => {
  const [listData, setlistData] = useState<
    { city: string; value: string; isEdit: boolean }[]
  >([]);
  const update = useForceUpdate();
  const [search, setSearch] = useState("");
  const [tambahVal, setTamabahVal] = useState<number>();
  const [kurangVal, setKurangVal] = useState<number>();

  const {hovered, ref} = useHover()

  useShallowEffect(() => {
    httpdevGetCityValue()
      .then((v) => v.json())
      .then((v) => {
        v.forEach((vv: any) => {
          vv.isEdit = false;
        });
        setlistData(v);
      });
  }, []);

  return (
    <>
      <Title>Data Volume</Title>
      {/* {JSON.stringify(listData)} */}
      <Flex direction={"column"}>
        {/* <Paper p={"md"}>
          <ScrollArea h={300}>
            <Table>
              <thead>
                <tr>
                  {_.keys(_.omit(data_volume[0], ["id", "provinceId"])).map(
                    (val: any, i) => (
                      <th key={i}>{val}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {data_volume.map((v, i) => (
                  <tr key={i}>
                    {_.values(_.omit(v, ["id", "provinceId"])).map((vv, ii) => (
                      <td key={ii}>{vv}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper> */}
        <Paper p={"md"}>
          <Flex>
            <Flex gap={"xs"} justify={"end"} align={"end"} p={"xs"}>
              <NumberInput
                // max={100}
                min={1}
                placeholder="tambah masal"
                // rightSection={"%"}
                onChange={(val) => setTamabahVal(Number(val))}
              />
              <Button compact>tambah</Button>
            </Flex>
            <Flex gap={"xs"} justify={"end"} align={"end"} p={"xs"}>
              <NumberInput
                // max={100}
                min={1}
                placeholder="kurangi masal"
                // rightSection={"%"}
                onChange={(val) => setKurangVal(Number(val))}
              />
              <Button compact>kurangi</Button>
            </Flex>
          </Flex>
          <Box p={"xs"}>
            <TextInput
              onChange={(val) => setSearch(val.currentTarget.value)}
              icon={<MdSearch />}
              rightSection={
                <ActionIcon>
                  <MdClose />
                </ActionIcon>
              }
            />
            <Card bg={"yellow.1"}>
              <Flex gap={"xs"} align={"center"}>
                <MdInfo />
                <Text fs={"italic"} c={"gray"}>
                  click pada nilai value untuk mengedit manual satuan
                </Text>
              </Flex>
            </Card>
          </Box>
          <Table>
            <thead
              style={{
                position: "sticky",
                top: 0,
                padding: "8px",
                backgroundColor: "white",
                zIndex: 1000,
              }}
            >
              <tr>
                {/* <th>Action</th> */}
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {listData
                .filter((v) =>
                  _.lowerCase(v.city).includes(_.lowerCase(search))
                )
                .map((v, i) => (
                  <tr key={i}>
                    {/* <td>
                    <ActionIcon
                      size={24}
                      onClick={() => {
                        v.isEdit = !v.isEdit;
                        update();
                      }}
                    >
                      <MdEdit size={24} color={v.isEdit ? "green" : "gray"} />
                    </ActionIcon>
                  </td> */}
                    <td>{v.city}</td>
                    <td>
                      <Flex align={"center"}>
                        <Box
                          onClick={() => {
                            v.isEdit = true;
                            update();
                          }}
                        >
                          {v.isEdit ? (
                            <Flex align={"center"}>
                              <TextInput w={200} placeholder={v.value} />
                            </Flex>
                          ) : (
                            <Text align="end" ref={ref} p={7} w={200} sx={{
                                cursor: "pointer"
                            }} bg={hovered? "gray.1": ""} fw={"bold"}>
                              {Intl.NumberFormat('id-ID').format(Number(v.value))}
                            </Text>
                          )}
                        </Box>
                        {v.isEdit && (
                          <Flex>
                            <ActionIcon
                              size={32}
                              onClick={() => {
                                v.isEdit = false;
                                update();
                              }}
                            >
                              <MdClose size={32} />
                            </ActionIcon>
                            <ActionIcon
                              size={32}
                              onClick={() => {
                                v.isEdit = false;
                                update();
                              }}
                            >
                              <MdCheckBox size={32}  />
                            </ActionIcon>
                          </Flex>
                        )}
                      </Flex>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Paper>
      </Flex>
    </>
  );
};

export default DevDataVolume;
