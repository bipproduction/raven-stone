import { gProvince } from "@/g_state/g_province";
import { api } from "@/lib/api";
import { useShallowEffect } from "@mantine/hooks";

const LoadProvince = () => {
  useShallowEffect(() => {

    console.log("ini load province")
    fetch(api.apiUtilGetProvince)
      .then((v) => v.json())
      .then(gProvince.set);
  }, []);
  return <></>;
};

export default LoadProvince;
