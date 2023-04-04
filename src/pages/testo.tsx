import { useViewportSize } from "@mantine/hooks";
import Iframe from "react-iframe";

const Testo = () => {
    const {width, height} = useViewportSize()
  return (
    <>
      <Iframe
        url="https://games.cdn.famobi.com/html5games/z/zoo-boom/v2860/?fg_domain=play.famobi.com&fg_aid=A1000-100&fg_uid=5e772ebe-9e0a-4cd3-adcf-bba662f35535&fg_pid=5a106c0b-28b5-48e2-ab01-ce747dda340f&fg_beat=276&original_ref=https%3A%2F%2Fhtml5games.com%2F"
        width="100%"
        height={`${height}px`}
      />
    </>
  );
};

export default Testo;
