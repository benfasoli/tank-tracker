import tw from 'tailwind-styled-components';

type Props = {
  $active?: boolean;
};

const TankPageNavItem = tw.span<Props>`
  ${(p) =>
    p.$active
      ? 'text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100'
      : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'}
  rounded-md
  px-3
  py-2
  text-sm
`;

export default TankPageNavItem;
