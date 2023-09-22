import { Box, Divider, Group, Text, Title } from '@mantine/core';
import _ from 'lodash';
import React from 'react';

export const PageSubTitle = ({ text1, text2 }: { text1: string, text2: string }) => {
  const now = new Date();
  const bulan = now.toLocaleString('default', { month: 'long' })
  const dateFull = now.getDate() + ' ' + _.upperCase(bulan) + ' ' + now.getFullYear() + ' ' + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ', GMT+8'
  return (
    <>
      <Box p={30}>
        <Group position='apart' pt={10}>
          <Group spacing={15}>
            <Text color='white' fw={'bold'} fz={40}>{text1}</Text>
            <Text color='white' fz={40}>{text2}</Text>
          </Group>
          <Group pt={13}>
            <Text fz={20} fw={'bold'} color='white'>
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
