import {
  ActionIcon,
  Center,
  HoverCard,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import AnimateCssReact from "animate-css-reactjs";

const SummaryHoverInfo = ({ text }: { text: string }) => {
  return (
    <>
      <HoverCard>
        <HoverCard.Target>
          <ActionIcon
            sx={{
              border: "2px solid white",
              borderRadius: "100px",
            }}
          >
            <Image src={"/icon_robot.svg"} alt={"icon"} width={24} />
          </ActionIcon>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack>
            <Center>
              <AnimateCssReact animation="bounce">
                <Image width={100} src={"/icon_robot.svg"} alt={"icon"} />
              </AnimateCssReact>
            </Center>
            <Text>{text}</Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};

export default SummaryHoverInfo;
