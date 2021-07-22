import tw from 'tailwind-styled-components';

type Props = {
  muted?: boolean;
};

const TextIcon = tw.span<Props>`
  select-none
  ${(p) => (p.muted ? 'text-gray-300' : 'text-gray-400')}
  font-extralight
  font-mono
`;

export default TextIcon;
