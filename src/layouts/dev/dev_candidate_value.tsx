import { api } from "@/lib/api";
import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  NavLink,
  Pagination,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  useIntersection,
  usePagination,
  useShallowEffect,
} from "@mantine/hooks";
import _ from "lodash";
import { useRef, useState } from "react";
import { Spreadsheet } from "react-spreadsheet";

const listMenu = [
  {
    id: "1",
    title: "seeder",
    view: Seeder,
  },
  {
    id: "2",
    title: "controll",
    view: Controll,
  },
];

export default function DevCandidateValue() {
  const [pageMenu, setpageMenu] = useState("1");

  useShallowEffect(() => {
    const pg = localStorage.getItem("page_menu");
    if (pg) {
      setpageMenu(pg);
    }
  }, []);

  const onSetPage = (id: string) => {
    localStorage.setItem("page_menu", id);
    setpageMenu(id);
  };
  return (
    <div>
      <Flex>
        <Box w={200} bg={"gray.2"} h={"100vh"}>
          <Title>Menu</Title>
          {listMenu.map((item) => (
            <NavLink
              bg={pageMenu == item.id ? "blue.1" : ""}
              onClick={() => onSetPage(item.id)}
              label={item.title}
              key={item.id}
            />
          ))}
        </Box>
        <Box bg={"bray.0"}>
          {listMenu.map((item) => (
            <Box key={item.id} hidden={item.id != pageMenu}>
              <item.view />
            </Box>
          ))}
        </Box>
      </Flex>
    </div>
  );
}

function Seeder() {
  const [listData, setlistData] = useState<any[] | undefined>(undefined);
  const [listTampil, setListTampil] = useState<any[] | undefined>(undefined);
  const [perPage, setPerPage] = useState(10);
  const [header, setHeader] = useState<any[]>([]);

  useShallowEffect(() => {
    fetch(api.apiSeederSeederCandidateValueGet)
      .then((v) => v.json())
      .then((v: any[]) => {
        const data: any[] = v.map((vv) =>
          _.values(vv).map((vvv) => ({
            value: vvv,
          }))
        );
        const hd = _.keys(v[0]).map((v) => ({ value: v }));
        setHeader(hd);

        setlistData(data);
        const start = (1 - 1) * perPage;
        const end = start + perPage;
        const ls = _.slice(data, start, end);
        ls.unshift(hd);
        setListTampil(ls);
      });
  }, []);

  return (
    <>
      <Group position="apart">
        <Title>Seeder</Title>
        <ButtonSeedNow onClick={async () => {}} />
      </Group>
      {listTampil === undefined ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Spreadsheet data={listTampil} />
      )}
      {listData && (
        <Pagination
          total={_.ceil(listData!.length / perPage)}
          onChange={(v) => {
            const start = (v - 1) * perPage;
            const end = start + perPage;
            const ls = _.slice(listData, start, end);
            ls.unshift(header);
            setListTampil(ls);
          }}
        />
      )}
    </>
  );
}

const ButtonSeedNow = ({ onClick }: { onClick: () => Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  const onSeedNow = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
  return (
    <Button
      leftIcon={loading ? <Loader /> : null}
      disabled={loading}
      onClick={onSeedNow}
      compact
    >
      Seed now
    </Button>
  );
};

function Controll() {
  return (
    <>
      <Title>Controll</Title>
    </>
  );
}
