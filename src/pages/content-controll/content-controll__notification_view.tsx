import { funcLoadNotification } from "@/fun_load/func_load_notification";
import { api } from "@/lib/api";
import { sListNotification } from "@/s_state/s_list_notification";
import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { MdDelete } from "react-icons/md";
import toast from "react-simple-toasts";

const NotifView = () => {
  const onDelete = (id: number) => {
    fetch(api.apiUtilNotificationDelete + `?id=${id}`, {
      method: "DELETE",
    }).then((v) => {
      if (v.status == 201) {
        toast("success");
        funcLoadNotification();
      }
    });
  };
  return (
    <>
      <Stack p={"md"}>
        {sListNotification.value.map((v) => (
          <Stack key={v.id} spacing={0} p={4} pb={4} bg={"blue.1"}>
            <Text fw={"bold"}>{v.title}</Text>
            <Text fz={12}>{v.createdAt.split("T")[0]}</Text>
            <Text fz={12}>{v.des}</Text>
            <Group position="right">
              <ActionIcon onClick={() => onDelete(v.id)}>
                <MdDelete />
              </ActionIcon>
            </Group>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default NotifView;
