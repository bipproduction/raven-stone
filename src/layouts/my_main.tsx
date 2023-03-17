import { Dock } from "primereact/dock";
import { MenuItem } from "primereact/menuitem";
import {
  MdAllInbox,
  MdBarChart,
  MdChat,
  MdGridView,
  MdMessage,
} from "react-icons/md";
import toast from "react-simple-toasts";
import { ActionIcon, Box, Stack, Text, Tooltip } from "@mantine/core";
import { useState } from "react";
import Summary from "./summary/summary";
import Medialistener from "./media_listener/media_listener";
import PredictiveAi from "./prodictive_ai/prodictive_ai";
import { gradient } from "@/styles/gradient";

const listmenu = [
  {
    label: "summary",
    id: "1",
    icon: MdGridView,
  },
  {
    label: "media listener",
    id: "2",
    icon: MdMessage,
  },
  {
    label: "predictive ai",
    id: "3",
    icon: MdBarChart,
  },
];

const listContent = [
  {
    id: "1",
    widget: Summary,
  },
  {
    id: "2",
    widget: Medialistener,
  },
  {
    id: "3",
    widget: PredictiveAi,
  },
];

const MyMain = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("1");
  return (
    <>
      <Stack>
        {listContent.map((v) => (
          <Box hidden={!(selectedMenu == v.id)} key={v.id}>
            {<v.widget />}
          </Box>
        ))}
        <Dock
          model={listmenu.map((v) => ({
            template: (
              <Stack
                spacing={0}
                justify={"center"}
                align= {"center"}
                onClick={() => {
                  setSelectedMenu(v.id);
                }}
              >
                <ActionIcon size={52} variant={"gradient"}>
                  <v.icon size={52} color={"white"} />
                </ActionIcon>
                <Text align="center" size={9}>{v.label}</Text>
              </Stack>
            ),
          }))}
        />
      </Stack>
    </>
  );
};

export default MyMain;
