'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { IconLock, IconLockOpen } from '@tabler/icons-react';
import { ActionIcon, Grid } from '@mantine/core';
import RemainingPlayer from './RemainingPlayer';
import useGame from './useGame';
import usePlayerList from './usePlayerList';

export default function GamePage() {
  const { gameid: gameID } = useParams<{ gameid: string }>();

  const [isLocked, setIsLocked] = useState(false);

  const game = useGame(gameID);
  const playerList = usePlayerList(gameID);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'max-content',
          justifyContent: 'center',
          rowGap: 8,
        }}
      >
        {playerList?.map((player) => (
          <RemainingPlayer
            gameID={game?.id ?? ''}
            isLocked={isLocked}
            key={player.id}
            player={player}
          />
        ))}
      </div>
      {/* <Grid align="center" justify="center" style={{ rowGap: '8px' }}>
        <Grid.Col span="content">
          {playerList?.map((player) => (
            <RemainingPlayer isLocked={isLocked} key={player.id} player={player} />
          ))}
        </Grid.Col>
      </Grid> */}
      <ActionIcon
        onClick={() => setIsLocked(!isLocked)}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
        style={{ position: 'fixed', bottom: 8, right: 8, borderRadius: '100%' }}
      >
        {isLocked ? <IconLockOpen stroke={1.5} /> : <IconLock stroke={1.5} />}
      </ActionIcon>
    </>
  );
}
