// import { gProvince } from "@/g_state/g_province";
import { api } from "@/lib/api";
import { sProvince } from "@/s_state/s_province";
import { useShallowEffect } from "@mantine/hooks";

const LoadProvince = () => {
  useShallowEffect(() => {

    console.log("ini load province")
    fetch(api.apiUtilGetProvince)
      .then((v) => v.json())
      .then(v => {
        sProvince.value = v
      });
  }, []);
  return <></>;
};

export default LoadProvince;
