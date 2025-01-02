import { useState } from 'react';
import { Button, Card, Group, Modal, Stack, Text } from '@mantine/core';
import { IPlayer } from './usePlayerList';

export default function RemainingPlayer({
  isLocked,
  player,
}: {
  isLocked: boolean;
  player: IPlayer;
}) {
  const [isShown, setIsShown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinishing, setIsFinished] = useState(false);

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Stack gap={8}>
        <Text>
          {player.name} - {isShown ? player.forehead : '<Hidden>'}
        </Text>
        <Group gap="sm">
          <Button disabled={isLocked} onClick={() => setIsShown(!isShown)} size="compact-md">
            {isShown ? 'Hide' : 'Show'}
          </Button>
          <Button
            color="green"
            component="a"
            data-disabled={!isShown}
            href={`https://www.google.com/search?q=${player.forehead}`}
            onClick={(event) => {
              if (isShown) {
                return;
              }
              event.preventDefault();
            }}
            size="compact-md"
            target="_blank"
          >
            Google
          </Button>
          <Button color="violet" disabled={isLocked} onClick={() => setIsFinished(true)}>
            Done
          </Button>
          <Button color="red" disabled={isLocked} onClick={() => setIsDeleting(true)}>
            Delete
          </Button>
        </Group>
      </Stack>
      <Modal
        centered={true}
        onClose={() => setIsDeleting(false)}
        opened={isDeleting}
        title="Confirm Deletion"
      >
        Are you sure you want to delete {player.name}?
        <Group mt="lg" justify="flex-end">
          <Button onClick={() => setIsDeleting(false)}>Cancel</Button>
          <Button onClick={() => {}} color="red">
            Delete
          </Button>
        </Group>
      </Modal>
      <Modal
        centered={true}
        onClose={() => setIsFinished(false)}
        opened={isFinishing}
        title="Confirm Done"
      >
        Are you sure {player.name} is done?
        <Group mt="lg" justify="flex-end">
          <Button onClick={() => setIsFinished(false)}>Cancel</Button>
          <Button onClick={() => {}} color="violet">
            Done
          </Button>
        </Group>
      </Modal>
    </Card>
  );
}
