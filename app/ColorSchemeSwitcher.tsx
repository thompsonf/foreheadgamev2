import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';

export default function ColorSchemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      variant="default"
      size="xl"
      aria-label={colorScheme === 'dark' ? 'Use light color scheme' : 'Use dark color scheme'}
      style={{ borderRadius: '100%' }}
    >
      {colorScheme === 'dark' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
    </ActionIcon>
  );
}
