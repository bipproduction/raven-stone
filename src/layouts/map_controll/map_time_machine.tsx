import { Button, Drawer, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const MapTimeMachine = ({ dataKab }: { dataKab: any }) => {
  const [open, setOpen] = useDisclosure(false);
  return (
    <>
      <Button onClick={setOpen.open} compact>
        Time Machine
      </Button>
      <Drawer opened={open} onClose={setOpen.close} position="bottom">
        {JSON.stringify(dataKab)}
      </Drawer>
    </>
  );
};

export default MapTimeMachine;
