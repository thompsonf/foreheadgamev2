import { Children, PropsWithChildren } from 'react';

export default function FloatingControls({ children }: PropsWithChildren<{}>) {
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 }}>{Children.toArray(children)}</div>
  );
}
