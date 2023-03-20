import { gTop10District } from "@/g_state/g_top_10_district";
import { Table, Text } from "@mantine/core";
import _ from "lodash";

const Top10DistrictbyConversation = () => {
  if (gTop10District.value && !gTop10District.value[0]) return <></>;
  return (
    <>
      <Text>Top 10 District By Conversation</Text>
      <Table striped withBorder highlightOnHover>
        <thead>
          <tr>
            <th>No</th>
            {Object.keys(gTop10District.value[0]).map((v) => (
              <th key={v}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gTop10District.value.map((v, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              {Object.values(v).map((vv: any, ii) => (
                <td key={ii}>{_.isNaN(Number(vv))? vv: Intl.NumberFormat('id-ID').format(vv)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Top10DistrictbyConversation;
