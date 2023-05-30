import { api } from "@/lib/api";
import { Card, Group, Loader, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import toast from "react-simple-toasts";
import Papa from "papaparse";
import { MdUpload } from "react-icons/md";
import { useState } from "react";
import { useAtom } from "jotai";
import { v3_selected_date } from "../val/v3_val_selected_date";
import { v3_fun_check_data_candidate } from "../fun/v3_fun_check_data_candidate";
import { v3_val_list_data_candidate } from "../val/v3_val_list_data_candidate";

export function V3ComReplaceCsv() {
  const [isLoading, setIsloading] = useState(false);
  const [fileDate, setFileDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useAtom(v3_selected_date);
  const [listData, setData] = useAtom(v3_val_list_data_candidate);
  return (
    <>
      <Card w={150} h={120}>
        <Dropzone
          onDrop={(files) => {
            setIsloading(true);
            const file = files[0];
            if (!file.name.includes("nation-wide-rating")) {
              return toast("kayanya file nya salah , coba cek lagi");
            }
            // const tanggal = file.name.split("_")[1].split(".")[0];

            // setFileDate(tanggal);
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
              const csv = e.target?.result;
              const data = Papa.parse(csv as any, {
                header: true,
              });
              fetch(api.apiV3NationWideRatingDataReplace + `?date=${selectedDate}`, {
                method: "POST",
                body: JSON.stringify(data.data),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => {
                if (res.status === 201) {
                  setIsloading(false);

                  v3_fun_check_data_candidate({
                    date: selectedDate,
                    setData,
                  });
                  return toast("berhasil");
                }
                setIsloading(false);
                toast("gagal");
              });
            };
          }}
          onReject={(files) => toast("loh kenapa ?")}
          maxSize={3 * 1024 ** 2}
          accept={MIME_TYPES.csv as any}
        >
          <Group>
            <Dropzone.Accept>
              <MdUpload size={42} />
            </Dropzone.Accept>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                <Text size="xl" inline>
                  REPLACE
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  replace csv
                </Text>
              </div>
            )}
          </Group>
        </Dropzone>
      </Card>
    </>
  );
}
