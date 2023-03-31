import { funcLoadNotification } from "@/fun_load/func_load_notification";
import { funcSendnotification } from "@/fun_load/func_send_notification";
import { fDb } from "@/lib/fbs";
import { styleGradientLinierBlue } from "@/styles/styles_gradient_linear_blue";
import { sIsLocal } from "@/s_state/is_local";
import {
  Button,
  SimpleGrid,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { ref, set } from "firebase/database";
import toast from "react-simple-toasts";
import NotifView from "./content-controll__notification_view";

const formData = signal<{ [key: string]: any }>({});
const EditorNotification = () => {

  const onKirim = async () => {
    if (!formData.value.title || !formData.value.des)
      return toast("jangan ada yang kosong");
    const kirim = await funcSendnotification(formData.value);
    if (kirim) {
      set(
        ref(fDb, "eagle_2/notif/ada"),
        `${sIsLocal.value}__${Math.random()}`
      ).then((v) => {
        toast("success");
        funcLoadNotification();
      });
    }
  };

  return (
    <>
      <SimpleGrid cols={2}>
        <Stack
          h={"100vh"}
          sx={{
            overflow: "auto",
          }}
        >
          <NotifView />
        </Stack>
        <Stack p={"md"} bg={styleGradientLinierBlue}>
          <Stack spacing={"lg"}>
            {/* <DatePicker
                onChange={(val) => {
                  formData.value.date = moment(val).format("YYYY-MM-DD");
                }}
              />
              <TimeInput
                label={"time"}
                onChange={(val) => {
                  formData.value.time = moment(val.currentTarget.value).format(
                    "HH:mm"
                  );
                }}
              /> */}
            <Switch
              label={"is local ?"}
              checked={sIsLocal.value}
              onChange={(val) => {
                const apa = val.currentTarget.checked;
                sIsLocal.value = apa;
                localStorage.setItem("is_local", apa.toString());
              }}
            />
            <TextInput
              label={"title"}
              onChange={(val) =>
                (formData.value.title = val.currentTarget.value)
              }
            />
            <Textarea
              cols={8}
              label={"description"}
              onChange={(val) => (formData.value.des = val.currentTarget.value)}
            />
            <Button onClick={onKirim}> Kirim </Button>
          </Stack>
        </Stack>
      </SimpleGrid>
    </>
  );
};

export default EditorNotification;
