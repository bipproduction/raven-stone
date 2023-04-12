import { httpDevTimeMachine } from "@/http/http_dev_time_machine";
import { sCandidate } from "@/s_state/s_candidate";
import { sCityValueTotal } from "@/s_state/s_city_value_total";
import { sTimeMachineValue } from "@/s_state/s_time_machine_value";
import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker, DatePickerInput } from "@mantine/dates";
import { useForceUpdate, useMove, useShallowEffect } from "@mantine/hooks";
import { Slider } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import toast from "react-simple-toasts";

const DevTimeMachine = () => {
  const update = useForceUpdate();
  // const jamnya = Array.from(new Array(24), (x, i) => i + 1).map((v) => {
  //   return {
  //     value: v,
  //     label: `${v}:00`,
  //   };
  // });

  // const onTimeClick = (v: number, i: number) => {
  //   sTimeMachineValue.value.time[i].value = v;
  //   update();
  // };

  useShallowEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = () => {
    httpDevTimeMachine
      .getByDateAndCandidateId({
        date: sTimeMachineValue.value.date,
        candidateId: sTimeMachineValue.value.candidate.toString(),
      })
      .then((v) => v.json())
      .then((v) => {
        const dataNya = _.clone(sTimeMachineValue.value);
        if (v) {
          const dataNya = _.clone(sTimeMachineValue.value);
          dataNya.candidate = v.candidateId;
          dataNya.date = v.date;
          dataNya.time = v.data;
          sTimeMachineValue.value = dataNya;
        }
      });
  };

  const onAcak = () => {
    const lsData = _.clone(sTimeMachineValue.value);

    lsData.time.forEach((v) => {
      v.isManual = false;
      let batasAtas = 100;
      v.sentiment.positive = _.random(1, batasAtas);
      batasAtas -= v.sentiment.positive;
      v.sentiment.negative = _.random(1, _.round(batasAtas / 2));
      batasAtas -= v.sentiment.negative;
      v.sentiment.neutral = batasAtas;
    });

    sTimeMachineValue.value = lsData;
  };

  const onMenurun = () => {
    const lsData = _.clone(sTimeMachineValue.value);
    lsData.time.forEach((v) => {
      v.isManual = false;
      let batasAtas = 100;
      v.sentiment.positive = _.random(50, 70);
      batasAtas -= v.sentiment.positive;
      v.sentiment.negative = _.random(20, batasAtas);
      batasAtas -= v.sentiment.negative;
      v.sentiment.neutral = batasAtas;
    });

    sTimeMachineValue.value = lsData;
  };

  const onMeningkat = () => {
    const lsData = _.clone(sTimeMachineValue.value);
    lsData.time.forEach((v) => {
      v.isManual = false;
      let batasAtas = 100;
      v.sentiment.positive = _.random(1, 20);
      batasAtas -= v.sentiment.positive;
      v.sentiment.negative = _.random(20, 40);
      batasAtas -= v.sentiment.negative;
      v.sentiment.neutral = batasAtas;
    });

    sTimeMachineValue.value = lsData;
  };

  const onSave = async () => {
    console.log(sTimeMachineValue.value);

    const body = {
      candidateId: sTimeMachineValue.value.candidate,
      date: sTimeMachineValue.value.date,
      data: sTimeMachineValue.value.time,
    };
    const res = await httpDevTimeMachine.post(JSON.stringify(body));
    if (res.status === 201) {
      toast("success");
      onLoadData();
    } else {
      toast("failed");
    }
  };

  return (
    <>
      <Stack>
        <Title>Time Machine</Title>
        {/* <Paper p={"xs"}>
          <Group position="right">
            <Select
              placeholder={
                sCandidate.value.find(
                  (v) => v.id == sTimeMachineValue.value.candidate
                )?.name
              }
              data={
                sCandidate.value.map((v) => ({
                  label: v.name,
                  value: v.id,
                })) as any
              }
            />
          </Group>
        </Paper> */}
        <Stack spacing={"md"}>
          {/* <Paper p={"xs"}>
            <Title order={3}>Date</Title>
            <DatePicker
              value={new Date(sTimeMachineValue.value.date)}
              onChange={(val) => {
                if (val) {
                  sTimeMachineValue.value.date =
                    moment(val).format("YYYY-MM-DD");
                  update();
                }
              }}
            />
          </Paper> */}
          <Box p={"xs"} w={"100%"}>
            <Stack>
              {/* <Title order={3}>Time</Title> */}
              {/* {JSON.stringify(sTimeMachineValue.value)} */}
              <Group
                position="apart"
                p={"xs"}
                bg={"gray.2"}
                pos={"sticky"}
                top={0}
                sx={{ zIndex: 100 }}
              >
                <Stack spacing={2}>
                  <Select
                    style={{ fill: "brown" }}
                    color="green"
                    w={200}
                    placeholder={
                      sCandidate.value.find(
                        (v) => v.id == sTimeMachineValue.value.candidate
                      )?.name
                    }
                    data={
                      sCandidate.value.map((v) => ({
                        label: v.name,
                        value: v.id,
                      })) as any
                    }
                    onChange={(val) => {
                      sTimeMachineValue.value.candidate = Number(val);
                      onLoadData();
                    }}
                  />
                  <DatePickerInput
                    w={200}
                    value={new Date(sTimeMachineValue.value.date)}
                    onChange={(val) => {
                      if (val) {
                        sTimeMachineValue.value.date =
                          moment(val).format("YYYY-MM-DD");
                        update();
                        onLoadData();
                      }
                    }}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Button.Group bg={"gray"}>
                    <Button w={100} onClick={onAcak} compact>
                      Acak
                    </Button>
                    <Button w={100} compact onClick={onMenurun}>
                      Menurun
                    </Button>
                    <Button w={100} compact onClick={onMeningkat}>
                      Meningkat
                    </Button>
                  </Button.Group>
                  <Button onClick={onSave}>Save</Button>
                </Stack>
              </Group>
              <Box p={"md"}>
                <Flex wrap={"wrap"} justify={"center"} gap={"xs"}>
                  {sTimeMachineValue.value.time.map((v, i) => (
                    <Paper
                      shadow="xs"
                      w={400}
                      //   onClick={() => onTimeClick(v.value, i)}
                      //   bg={
                      //     sTimeMachineValue.value.time[i].value == v.value
                      //       ? "blue.2"
                      //       : ""
                      //   }
                      //   fz={12}
                      //   variant="white"
                      key={v.label}
                      bg={v.isManual ? "orange.1" : "white"}
                      p={"xs"}
                    >
                      <Stack>
                        <Title>{v.label}</Title>
                        <Group position="left">
                          <Button
                            onClick={() => {
                              v.isManual = !v.isManual;
                              update();
                            }}
                            bg={v.isManual ? "orange" : "blue"}
                            compact
                          >
                            Manual
                          </Button>
                          <Button
                            bg={"pink"}
                            compact
                            onClick={() => {
                              v.sentiment.positive = 0;
                              v.sentiment.negative = 0;
                              v.sentiment.neutral = 0;
                              update();
                            }}
                          >
                            Clear
                          </Button>
                        </Group>
                        <Text c={"gray"} fs={"italic"} size={12}>
                          {v.isManual
                            ? "pastikan anda menyadari apa yang anda rubah"
                            : ""}
                        </Text>
                        {/* <Text>
                          {Intl.NumberFormat("id-ID").format(
                            sCityValueTotal.value
                          )}
                        </Text> */}
                        <Flex justify={"space-between"}>
                          <Stack
                            p={"xs"}
                            bg={"green.2"}
                            h={200}
                            w={100}
                            justify="center"
                            align="center"
                          >
                            <Title color="gray" order={4}>
                              Positive
                            </Title>
                            <Text size={12}>{v.sentiment.positive}</Text>
                            <Slider
                              disabled={!v.isManual}
                              vertical
                              value={v.sentiment.positive}
                              onChange={(val) => {
                                let lsData = _.clone(sTimeMachineValue.value);
                                lsData.time[i].sentiment.positive = val;
                                sTimeMachineValue.value = lsData;
                                // if (
                                //   (_.sum([
                                //     v.sentiment.positive,
                                //     v.sentiment.negative,
                                //     v.sentiment.neutral,
                                //     val - v.sentiment.positive,
                                //   ]) /
                                //     100) *
                                //     sCityValueTotal.value <
                                //   sCityValueTotal.value
                                // ) {
                                //   sTimeMachineValue.value.time[
                                //     i
                                //   ].sentiment.positive = val;
                                //   update();
                                // }
                              }}
                            />
                          </Stack>
                          <Stack
                            p={"xs"}
                            bg={"pink.2"}
                            w={100}
                            justify="center"
                            align="center"
                          >
                            <Title color="gray" order={4}>
                              negative
                            </Title>
                            <Text size={12}>{v.sentiment.negative}</Text>
                            <Slider
                              disabled={!v.isManual}
                              vertical
                              value={v.sentiment.negative}
                              onChange={(val) => {
                                sTimeMachineValue.value.time[
                                  i
                                ].sentiment.negative = val;
                                update();
                              }}
                            />
                          </Stack>
                          <Stack
                            p={"xs"}
                            bg={"yellow.2"}
                            w={100}
                            justify="center"
                            align="center"
                          >
                            <Title color="gray" order={4}>
                              Neutral
                            </Title>
                            <Text size={12}>{v.sentiment.neutral}</Text>
                            <Slider
                              disabled={!v.isManual}
                              vertical
                              value={v.sentiment.neutral}
                              onChange={(val) => {
                                sTimeMachineValue.value.time[
                                  i
                                ].sentiment.neutral = val;
                                update();
                              }}
                            />
                          </Stack>
                        </Flex>
                      </Stack>
                    </Paper>
                  ))}
                </Flex>
              </Box>
            </Stack>
          </Box>
          {/* <Paper w={"100%"} p={"xs"}>
            <Title order={3}>Centiment</Title>
            <Stack p={"md"}>
              <Title order={3}>Positive</Title>
              <Slider />
              <Title order={3}>negative</Title>
              <Slider />
              <Title order={3}>Neutral</Title>
              <Slider />
            </Stack>
          </Paper> */}
        </Stack>
      </Stack>
    </>
  );
};

export default DevTimeMachine;
