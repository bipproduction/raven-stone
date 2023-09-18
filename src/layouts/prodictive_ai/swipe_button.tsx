// import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
// import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { sSelectedCandidate1 } from "@/s_state/s_selected_candidate1";
import { sSelectedCandidate2 } from "@/s_state/s_selected_candidate2";
import { ActionIcon } from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import _ from "lodash";
import { MdSwapHoriz } from "react-icons/md";

const SwipeButton = ({ update }: { update: () => void }) => {
  //   const update = useForceUpdate();
  return (
    <>
      <ActionIcon
        size={42}
        onClick={() => {
          const candidate1 = _.clone(sSelectedCandidate2.value);
          const candidate2 = _.clone(sSelectedCandidate1.value);
          sSelectedCandidate1.value = candidate1
          sSelectedCandidate2.value = candidate2
          // sSelectedCandidate1.set(candidate2);
          // sSelectedCandidate2.set(candidate1);
          // update();

          // console.log(sSelectedCandidate1.value, sSelectedCandidate2.value)
        }}
      >
        <MdSwapHoriz size={42} color={"navi"} />
      </ActionIcon>
    </>
  );
};

export default SwipeButton;
