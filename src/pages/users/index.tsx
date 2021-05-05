import { useState } from 'react';
import Link from 'next/link';
import { Flex, Box, Heading, Text, Button, Icon, IconButton, Table, Thead, Tr, Th, Td, Tbody, Checkbox, Spinner, Link as LinkChakra, useBreakpointValue } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine, RiRefreshLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Sibebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { useUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

async function handlePrefetchUser(userId: string) {
  await queryClient.prefetchQuery(['user', userId], async () => {
    const response = await api.get(`users/${userId}`)

    return response.data;
  }, {
    staleTime: 1000 * 60 * 10, // 10 min
  })
}

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sibebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="6" />}
              {/* {!isLoading && !isFetching && <IconButton size="sm" ml="4" colorScheme="purple" aria-label="Refresh" icon={<Icon as={RiRefreshLine} />} onClick={() => refetch()} />} */}
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width={["4", "6", "8"]}>
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data cadastro</Th>}
                    <Th width="6"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <LinkChakra color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold">{user.name}</Text>
                            </LinkChakra>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td>
                          {isWideVersion ? (
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            >
                              Editar
                            </Button>
                          ) : (
                            <IconButton
                              as="a"
                              href="#"
                              size="sm"
                              fontSize="16"
                              colorScheme="purple"
                              aria-label="Open navigation"
                              icon={<Icon as={RiPencilLine} />}
                            />
                          )}
                        </Td>
                      </Tr>
                    )}
                  )}
                </Tbody>
              </Table>

              <Pagination totalCountOfRegisters={data.totalCount} currentPage={page} onPageChange={setPage} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}