'use client';

import { Box, Button, Heading, HStack, Input, Text } from '@chakra-ui/react';
import type { OperationResponse } from '@takuya-ichikawa/api-types';
import { ReactNode, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client';

type PostDetail = OperationResponse<'PostsController_findOne'>;

export function SearchPostForm(): ReactNode {
  const [searchId, setSearchId] = useState('');
  const [foundPost, setFoundPost] = useState<PostDetail | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    setSearchError(null);
    setFoundPost(null);
    if (!searchId.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'PostsController_findOne'> = {
        path: { id: Number(searchId) },
      };
      const data = await apiClient('PostsController_findOne', params);
      setFoundPost(data);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Not found');
    }
  };

  return (
    <Box mb={8} p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="md" mb={3}>
        Get Post by ID
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
      {foundPost !== null && (
        <Box p={3} bg="gray.50" borderRadius="md" mt={2}>
          <Text fontWeight="bold">
            #{foundPost.id} — {foundPost.title}
          </Text>
          {foundPost.content !== null && <Text color="gray.600">{foundPost.content}</Text>}
          <Text fontSize="sm" color="gray.400">
            {foundPost.published ? '公開' : '下書き'}
            {foundPost.authorId !== null ? ` · Author ID: ${String(foundPost.authorId)}` : ''}
          </Text>
        </Box>
      )}
    </Box>
  );
}
