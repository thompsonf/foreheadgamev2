'use client';

import { Stack, Title } from '@mantine/core';
import ColorSchemeSwitcher from './ColorSchemeSwitcher';
import FloatingControls from './FloatingControls';
import GameCreator from './GameCreator';
import GameList from './GameList';

export default function HomePage() {
  return (
    <Stack align="center">
      <Title order={1}>Forehead Game</Title>
      <GameCreator />
      <GameList />
      <FloatingControls>
        <ColorSchemeSwitcher />
      </FloatingControls>
    </Stack>
  );
}
