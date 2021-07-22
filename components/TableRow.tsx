import tw from 'tailwind-styled-components';

type Props = {};

const TableRow = tw.tr<Props>`
  p-2
`;

TableRow.defaultProps = {
  role: 'row',
};

export default TableRow;
