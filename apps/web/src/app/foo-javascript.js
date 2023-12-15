// Does not find the package when hitting ctrl+click.
// This works if importing into a TypeScript file (see foo-typescript.tsx)
import { Bar } from '@repo/ui/'

export function Foo() {
  return <Bar />;
}
