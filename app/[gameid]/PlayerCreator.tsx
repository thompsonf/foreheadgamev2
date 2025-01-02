import { useState } from 'react';
import { push, ref, set } from '@firebase/database';
import { Button, Group, TextInput, Title } from '@mantine/core';
import { db } from '../db';

export default function PlayerCreator({ gameID }: { gameID: string }) {
  const [name, setName] = useState('');
  const [forehead, setForehead] = useState('');

  const canCreate = name !== '' && forehead !== '';
  const onAdd = () => {
    setName('');
    setForehead('');
    set(push(ref(db, `games/${gameID}/players`)), {
      forehead,
      name,
      timeCreated: Date.now(),
      timeFinished: null,
    });
  };

  return (
    <div>
      <Title mb="xl" order={3}>
        Add Player
      </Title>
      <Group>
        <TextInput
          placeholder="Player name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter' && canCreate) {
              onAdd();
            }
          }}
        />
        <TextInput
          placeholder="Forehead"
          value={forehead}
          onChange={(event) => setForehead(event.currentTarget.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter' && canCreate) {
              onAdd();
            }
          }}
        />
        <Button disabled={!canCreate} onClick={onAdd}>
          Add
        </Button>
      </Group>
    </div>
  );
}
