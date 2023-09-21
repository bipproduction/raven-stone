import { Button, Flex, Group, Paper, Select, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { v3_val_nation_wide_rating_list_candidate } from "../../val/v3_nation_wide_rating_list_candidate";
import { v3_fun_nation_wide_rating_load_list_candidate } from "../../fun/v3_fun_nation_wide_rating_load_list_candidate";
import { v3_val_nation_wide_rating_selected_candidate } from "../../val/v3_nation_wide_rating_selected_candidate";
import _ from "lodash";
import useTranslate from "next-translate/useTranslation";

export function V3ComNationWideRatingSelectCandidate({
  onProccess,
}: {
  onProccess: () => void;
}) {
  const [listCandidate, setListCandidate] = useAtom(
    v3_val_nation_wide_rating_list_candidate
  );
  const [selctedCandidate, setSelectedCandidate] = useAtom(
    v3_val_nation_wide_rating_selected_candidate
  );

  useShallowEffect(() => {
    v3_fun_nation_wide_rating_load_list_candidate({ setListCandidate });
  }, []);
  useShallowEffect(() => {
    v3_fun_nation_wide_rating_load_list_candidate({ setListCandidate });
  }, []);

  const { t, lang } = useTranslate();
  if (!listCandidate) return null;

  return (
    <>
      <Flex align="end" gap={"md"} >
        <Select
          w={300}
          key={Math.random()}
          placeholder={
            listCandidate.find(
              (v) => Number(v.id) == Number(selctedCandidate.candidate1Id)
            ).name
          }
          onChange={(val) => {
            setSelectedCandidate({
              candidate1Id: Number(val),
              candidate2Id: selctedCandidate.candidate2Id,
            });
          }}
          data={
            listCandidate?.map((v) => ({
              label: v.name,
              value: v.id,
            })) as any
          }
          label={<Text fw={"bolder"}>{t("common:candidate") + " 1"}</Text>}
          // placeholder="select candidate"
        />
        <Select
          w={300}
          key={Math.random()}
          data={
            listCandidate?.map((v) => ({
              label: v.name,
              value: v.id,
            })) as any
          }
          onChange={(val) => {
            setSelectedCandidate({
              candidate2Id: Number(val),
              candidate1Id: selctedCandidate.candidate1Id,
            });
          }}
          label={<Text fw={"bolder"}>{t("common:candidate") + " 2"}</Text>}
          placeholder={
            listCandidate.find(
              (v) => Number(v.id) == Number(selctedCandidate.candidate2Id)
            ).name
          }
        />
        <Button variant="white" radius={"xl"} onClick={onProccess}>
          <Text color="dark">{_.upperCase(t("common:generate"))}</Text>
        </Button>
      </Flex>
    </>
  );
}
