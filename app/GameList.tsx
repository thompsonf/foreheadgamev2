'use client';

import { useRouter } from 'next/navigation';
import { Anchor, List, Skeleton } from '@mantine/core';
import useGameList from './useGameList';

export default function GameList() {
  const router = useRouter();
  const gameList = useGameList();

  if (gameList == null) {
    return (
      <List size="lg">
        {Array.from({ length: 8 }, (_, idx) => (
          <List.Item key={idx}>
            <Skeleton height={8} mt={6} radius="xl" width={500} />
          </List.Item>
        ))}
      </List>
    );
  }

  return (
    <List size="lg">
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
