'use client';

import { useRouter } from 'next/navigation';
import { Anchor, List, Skeleton } from '@mantine/core';
import useGameList from './useGameList';

export default function GameCreator() {
  const router = useRouter();
  const gameList = useGameList();

  if (gameList == null) {
    return (
      <List>
        {Array.from({ length: 8 }, (_, idx) => (
          <List.Item key={idx}>
            <Skeleton height={8} mt={6} radius="xl" width={500} />
          </List.Item>
        ))}
      </List>
    );
  }

  return (
    <List>
      {gameList.map((game) => (
        <List.Item key={game.id}>
          <Anchor href={`/${game.id}`}>
            {game.name} - {new Date(game.timestamp).toLocaleString()}
          </Anchor>
        </List.Item>
      ))}
    </List>
  );
}
