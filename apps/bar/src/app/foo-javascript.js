import { Bar } from '@repo/ui/bar';
import { Card } from '@repo/ui/ts/card';

import { Baz } from '@ui/baz';

export const Foo = () => {
  return (
    <Card >
      <Bar />
      <Baz />
    </Card>
  );
}
