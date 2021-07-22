import tw from 'tailwind-styled-components';

type Props = {};

const TableData = tw.td<Props>`
  px-4 py-2
  text-sm
  font-medium
  whitespace-nowrap
`;

TableData.defaultProps = {
  role: 'cell',
};

export default TableData;
