import React from "react";
import { Box, Stack } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

export function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>1</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <PaginationItem isCurrent pageNumber={1}/>
        <PaginationItem pageNumber={2}/>
      </Stack>
    </Stack>
  )
}