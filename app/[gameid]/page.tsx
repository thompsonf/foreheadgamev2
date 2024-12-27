'use client';

import { useParams } from 'next/navigation';
import useGame from './useGame';
import usePlayerList from './usePlayerList';

export default function GamePage() {
  const { gameid: gameID } = useParams<{ gameid: string }>();

  const game = useGame(gameID);
  const playerList = usePlayerList(gameID);

  return (
    <div>
      <div>GameID is: {gameID}</div>
      <div style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(game, null, 2)}</div>
      <div style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(playerList, null, 2)}</div>
    </div>
  );
}
