import { gSelectedView } from "@/g_state/g_dasboard";
import MentionByCategory from "@/Luxxn/MentionByCategory";
import { Text } from "@mantine/core";

const MentionbyCategory = () => {
    if(gSelectedView.value != "Mention By Category") return <></>
  return (
    <>
    <MentionByCategory/>
    </>
  );
};

export default MentionbyCategory;
