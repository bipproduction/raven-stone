import { api } from "@/lib/api";
import { Loader, Stack, Text, Title } from "@mantine/core";
import { useId, useShallowEffect } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

export default function XDev() {
  const [dataBranch, setDataBranch] = useState<any>();

  useShallowEffect(() => {
    fetch(api.apiXdevAllBranchGet)
      .then((v) => v.json())
      .then(setDataBranch);
  }, []);
  

  const [htopOutput, setHtopOutput] = useState('');

  useEffect(() => {
    const fetchHtopOutput = async () => {
      const response: any = await fetch('/api/xdev/htop');
      const reader = response.body.getReader();
      console.log(reader)
      while (true) {
        const { done, value } = await reader.read();

        
        if (done) {
          break;
        }

        const decodedValue = new TextDecoder().decode(value);

        
        setHtopOutput((prev) => prev + decodedValue);
      }
    };

    fetchHtopOutput();
  }, []);

  return (
    <>
      <Title>XDev</Title>
      {!dataBranch ? (
        <Loader />
      ) : (
        <Stack>
            {/* {JSON.stringify(dataBranch)} */}
            <Text>{htopOutput}</Text>
        </Stack>
      )}
    </>
  );
}
