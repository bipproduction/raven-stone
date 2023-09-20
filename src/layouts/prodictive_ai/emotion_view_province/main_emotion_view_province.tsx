import PageTitle from "@/layouts/page_title";
import { FrontEmotionalViewViaProvince } from "./front/front_emotional_via_province";
import { Stack, Text } from "@mantine/core";
import { FrontDetailKabupaten } from "./front/front_detail_kabupaten";
import { useAtom } from "jotai";
import { val_selected_menu_id } from "./front/val/val_selected_menu_id";
import useTranslate from 'next-translate/useTranslation'
import PageSubTitle from "@/global/components/PageSubTitle";

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
  const {t,lang} = useTranslate();
  return (
    <>
      <Stack spacing={"lg"}>
        {/* <PageTitle title={t('common:emotional_view_via_province')} /> */}
        <PageSubTitle text1="REGIONAL" text2="INSIGHTS"/>
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
