import tw from 'tailwind-styled-components';

type Props = {
  color: string;
};

const Outer = tw.span`
 w-3 h-3 rounded-full flex justify-center items-center
`;

const Inner = tw.span`bg-green-400 w-2 h-2 rounded-full flex`;

const StatusDot = ({ color }: Props) => {
  if (color === 'red') {
    return (
      <Outer className="bg-red-100">
        <Inner className="bg-red-400" />
      </Outer>
    );
  } else if (color === 'orange') {
    return (
      <Outer className="bg-orange-100">
        <Inner className="bg-orange-400" />
      </Outer>
    );
  } else if (color === 'green') {
    return (
      <Outer className="bg-green-100">
        <Inner className="bg-green-400" />
      </Outer>
    );
  } else {
    return (
      <Outer className="bg-gray-100">
        <Inner className="bg-gray-400" />
      </Outer>
    );
  }
};

export default StatusDot;
