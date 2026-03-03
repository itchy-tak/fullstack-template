'use client';

import { Button, Card, CardSection, Group, Text, TextInput, Title } from '@mantine/core';
import type { OperationResponse } from 'api-types';
import { ReactNode, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client.server';

type AuthorDetail = OperationResponse<'AuthorsController_findOne'>;

export function SearchAuthorForm(): ReactNode {
  const [searchId, setSearchId] = useState('');
  const [foundAuthor, setFoundAuthor] = useState<AuthorDetail | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    setSearchError(null);
    setFoundAuthor(null);
    if (!searchId.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'AuthorsController_findOne'> = {
        path: { id: Number(searchId) },
      };
      const data = await apiClient('AuthorsController_findOne', params);
      setFoundAuthor(data);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Not found');
    }
  };

  return (
    <Card withBorder mb="lg">
      <CardSection withBorder inheritPadding py="xs" mb="sm">
        <strong>Get Author by ID</strong>
      </CardSection>
      <Group mb="xs">
        <TextInput
          placeholder="id"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
          }}
          style={{ width: 120 }}
        />
        <Button onClick={() => void handleSearch()}>GET</Button>
      </Group>
      {searchError !== null && (
        <Text c="red" size="sm">
          {searchError}
        </Text>
      )}
      {foundAuthor !== null && (
        <Card withBorder mt="xs">
          <Title order={4}>
            #{foundAuthor.id} — {foundAuthor.name}
          </Title>
        </Card>
      )}
    </Card>
  );
}
