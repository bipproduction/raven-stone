import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDidUpdate, useShallowEffect } from "@mantine/hooks";
import { Model } from "echarts";
import { useRouter } from "next/router";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import toast from "react-simple-toasts";

const Testo = () => {
  const [data, setData] = useState("No result");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [open, setopen] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <Group>
        <Stack>
          <Button onClick={() => setopen(true)}>Open</Button>
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
                  setopen(false)
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
