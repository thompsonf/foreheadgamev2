'use client';

import { Suspense, useState } from 'react';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { IconLock, IconLockOpen } from '@tabler/icons-react';
import { ref, remove } from 'firebase/database';
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Grid,
  Group,
  Loader,
  Modal,
  Title,
} from '@mantine/core';
import { db } from '../db';
import FinishedPlayer from './FinishedPlayer';
import PlayerCreator from './PlayerCreator';
import RemainingPlayer from './RemainingPlayer';
import useGame from './useGame';
import usePlayerList from './usePlayerList';

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
  const playerList = usePlayerList(gameID);

  if (game == null || playerList == null) {
    return <Loader />;
  }

  const remaining = [];
  const finished = [];

  for (const player of playerList) {
    if (player.timeFinished == null) {
      remaining.push(player);
    } else {
      finished.push(player);
    }
  }

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
          <Button color="red" onClick={() => setIsDeleting(true)}>
            Delete Game
          </Button>
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
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {remaining.map((player) => (
            <RemainingPlayer
              gameID={game?.id ?? ''}
              isLocked={isLocked}
              key={player.id}
              player={player}
            />
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
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {finished.map((player) => (
            <FinishedPlayer
              gameID={game?.id ?? ''}
              isLocked={isLocked}
              key={player.id}
              player={player}
            />
          ))}
        </div>
        <ActionIcon
          onClick={() => setIsLocked(!isLocked)}
          variant="default"
          size="xl"
          aria-label={isLocked ? 'Unlock' : 'Lock'}
          style={{ position: 'fixed', bottom: 8, right: 8, borderRadius: '100%' }}
        >
          {isLocked ? <IconLockOpen stroke={1.5} /> : <IconLock stroke={1.5} />}
        </ActionIcon>
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
