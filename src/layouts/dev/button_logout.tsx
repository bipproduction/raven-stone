import { gUser } from "@/g_state/auth/g_user";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MdAccountCircle } from "react-icons/md";

export const ButtonLogout = () => {
    const [open, setOpen] = useDisclosure(false);
  
    return (
      <>
        <Button leftIcon={<MdAccountCircle />} compact onClick={setOpen.open}>
          logout
        </Button>
        <Modal opened={open} onClose={setOpen.close}>
          <Text>Are you sure you want to logout ?</Text>
          <Group p={"md"} position={"apart"}>
            <Button onClick={setOpen.close}>No</Button>
            <Button
              onClick={() => {
                localStorage.removeItem("user_id");
                gUser.set({});
                setOpen.close();
              }}
            >
              Yes
            </Button>
          </Group>
        </Modal>
      </>
    );
  };

  export default ButtonLogout