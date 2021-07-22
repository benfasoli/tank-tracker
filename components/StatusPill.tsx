import tw from 'tailwind-styled-components';

type Props = {
  color: string;
};

const StatusPill = tw.div<Props>`
  ${(p) => p.color === 'green' && 'bg-green-100 text-green-700'}
  ${(p) => p.color === 'orange' && 'bg-orange-100 text-orange-700'}
  ${(p) => p.color === 'red' && 'bg-red-100 text-red-700'}
  px-2
  py-0.5
  rounded-full
  inline-flex
  justify-center
  items-center
`;

export default StatusPill;
