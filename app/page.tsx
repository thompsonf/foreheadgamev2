'use client';

import { Stack, Title } from '@mantine/core';
import GameCreator from './GameCreator';
import GameList from './GameList';
import useGameList from './useGameList';

export default function HomePage() {
  const gameList = useGameList();
  return (
    <Stack align="center">
      <Title order={1}>Forehead Game</Title>
      <GameCreator />
      <GameList />
    </Stack>
  );
}
