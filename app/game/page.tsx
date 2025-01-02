'use client';

import { Suspense, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { IconLock, IconLockOpen } from '@tabler/icons-react';
import { ref, remove } from 'firebase/database';
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  Stack,
  Title,
} from '@mantine/core';
import ColorSchemeSwitcher from '../ColorSchemeSwitcher';
import { db } from '../db';
import FloatingControls from '../FloatingControls';
import FinishedPlayer from './FinishedPlayer';
import PlayerCreator from './PlayerCreator';
import RemainingPlayer from './RemainingPlayer';
import useGame from './useGame';
import usePlayerLists from './usePlayerLists';

export default function GamePageWrapper() {
  return (
    <Suspense>
      <GamePage />
    </Suspense>
  );
}

function GamePage() {
  const params = useSearchParams();
  const gameID = params.get('id');

  if (gameID == null) {
    throw new Error('invalid game ID');
  }

  const [isLocked, setIsLocked] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const game = useGame(gameID);
  const playerLists = usePlayerLists(gameID);

  if (game == null || playerLists == null) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  const [remaining, finished] = playerLists;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: 20,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1000 }}>
        <Group justify="space-between">
          <div>
            <Title order={1}>{game.name}</Title>
            <Title order={2}>{new Date(game.timestamp).toLocaleString()}</Title>
          </div>
          {!isLocked && (
            <Button color="red" onClick={() => setIsDeleting(true)}>
              Delete Game
            </Button>
          )}
        </Group>
        <Divider my="md" />
        {!isLocked && (
          <>
            <PlayerCreator gameID={gameID} />
            <Divider my="md" />
          </>
        )}
        <Title mb="xl" order={3}>
          Remaining
        </Title>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 300px)',
            gap: 8,
          }}
        >
          {remaining.map((player) => (
            <RemainingPlayer gameID={game.id} isLocked={isLocked} key={player.id} player={player} />
          ))}
        </div>
        <Divider my="md" />
        <Title mb="xl" order={3}>
          Finished
        </Title>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, 300px)',
            gap: 8,
          }}
        >
          {finished.map((player) => (
            <FinishedPlayer gameID={game?.id} isLocked={isLocked} key={player.id} player={player} />
          ))}
        </div>
        <FloatingControls>
          <Stack>
            <ColorSchemeSwitcher />
            <ActionIcon
              onClick={() => setIsLocked(!isLocked)}
              variant="default"
              size="xl"
              aria-label={isLocked ? 'Unlock' : 'Lock'}
              style={{ borderRadius: '100%' }}
            >
              {isLocked ? <IconLockOpen stroke={1.5} /> : <IconLock stroke={1.5} />}
            </ActionIcon>
          </Stack>
        </FloatingControls>
        <Modal
          centered={true}
          onClose={() => setIsDeleting(false)}
          opened={isDeleting}
          title="Confirm Deletion"
        >
          Are you sure you want to delete <strong>{game.name}</strong>?
          <Group mt="lg" justify="flex-end">
            <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
            <Button
              onClick={() => {
                remove(ref(db, `games/${gameID}`));
                redirect('/');
              }}
              color="red"
            >
              Delete
            </Button>
          </Group>
        </Modal>
      </div>
    </div>
  );
}
