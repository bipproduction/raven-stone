import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { Navbar, Stack, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import Iframe from "react-iframe";

const DevTestIframeBoma = () => {
  const { ref, height, width } = useElementSize();
  return (
    <Stack h={"100vh"} ref={ref}>
      <Title>Test Iframe Boma</Title>

      <Navbar.Section grow bg={stylesGradient1}>
        <Iframe
          allowFullScreen
          frameBorder={0}
          loading="lazy"
          url="https://analytics.bomasatu.com"
          width="100%"
          height={`${height}px`}
          display="block"
          position="relative"
          scrolling="auto"
          allow="true"
          importance="auto"
        //   referrerpolicy="origin-when-cross-origin"
          //   referrerpolicy="unsafe-url"
          target="_self"
          //   sandbox="allow-same-origin"

          sandbox={[
            "allow-popups-to-escape-sandbox",
            "allow-top-navigation-by-user-activation",
            "allow-forms",
            "allow-modals",
            "allow-popups",
            "allow-same-origin",
            "allow-scripts",
            "allow-top-navigation",
          ]}
        />

        {/* <iframe height={height}  frameBorder={0}  width={width} src="https://analytics.bomasatu.com" /> */}
      </Navbar.Section>
    </Stack>
  );
};

export default DevTestIframeBoma;
