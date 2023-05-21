import { ActionIcon, Flex, Stack, Title } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { useRouter } from "next/router";
import { MdArrowBackIos } from "react-icons/md";
import Embed from "react-embed";
import { NextRequest, NextResponse } from "next/server";

const Medialistener = ({ data }: any) => {
  const router = useRouter();
  const { ref, height, width } = useElementSize();

  return (
    <>
      {/* <Stack h={"100vh"} ref={ref}>
        <Flex p={"md"}>
          <ActionIcon onClick={() => router.push("/dashboard")}>
            <MdArrowBackIos size={24} />
          </ActionIcon>
        </Flex>

        <iframe
          height={height}
          frameBorder={0}
          width={"100%"}
          src="https://analytics.bomasatu.com"
        />
      </Stack> */}
    </>
  );
};

const kky =
  "XSRF-TOKEN=eyJpdiI6Im1TZXhOS0FvZUU2NWxXcVB3TEtwd1E9PSIsInZhbHVlIjoiT0N6YkhtaTZPc3o3Y3pCcEVONjZOdEpaRjFYeE1oNGN0WkpLQ2d0WWdWdSs1V1JkREVldUkwNXBzVnpqbDJiVEkwKzhKUi8xNHJ6VGhsZEZ3T0dQR0pzUzlrSEpxcHUvdDVnNURzTEVPTmNySWtvK0dvcTlwOXFkeHdPSjVIc1AiLCJtYWMiOiIzYTJlYzllYzYzZDY3ZjUwZTM5Yzk2ZGE4NTAzNmUyMGNkMDg5NTRkZDI4YjNjODVlYmU2YTA5N2RlNjE5YTkxIn0=; expires=Tue, 11-Apr-2090 08:10:22 GMT; Max-Age=7200; path=/; samesite=lax";
const kky2 =
  "kazee_sso_session=eyJpdiI6IjMwNWdnbGpwYnhrZGlhMWdESU5BOHc9PSIsInZhbHVlIjoiYmtDNFRKcFNETjcwYk41TXJFY2s3Y2ZXUG5sOHdMMHNaMFYwMlllNHVqbHcrVCtxR0ZReXl1R2ZsMlJJUzJmOXdlS3owUzlPMGFISExMaHJ6L2JtcytMcXVwK0g1bTZJVmNZMklKejQwdXRHS0U2VFVKRnN0NVZrZWVweHhBeG4iLCJtYWMiOiIzNDY0N2IzZDJlM2E0M2ZjNDg5NmUzZWFhMjAwMjYzNjRkZjkyYWZmMWRhM2E1YjBiMGRlNGE5MzRlZDRkMDg1In0=; expires=Tue, 11-Apr-2023 07:51:42 GMT; Max-Age=7200; path=/; httponly; samesite=lax";
export default Medialistener;

// get serverside props
export async function getServerSideProps(context: any) {
  context.res.setHeader("Set-Cookie", kky);
  return {
    props: {
      data: "apa",
    }, // will be passed to the page component as props
  };
}
