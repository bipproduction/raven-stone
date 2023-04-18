import { api } from "@/lib/api";
import { sCityValueTotal } from "@/s_state/s_city_value_total";
import { sListCity } from "@/s_state/s_list_city";
import { ActionIcon, Flex, NumberInput, Table, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { IconEdit } from "@tabler/icons-react";
import _ from "lodash";
import { MdSave } from "react-icons/md";

const listCity = signal<any[]>([])

export function MapControllCityValueEditor() {

    useShallowEffect(() => {
        loadData()
    }, [])

    function loadData() {
        fetch(api.apiDevDevCityValueGet).then((v) => v.json()).then((v: any[]) => {
            v.forEach((e) => {
                e.isSelected = false
            });
            listCity.value = v
        })
    }

    function onSave(body: any) {
        fetch(api.apiDevCityValueUpdate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(v => {
            
        })
    }
    return <>
        <Title>City Value Editor</Title>
        <Table>
            <thead>
                <tr style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    backgroundColor: "white",
                }}>
                    <th>{""}</th>
                    <th><Title order={5}>No</Title></th>
                    <th><Title order={5}>Name</Title></th>
                    <th><Title order={5}>Value</Title></th>
                </tr>
            </thead>
            <tbody>
                {listCity.value.map((v, i) => (
                    <tr key={i} style={{
                        backgroundColor: v.isSelected ? "lightgray" : "white",
                    }}>
                        <td>
                            <Flex gap={"lg"}>
                                <ActionIcon variant="outline" size={24} onClick={() => {
                                    listCity.value[i].isSelected = !listCity.value[i].isSelected
                                    listCity.value = _.clone(listCity.value)
                                }}>
                                    <IconEdit color="orange" size={24} />
                                </ActionIcon>
                                {v.isSelected && (
                                    <ActionIcon size={24} variant="outline" onClick={() => (onSave(v))}>
                                        <MdSave color="green" size={24} />
                                    </ActionIcon>
                                )}
                            </Flex>
                        </td>
                        <td>{i + 1}</td>
                        <td>{v.name}</td>
                        <td>{!v.isSelected ? <Text w={150}>{Intl.NumberFormat("id-ID").format(v.value)}</Text> : <NumberInput w={150} min={0} placeholder={v.value} />}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
}