import { api } from "@/lib/api";
import { Card, Group, Loader, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import toast from "react-simple-toasts";
import Papa from "papaparse";
import { MdUpload } from "react-icons/md";
import { useState } from "react";

export function V3ComUploadCsv() {
  const [isLoading, setIsloading] = useState(false);
  return (
    <>
      <Card w={150} h={120}>
        <Dropzone
          onDrop={(files) => {
            setIsloading(true);
            const file = files[0];
            if (!file.name.includes("nation-wide-rating"))
              return toast("kayanya file nya salah , coba cek lagi");
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
              const csv = e.target?.result;
              const data = Papa.parse(csv as any, {
                header: true,
              });
              fetch(api.apiV3NationWideRatingCsvUpdate, {
                method: "POST",
                body: JSON.stringify(data.data),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => {
                if (res.status === 201) {
                  setIsloading(false);
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
                  UPLOAD
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  upload csv
                </Text>
              </div>
            )}
          </Group>
        </Dropzone>
      </Card>
    </>
  );
}
