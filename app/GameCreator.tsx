'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { push, ref } from 'firebase/database';
import { Button, Group, TextInput } from '@mantine/core';
import { db } from './db';

export default function GameCreator() {
  const [name, setName] = useState('');

  const router = useRouter();

  const onCreate = async () => {
    const result = await push(ref(db, 'games'), {
      timestamp: Date.now(),
      name,
    });
    router.push(`/${result.key}`);
  };

  return (
    <Group gap={8}>
      <TextInput
        placeholder="Create a new game"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onCreate();
          }
        }}
      />
      <Button onClick={onCreate}>Create</Button>
    </Group>
  );
}
