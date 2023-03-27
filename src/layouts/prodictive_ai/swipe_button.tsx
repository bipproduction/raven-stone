import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
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
          const candidate1 = _.clone(gSelectedCandidate1.value);
          const candidate2 = _.clone(gSelectedCandidate2.value);
          gSelectedCandidate1.set(candidate2);
          gSelectedCandidate2.set(candidate1);
          update();
        }}
      >
        <MdSwapHoriz size={42} color={"navi"} />
      </ActionIcon>
    </>
  );
};

export default SwipeButton;
