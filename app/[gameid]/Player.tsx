import { ReactNode, useState } from 'react';
import { ref, remove, update } from 'firebase/database';
import { Anchor, Button, Card, Group, Modal, Stack, Text } from '@mantine/core';
import { db } from '../db';
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
