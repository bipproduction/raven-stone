import { fDb } from "@/lib/fbs";
import { sUser } from "@/s_state/s_user";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDidUpdate, useShallowEffect } from "@mantine/hooks";
import { Model } from "echarts";
import { onChildChanged, onValue, ref, set } from "firebase/database";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import toast from "react-simple-toasts";

const login_user = atomWithStorage("loginUser", "");

const Testo = () => {
  const [data, setData] = useState("No result");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [open, setopen] = useState(false);
  const router = useRouter();
  const [loginUser, setLoginUser] = useAtom(login_user);

  useDidUpdate(() => {
    requestCameraPermission();
  }, [hasPermission]);
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      setHasPermission(false);
      console.error(err);
    }
  };

  async function onKirimData() {
    set(ref(fDb, `eagle_2/auth/qr/${data}`), {
      id: "ini adalah idnya",
    });
  }

  return (
    <>
      <Group>
        <Stack>
          <Button onClick={() => setopen(true)}>Open</Button>
          <Text>{sUser.value!.name}</Text>
          <Text>{data}</Text>
          <Modal
            opened={open}
            onClose={() => {
              setopen(false);
              router.reload();
            }}
          >
            <Text>Permisi</Text>
            {JSON.stringify(hasPermission)}
            <QrReader
              key={data}
              constraints={{
                facingMode: "environment",
              }}
              onResult={(result, error) => {
                if (result) {
                  setData(result.getText());
                  setLoginUser(result.getText());
                  setopen(false);
                  onKirimData();
                }

                if (!!error) {
                  // console.info(error);
                  // toast(error.message);
                }
              }}
            />
            <p>{data}</p>
          </Modal>
        </Stack>
      </Group>
    </>
  );
};

export default Testo;
