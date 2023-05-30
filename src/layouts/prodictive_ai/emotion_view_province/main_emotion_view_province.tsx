import PageTitle from "@/layouts/page_title";
import { FrontEmotionalViewViaProvince } from "./front/front_emotional_via_province";
import { Stack, Text } from "@mantine/core";
import { FrontDetailKabupaten } from "./front/front_detail_kabupaten";
import { useAtom } from "jotai";
import { val_selected_menu_id } from "./front/val/val_selected_menu_id";

const listMenu = [
  {
    title: "Emotion View Province",
    id: "1",
    view: FrontEmotionalViewViaProvince,
  },
  {
    title: "Detail Kabupaten",
    id: "2",
    view: FrontDetailKabupaten,
  },
];

export function MainEmotionViewProvince() {
  const [selectedMenu, setSelectedMenu] = useAtom(val_selected_menu_id);
  return (
    <>
      <Stack spacing={"lg"}>
        <PageTitle title={"Emotion View Province"} />
        {(() => {
          const View = listMenu.find((v) => v.id === selectedMenu)!.view;
          return (
            <>
              <View />
            </>
          );
        })()}
      </Stack>
    </>
  );
}
