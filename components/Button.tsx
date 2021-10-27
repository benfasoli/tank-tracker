import tw from 'tailwind-styled-components';

type Props = {
  $block?: boolean;
  $large?: boolean;
  $primary?: boolean;
};

const Button = tw.button<Props>`
  ${(p) =>
    p.$primary
      ? 'bg-primary-600 hover:bg-primary-700'
      : 'bg-gray-800 hover:bg-gray-900'}
  ${(p) => (p.$large ? 'px-4 py-3 font-medium' : 'px-3 py-2 text-sm')}
  ${(p) => p.$block && 'w-full'}
  rounded-md
  flex
  space-x-2
  text-white
  whitespace-nowrap
`;

export default Button;
