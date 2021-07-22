import tw from 'tailwind-styled-components';

type Props = {};

const TableBody = tw.tbody<Props>`
  divide-y
  divide-gray-200
  bg-white
`;

TableBody.defaultProps = {
  role: 'rowgroup',
};

export default TableBody;
