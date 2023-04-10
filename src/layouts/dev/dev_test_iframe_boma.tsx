import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { Navbar, Stack, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Iframe from "react-iframe";

const DevTestIframeBoma = () => {
  const { ref, height, width } = useElementSize();
  return (
    <Stack h={"100vh"}>
      <Title>Test Iframe Boma</Title>

      <Navbar.Section grow bg={stylesGradient1} ref={ref}>
        {/* <Iframe
          allowFullScreen
          frameBorder={0}
          loading="lazy"
          url="https://analytics.bomasatu.com"
          width="100%"
          height={`${height}px`}
          display="block"
          position="relative"
          allow="true"
          importance="auto"
        //   referrerpolicy="unsafe-url"
          target="_self"
        /> */}

        <iframe height={height} frameBorder={0} allowFullScreen={true} width={width} src="https://analytics.bomasatu.com" />
      </Navbar.Section>
    </Stack>
  );
};

export default DevTestIframeBoma;
