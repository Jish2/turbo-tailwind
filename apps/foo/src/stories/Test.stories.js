import { Baz } from '@ui/baz';

const meta = {
  title: 'Example/Button',
  component: Baz,
  parameters: {
    layout: 'centered',
  }
}

export default meta;

export const Test = {
  parameters: {
    nextjs: {
      appDirectory: true,
      // navigation: {
      //   pathname: '/profile',
      //   query: {
      //     user: '1',
      //   },
      // },
    },
  },
};
