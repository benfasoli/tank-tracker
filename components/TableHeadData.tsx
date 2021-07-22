import tw from 'tailwind-styled-components';

type Props = {};

const TableHeadData = tw.th<Props>`
  px-6
  py-3
  text-left
  text-xs
  font-medium
  text-gray-600
  tracking-wider
  whitespace-nowrap
`;

TableHeadData.defaultProps = {
  role: 'columnheader',
};

export default TableHeadData;
