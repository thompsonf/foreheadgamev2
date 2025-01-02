'use client';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, Stack, Title, useMantineColorScheme } from '@mantine/core';
import GameCreator from './GameCreator';
import GameList from './GameList';
import useGameList from './useGameList';

export default function HomePage() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const gameList = useGameList();
  return (
    <Stack align="center">
      <Title order={1}>Forehead Game</Title>
      <GameCreator />
      <GameList />
      <ActionIcon
        onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
        variant="default"
        size="xl"
        aria-label={colorScheme === 'dark' ? 'Use light color scheme' : 'Use dark color scheme'}
        style={{ position: 'fixed', bottom: 8, right: 8, borderRadius: '100%' }}
      >
        {colorScheme === 'dark' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
      </ActionIcon>
    </Stack>
  );
}
