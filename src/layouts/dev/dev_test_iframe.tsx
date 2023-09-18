import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { Navbar, Stack, Text, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Iframe from "react-iframe";

const DevTestIframe = () => {
    const {ref, height, width} = useElementSize()
  return (
    <>
      <Stack h={"100vh"} >
        <Title>Test Iframe</Title>

        <Navbar.Section grow bg={stylesGradient1} ref={ref}>
          <Iframe
            allowFullScreen
            frameBorder={0}
            loading="lazy"
            url="https://analytics.kazee.co.id/"
            width="100%"
            height={`${height}px`}
            display="block"
            position="relative"
            allow="true"
            importance="auto"
            // referrerpolicy="unsafe-url"
            target="_self"
          />
        </Navbar.Section>
      </Stack>
    </>
  );
};

export default DevTestIframe;
