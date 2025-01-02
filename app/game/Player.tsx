import { ReactNode } from 'react';
import { Anchor, Card, Stack, Text } from '@mantine/core';
import { IPlayer } from './usePlayerList';

export default function Player({
  content,
  isShown,
  player,
}: {
  content: ReactNode;
  isShown: boolean;
  player: IPlayer;
}) {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Stack gap={8}>
        <Text>
          {player.name} -{' '}
          <strong>
            {isShown ? (
              <Anchor href={`https://www.google.com/search?q=${player.forehead}`} target="_blank">
                {player.forehead}
              </Anchor>
            ) : (
              '<Hidden>'
            )}
          </strong>
        </Text>
        {content}
      </Stack>
    </Card>
  );
}
