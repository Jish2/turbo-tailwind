// Does not find the package when hitting ctrl+click.
// This works if importing into a TypeScript file (see foo-typescript.tsx)
import { Card } from '@repo/ui';
import { Bar } from '@repo/ui/bar'

export function Foo() {
  return <Card ><Bar /></Card>;
}
