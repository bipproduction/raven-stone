import { Box, Divider, Group, Text } from '@mantine/core';
import _ from 'lodash';
import React from 'react';

export const PageSubTitle = ({ text1, text2 }: { text1: string, text2: string }) => {
  const now = new Date();
  const bulan = now.toLocaleString('default', { month: 'long' })
  const dateFull = now.getDate() + ' ' + bulan + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ', GMT+8'
  return (
    <>
      <Box p={30}>
        <Group position='apart' pt={10}>
          <Group spacing={8}>
            <Text color='white' fw={700} fz={30}>{text1}</Text>
            <Text color='white' fz={30}>{text2}</Text>
          </Group>
          <Group pt={13}>
            <Text fz={12} fw={700} color='white'>
              {dateFull}
            </Text>
          </Group>
        </Group>
        <Box pt={10}>
          <Divider color='gray' my={"sm"} />
        </Box>
      </Box>
    </>
  );
}

export default PageSubTitle;
