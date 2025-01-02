import { Children, PropsWithChildren } from 'react';

export default function FloatingControls({ children }: PropsWithChildren<{}>) {
  return <div style={{ position: 'fixed', bottom: 8, right: 8 }}>{Children.toArray(children)}</div>;
}
