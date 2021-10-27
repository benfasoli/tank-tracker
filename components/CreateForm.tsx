import Button from './Button';
import Container from './Container';
import api from '../lib/api';
import { parseTankRecord } from '../lib/tanks';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const aboutFields = [
  {
    key: 'serial',
    name: 'Serial number',
  },
  {
    key: 'tankId',
    name: 'Tank ID',
  },
];

const CreateForm = () => {
  const { data: session } = useSession();
  const [tank, setTank] = useState({ serial: '', tankId: '' });

  const handleUpdateTank = (key: string, value: any) => {
    setTank({ ...tank, [key]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    scrollTo(0, 0);

    const tankRecord = parseTankRecord({
      ...tank,
      updatedAt: new Date(),
      userId: String(session.login),
    });

    toast.promise(
      api
        .post(tankRecord)
        .then(
          () => (location.href = `/tanks/${encodeURIComponent(tank.tankId)}`)
        ),
      {
        loading: `Saving record for ${tankRecord.tankId}`,
        success: 'Successfully updated tank.',
        error: 'Failed to update tank.',
      }
    );
  };

  const renderField = (field) => (
    <div
      key={field.key}
      className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-100 sm:pt-5">
      <label
        htmlFor={field.key}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
        {field.name}
      </label>
      <div
        className={`mt-1 sm:mt-0 cccol-span-2 ${
          field.wide ? 'col-span-2' : 'col-span-1'
        }`}>
        <input
          type="text"
          name={field.key}
          id={field.key}
          className={`max-w-lg w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
            field.disabled ? 'border-transparent' : 'border-gray-300 shadow-sm'
          } ${field.wide || 'sm:max-w-xs'}`}
          value={tank[field.key] ? tank[field.key] : ''}
          onChange={(event) => handleUpdateTank(field.key, event.target.value)}
        />
      </div>
      {field.unit && (
        <span className="hidden sm:block text-xs font-medium text-gray-500 sm:mt-px sm:pt-2">
          {field.unit}
        </span>
      )}
    </div>
  );

  return (
    <Container>
      <form
        className="space-y-6 divide-y divide-gray-200"
        onSubmit={handleFormSubmit}>
        <div className="mt-2 space-y-8">
          <div>
            <h3 className="text-lg leading-6 font-bold text-gray-900">
              New tank
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Unique identifiers cannot be changed later.
            </p>

            <div className="mt-6 space-y-6">{aboutFields.map(renderField)}</div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end space-x-2">
            <Button type="submit">Create</Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default CreateForm;
