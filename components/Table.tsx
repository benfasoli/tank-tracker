import tw from 'tailwind-styled-components';

type Props = {};

const Table = tw.table<Props>`
  min-w-full
  divide-y
  divide-gray-200
`;

Table.defaultProps = {
  role: 'table',
};

export default Table;
