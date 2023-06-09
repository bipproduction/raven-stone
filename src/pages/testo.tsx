import { Text } from "@mantine/core";
import { useDidUpdate, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

const Testo = () => {
  const [data, setData] = useState("No result");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

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
      <Text>Permisi</Text>
      {JSON.stringify(hasPermission)}
      <QrReader
        constraints={{
          facingMode: "environment",
        }}
        onResult={(result, error) => {
          if (!!result) {
            console.log(result.getText());
            // setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
};

export default Testo;
