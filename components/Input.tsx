import tw from 'tailwind-styled-components';

const Input = tw.input`
max-w-lg
w-full
outline-none
focus:ring-1
focus:ring-primary-500
focus:border-primary-500
sm:text-sm
rounded-md
py-2
px-2
${(p) => (p.disabled ? 'ring-0' : 'border border-gray-300 shadow-sm')}
`;

export default Input;
