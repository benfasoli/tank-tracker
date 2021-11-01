import { useEffect, useState } from 'react';

import Button from './Button';
import FormRow from './FormRow';
import FormSectionHeader from './FormSectionHeader';
import api from '../lib/api';
import { parseTankRecord } from '../lib/tanks';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

type FieldData = {
  key: string;
  name: string;
  unit?: string;
  disabled?: boolean;
  wide?: boolean;
};

const createFields: FieldData[] = [
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

  useEffect(() => {
    const listener = (event) => {
      if (event.metaKey && event.key === 's') {
        handleFormSubmit(event);
      }
    };
    addEventListener('keydown', listener);
    return () => {
      removeEventListener('keydown', listener);
    };
  });

  const handleUpdateTank = (key: string, value: any) => {
    setTank({ ...tank, [key]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const tankRecord = parseTankRecord({
      ...tank,
      updatedAt: new Date(),
      userId: String(session.login),
    });

    if (!tank.serial) {
      toast(String('Tank ID currently empty.'), {
        icon: '🤯',
      });
      return null;
    }

    if (!tank.tankId) {
      toast(String('Tank ID currently empty.'), {
        icon: '🤯',
      });
      return null;
    }

    await toast.promise(
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

  return (
    <form className="mt-10">
      <FormSectionHeader
        title="New tank"
        subtitle="Unique identifiers cannot be changed later."
      />

      {createFields.map((field, index) => (
        <FormRow
          key={index}
          value={tank[field.key] ? tank[field.key] : ''}
          name={field.name}
          unit={field?.unit}
          onInputChange={(event) =>
            handleUpdateTank(field.key, event.target.value)
          }
          wide={field.wide}
          disabled={field.disabled}
        />
      ))}

      <div className="pt-5 border-t border-gray-200">
        <div className="flex justify-end">
          <div>
            <Button type="button" onClick={handleFormSubmit}>
              Save
            </Button>
            <div className="hidden sm:block text-gray-400 text-xs text-center mx-auto my-2">
              ⌘ + s
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
