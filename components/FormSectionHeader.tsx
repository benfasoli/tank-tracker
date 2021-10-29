import { ReactElement } from 'react';

type FormSectionHeaderProps = {
  title: string;
  subtitle: ReactElement | string;
  right?: ReactElement;
};

const FormSectionHeader = ({
  title,
  subtitle,
  right,
}: FormSectionHeaderProps) => (
  <div className="flex justify-between mt-8 mb-5 space-x-6">
    <div>
      <h3 className="text-lg leading-6 font-bold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>
    </div>
    <div className="pt-3">{right}</div>
  </div>
);

export default FormSectionHeader;
