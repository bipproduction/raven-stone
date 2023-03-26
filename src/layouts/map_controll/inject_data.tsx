import {
  gListKabupaten,
  gSelectedCandidate,
  gSelectedDate,
} from "@/g_state/g_map_state";
import { api } from "@/lib/api";
import { Button, Group, JsonInput, Modal, Textarea } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import toast from "react-simple-toasts";

const InjectData = () => {
  const [open, setOpen] = useDisclosure(false);
  const [dataNya, setDatanya] = useState<any[]>();
  const [isLoading, setisLoading] = useState(false);

  const onProccess = async () => {
    setisLoading(true);
    if (dataNya === undefined || !_.isArray(dataNya))
      return toast("data error");
    fetch(api.apiUtilInjectData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataNya),
    }).then(async (res) => {
      if (res.status === 201) {
        const data = await res.json();
        console.log(data);
        setisLoading(false);
        toast("success");
      } else {
        setisLoading(false);
        toast(`data server error: ${res.status}`);
      }
    });
  };

  const onLoadData = () => {
    // {
    //     id?: Int
    //     candidateId?: Int | Null
    //     provinceId?: Int | Null
    //     cityId?: Int | Null
    //     trust?: Int | Null
    //     joy?: Int | Null
    //     surprise?: Int | Null
    //     anticipation?: Int | Null
    //     sadness?: Int | Null
    //     fear?: Int | Null
    //     anger?: Int | Null
    //     disgust?: Int | Null
    //     date?: DateTime | Null
    //     createdAt?: DateTime
    //     updatedAt?: DateTime
    //   }
    // const data = gListKabupaten.value.map((v) => ({
    //     id?: v.
    //     candidateId?: Int | Null
    //     provinceId?: Int | Null
    //     cityId?: Int | Null
    //     trust?: Int | Null
    //     joy?: Int | Null
    //     surprise?: Int | Null
    //     anticipation?: Int | Null
    //     sadness?: Int | Null
    //     fear?: Int | Null
    //     anger?: Int | Null
    //     disgust?: Int | Null
    //     date?: DateTime | Null
    //     createdAt?: DateTime
    //     updatedAt?: DateTime
    // }))

    fetch(
      api.apiUtilGetInjetData +
        `?date=${gSelectedDate.value}&candidateId=${gSelectedCandidate.value}`
    )
      .then((res) => res.json())
      .then(setDatanya);
  };

  return (
    <>
      <Button onClick={setOpen.open} compact>
        Inject
      </Button>
      <Modal opened={open} onClose={setOpen.close}>
        <Textarea
          value={JSON.stringify(dataNya, null, 2)}
          onChange={(val) => {
            try {
              const dat = JSON.parse(val.currentTarget.value);
              setDatanya(dat);
            } catch (error) {
              toast("wrong format");
            }
          }}
          minRows={10}
        />
        <Group py={"lg"} position="right">
          <Button onClick={onLoadData}>Load</Button>
          <Button disabled={isLoading} onClick={onProccess}>
            Proccess
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default InjectData;
