'use client';

import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../db';

export interface IPlayer {
  forehead: string;
  id: string;
  name: string;
  timeCreated: number;
}

export interface IRemainingPlayer extends IPlayer {
  timeFinished: null;
}

export interface IFinishedPlayer extends IPlayer {
  timeFinished: number;
}


export default function usePlayerLists(gameID: string): null | [ReadonlyArray<IRemainingPlayer>, ReadonlyArray<IFinishedPlayer>] {
  const [remainingList, setRemainingList] = useState<ReadonlyArray<IRemainingPlayer> | null>(null);
  const [finishedList, setFinishedList] = useState<ReadonlyArray<IFinishedPlayer> | null>(null);

  useEffect(() => {
    const playersRef = ref(db, `games/${gameID}/players`);
    const removeOnValue = onValue(playersRef, (snapshot) => {
      const remaining: Array<IRemainingPlayer> = [];
      const finished: Array<IFinishedPlayer> = [];
      snapshot.forEach((snap: any) => {
        const player = { id: snap.key, ...snap.val() };
        if (player.timeFinished == null) {
          remaining.push(player);
        } else {
          finished.push(player);
        }
      });
      remaining.sort((a,b) => a.timeCreated - b.timeCreated);
      finished.sort((a,b) => a.timeFinished - b.timeFinished);
      setRemainingList(remaining);
      setFinishedList(finished);
    });
    return removeOnValue;
  }, [gameID]);

  return remainingList == null || finishedList == null ? null : [remainingList, finishedList];
}
