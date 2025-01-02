import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { IPlayer } from './usePlayerList';

export default function RemainingPlayer({ player }: { player: IPlayer }) {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Stack>
        <Text>
          {player.name} - {player.forehead}
        </Text>
        <Group gap="sm">
          <Button size="compact-md">Show</Button>
          <Button size="compact-md">Google</Button>
        </Group>
      </Stack>
    </Card>
  );
}
