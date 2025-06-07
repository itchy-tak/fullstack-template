'use client';

import { Box, Button, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

import { apiClient, type ApiClientParams } from '@/lib/api-client';

interface CreatePostFormProps {
  onCreated: () => void;
  onError: (message: string) => void;
}

export function CreatePostForm({ onCreated, onError }: CreatePostFormProps): ReactNode {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [published, setPublished] = useState(false);

  const handleCreate = async (): Promise<void> => {
    if (!title.trim()) {
      return;
    }
    try {
      const params: ApiClientParams<'PostsController_create'> = {
        body: {
          title,
          published,
          ...(content.trim() ? { content } : {}),
          ...(authorId.trim() ? { authorId: Number(authorId) } : {}),
        },
      };
      await apiClient('PostsController_create', params);
      setTitle('');
      setContent('');
      setAuthorId('');
      setPublished(false);
      onCreated();
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Create failed');
    }
  };

  return (
    <Box mb={8} p={5} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="md" mb={3}>
        Create Post
      </Heading>
      <VStack gap={2} align="stretch">
        <HStack gap={2}>
          <Input
            placeholder="title (required)"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Input
            placeholder="authorId (optional)"
            value={authorId}
            onChange={(e) => {
              setAuthorId(e.target.value);
            }}
            maxW="160px"
          />
        </HStack>
        <Input
          placeholder="content (optional)"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <HStack gap={2}>
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => {
                setPublished(e.target.checked);
              }}
            />{' '}
            Published
          </label>
          <Button colorPalette="blue" onClick={() => void handleCreate()} flexShrink={0}>
            POST
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
