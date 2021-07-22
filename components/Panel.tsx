import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

const Panel = ({ children, title }: Props) => {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden border">
      <div className="bg-gray-50 py-4 px-6 border-b">
        <h2 className="font-bold text-gray-700">{title}</h2>
      </div>
      <div className="py-4 px-6">{children}</div>
    </div>
  );
};

export default Panel;
