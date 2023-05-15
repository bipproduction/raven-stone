import PageTitle from "@/layouts/page_title";
import { Title } from "@mantine/core";
import { useAtom } from "jotai";
import { _val_list_emotion_view_province_couple } from "./_val_emotion_view_province_couple";
import { useShallowEffect } from "@mantine/hooks";
import { _fun_emotion_view_province_couple } from "./_fun_emotion_view_province_couple";

export default function _VieEmotionViewProvinceCoupleV2() {
  const [listEmotion, setListEmotion] = useAtom(
    _val_list_emotion_view_province_couple
  );

  useShallowEffect(() => {
    _fun_emotion_view_province_couple({ setListEmotion });
  }, []);
  return (
    <>
      <Title>Emotion View Province Couple V2</Title>
      {JSON.stringify(listEmotion)}
    </>
  );
}
