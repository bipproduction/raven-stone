import { api } from "@/lib/api";
import { sCandidateValue } from "@/s_state/s_candidate_value";
import {
  Button,
  Card,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import toast from "react-simple-toasts";

interface ModelCandidateValue {
  id: number;
  value1: number;
  value2: number;
  candidateId: number;
}

const listData: ModelCandidateValue[] = [];
const lsNya = _.clone(sCandidateValue.value);
const CandidateControll = () => {
  const formData = useForm({
    initialValues: listData,
  });

  const onUpdate = async () => {
    fetch(api.apiCandidateCandidateValueUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sCandidateValue.value),
    }).then(async (v) => {
      if (v.status === 201) {
        toast("success");
      } else {
        toast(`error ${v.status}`);
      }
    });
  };

  return (
    <>
      <Stack spacing={0}>
        <Title>Candidate Controll</Title>
        <Text c={"gray"}>
          perubahan untuk elektabilitas masing masing kandidate , jika menjadi
          president atau wakil presiden
        </Text>
      </Stack>

      {/* {JSON.stringify(sCandidateValue.value)} */}
      <Group position="right" py={"lg"}>
        <Button onClick={onUpdate} compact>
          UPDATE
        </Button>
      </Group>
      <SimpleGrid cols={4}>
        {sCandidateValue.value.map((v, i) => (
          <Card key={v.id}>
            <Stack key={v.id}>
              <Title order={4}>{v.name}</Title>
              <NumberInput
                onChange={(val) => {
                  const data = _.clone(sCandidateValue.value);
                  data[i].value1 = val;
                  sCandidateValue.value = data;
                }}
                label={"presiden"}
                placeholder={v.value1}
                min={0}
              />
              <NumberInput
                onChange={(val) => {
                  const data = _.clone(sCandidateValue.value);
                  data[i].value2 = val;
                  sCandidateValue.value = data;
                }}
                label={"wakil presiden"}
                placeholder={v.value2}
                min={0}
              />
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
};

export default CandidateControll;
