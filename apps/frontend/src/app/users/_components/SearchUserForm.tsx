'use client';

import { Box, Button, Heading, HStack, Input, Text } from '@chakra-ui/react';
import type { OperationResponse } from '@takuya-ichikawa/api-types';
import { ReactNode, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client';

type UserDetail = OperationResponse<'UsersController_findOne'>;

export function SearchUserForm(): ReactNode {
  const [searchId, setSearchId] = useState('');
  const [foundUser, setFoundUser] = useState<UserDetail | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    setSearchError(null);
    setFoundUser(null);
    if (!searchId.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'UsersController_findOne'> = {
        path: { id: Number(searchId) },
      };
      const data = await apiClient('UsersController_findOne', params);
      setFoundUser(data);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Not found');
    }
  };

  return (
    <Box mb={8} p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="md" mb={3}>
        Get User by ID
      </Heading>
      <HStack gap={2} mb={2}>
        <Input
          placeholder="id"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
          }}
          maxW="120px"
        />
        <Button onClick={() => void handleSearch()}>GET</Button>
      </HStack>
      {searchError !== null && <Text color="red.500">{searchError}</Text>}
      {foundUser !== null && (
        <Box p={3} bg="gray.50" borderRadius="md" mt={2}>
          <Text>
            #{foundUser.id} — {foundUser.email}
            {foundUser.name !== null ? ` (${foundUser.name})` : ''}
          </Text>
        </Box>
      )}
    </Box>
  );
}
