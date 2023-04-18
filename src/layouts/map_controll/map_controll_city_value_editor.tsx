import { api } from "@/lib/api";
import { sCityValueTotal } from "@/s_state/s_city_value_total";
import { sListCity } from "@/s_state/s_list_city";
import {
  ActionIcon,
  Flex,
  Group,
  NumberInput,
  Pagination,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { IconEdit } from "@tabler/icons-react";
import _ from "lodash";
import { ChangeEventHandler } from "react";
import { MdSave, MdSearch } from "react-icons/md";
import toast from "react-simple-toasts";

const listCity = signal<any[]>([]);
const listCityBackup = signal<any[]>([]);

export function MapControllCityValueEditor() {
  const perPage = 15;
  useShallowEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    fetch(api.apiDevDevCityValueGet)
      .then((v) => v.json())
      .then((v: any[]) => {
        v.forEach((e) => {
          e.isSelected = false;
        });
        listCityBackup.value = v;
        onPagination(1);
      });
  }

  function onPagination(page: number) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    listCity.value = listCityBackup.value.slice(start, end);
  }

  async function onSave(body: any) {
    fetch(api.apiDevDevCityValueUpdate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (v) => {
      if (v.status === 201) {
        await loadData();
        return toast("success");
      }

      return toast("failed");
    });
  }

  function onSearch(text: string) {
    let data = _.clone(
      listCityBackup.value.filter((v) =>
        _.lowerCase(v.name).includes(_.lowerCase(text))
      )
    );
    listCity.value = data;
  }
  return (
    <>
      <Stack p={"md"}>
        <Title>City Value Editor</Title>
        <Group>
          <TextInput
            onChange={(val) => onSearch(val.currentTarget.value)}
            placeholder="search"
            icon={<MdSearch />}
          />
        </Group>
        <Table>
          <thead>
            <tr
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                backgroundColor: "white",
              }}
            >
              <th>{""}</th>
              <th>
                <Title order={5}>No</Title>
              </th>
              <th>
                <Title order={5}>Name</Title>
              </th>
              <th>
                <Title order={5}>Value</Title>
              </th>
            </tr>
          </thead>
          <tbody>
            {listCity.value.map((v, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: v.isSelected ? "lightgray" : "white",
                }}
              >
                <td>
                  <Flex gap={"lg"}>
                    <ActionIcon
                      variant="outline"
                      size={24}
                      onClick={() => {
                        listCity.value[i].isSelected =
                          !listCity.value[i].isSelected;
                        listCity.value = _.clone(listCity.value);
                      }}
                    >
                      <IconEdit color="orange" size={24} />
                    </ActionIcon>
                    {v.isSelected && (
                      <ActionIcon
                        size={24}
                        variant="outline"
                        onClick={() => onSave(v)}
                      >
                        <MdSave color="green" size={24} />
                      </ActionIcon>
                    )}
                  </Flex>
                </td>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>
                  {!v.isSelected ? (
                    <Text w={150}>
                      {Intl.NumberFormat("id-ID").format(v.value)}
                    </Text>
                  ) : (
                    <NumberInput
                      value={v.value}
                      w={150}
                      min={0}
                      placeholder={v.value}
                      onChange={(val) => {
                        listCity.value[i].value = val;
                        listCity.value = _.clone(listCity.value);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Group position="right">
          <Pagination onChange={onPagination} total={_.ceil(listCityBackup.value.length / perPage)} />
        </Group>
      </Stack>
    </>
  );
}
