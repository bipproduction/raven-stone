import { Button, Drawer, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const MapTimeMachine = () => {
    const [open, setOpen] = useDisclosure(false)
  return (
    <>
      <Button compact>Time Machine</Button>
      <Drawer opened={open} onClose={setOpen.close}>

      </Drawer>
    </>
  );
};

export default MapTimeMachine;
