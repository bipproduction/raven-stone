import { sSelectedDate } from "@/s_state/s_selectedDate";
import { Button, Flex, Modal, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import toast from "react-simple-toasts";

export function MapControllCopyData() {
    const [openCopyData, setCopyData] = useDisclosure(false);
    const [selectedDateCopyData, setSelectedDateCopyData] = useState<string>("");

    return <>
        <Button onClick={setCopyData.open} compact>copy data</Button>
        <Modal opened={openCopyData} onClose={setCopyData.close}>
          <Flex direction={"row"} justify={"space-between"}>
            <DatePicker
              onChange={(val) => {
                if (val) {
                  setSelectedDateCopyData(moment(val).format("YYYY-MM-DD"));
                }
              }}
            />
            <Stack spacing={0}>
              <Text>From</Text>
              <Text>{sSelectedDate.value}</Text>
              <Text>To</Text>
              <Text>
                {!_.isEmpty(selectedDateCopyData) && selectedDateCopyData}
              </Text>

              {!_.isEmpty(selectedDateCopyData) &&
                moment(selectedDateCopyData).diff(
                  moment(sSelectedDate.value),
                  "days"
                ) > 0 && (
                  <Button
                    onClick={async () => {
                      const res = await fetch(
                        `/api/copy-data?from=${sSelectedDate.value}&to=${selectedDateCopyData}`
                      );

                      if (res.status != 201) return toast("error");
                      toast("success");
                    }}
                  >
                    Proccess
                  </Button>
                )}
            </Stack>
          </Flex>
        </Modal>
    </>

}
    