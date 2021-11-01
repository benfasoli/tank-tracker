import { useEffect, useState } from 'react';

import Button from './Button';
import FormRow from './FormRow';
import FormSectionHeader from './FormSectionHeader';
import { TankRecord } from '../lib/tanks';
import api from '../lib/api';
import { formatDate } from '../lib/date';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';

type FieldData = {
  key: string;
  name: string;
  unit?: string;
  disabled?: boolean;
  wide?: boolean;
};

const aboutFields: FieldData[] = [
  {
    key: 'serial',
    name: 'Serial number',
    disabled: true,
  },
  {
    key: 'updatedAt',
    name: 'Last updated',
    disabled: true,
  },
  { key: 'fillId', name: 'Fill ID' },
  { key: 'pressure', name: 'Pressure' },
  { key: 'location', name: 'Location', wide: true },
  { key: 'owner', name: 'Owner', wide: true },
  {
    key: 'comment',
    name: 'Comments',
    wide: true,
  },
];

const co2Fields: FieldData[] = [
  {
    key: 'co2',
    name: 'Mole fraction',
    unit: 'X2019 ppm',
  },
  { key: 'co2Stdev', name: 'Standard deviation', unit: 'ppm' },
  { key: 'co2Sterr', name: 'Standard error', unit: 'ppm' },
  { key: 'co2N', name: 'N' },
  { key: 'co2RelativeTo', name: 'Relative to', wide: true },
  {
    key: 'co2CalibrationFile',
    name: 'Calibration file',
    wide: true,
  },
  { key: 'co2InstrumentId', name: 'Instrument ID', wide: true },
];

const ch4Fields: FieldData[] = [
  {
    key: 'ch4',
    name: 'Mole fraction',
    unit: 'ppm',
  },
  { key: 'ch4Stdev', name: 'Standard deviation', unit: 'ppm' },
  { key: 'ch4Sterr', name: 'Standard error', unit: 'ppm' },
  { key: 'ch4N', name: 'N' },
  { key: 'ch4RelativeTo', name: 'Relative to', wide: true },
  {
    key: 'ch4CalibrationFile',
    name: 'Calibration file',
    wide: true,
  },
  { key: 'ch4InstrumentId', name: 'Instrument ID', wide: true },
];

const coFields: FieldData[] = [
  {
    key: 'co',
    name: 'Mole fraction',
    unit: 'ppb',
  },
  { key: 'coStdev', name: 'Standard deviation', unit: 'ppb' },
  { key: 'coSterr', name: 'Standard error', unit: 'ppb' },
  { key: 'coN', name: 'N' },
  { key: 'coRelativeTo', name: 'Relative to', wide: true },
  {
    key: 'coCalibrationFile',
    name: 'Calibration file',
    wide: true,
  },
  { key: 'coInstrumentId', name: 'Instrument ID', wide: true },
];

const d13cFields: FieldData[] = [
  {
    key: 'd13c',
    name: 'Isotope ratio',
    unit: '‰',
  },
  { key: 'd13cStdev', name: 'Standard deviation', unit: '‰' },
  { key: 'd13cSterr', name: 'Standard error', unit: '‰' },
  { key: 'd13cN', name: 'N' },
  {
    key: 'ottoCalibrationFile',
    name: 'OTTO calibration file',
    wide: true,
  },
];

const d18oFields: FieldData[] = [
  {
    key: 'd18o',
    name: 'Isotope ratio',
    unit: '‰',
  },
  { key: 'd18oStdev', name: 'Standard deviation', unit: '‰' },
  { key: 'd18oSterr', name: 'Standard error', unit: '‰' },
  { key: 'd18oN', name: 'N' },
  {
    key: 'ottoCalibrationFile',
    name: 'OTTO calibration file',
    wide: true,
  },
];

type EditFormProps = {
  defaultTank: TankRecord;
};

const EditForm = ({ defaultTank }: EditFormProps) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const [tank, setTank] = useState({
    ...defaultTank,
    updatedAt: formatDate(defaultTank.updatedAt),
  });

  useEffect(() => {
    const listener = (event) => {
      if (event.metaKey && event.key === 's') {
        event.preventDefault();
        handleFormSubmit(event);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const handleEmptyTank = (event) => {
    event.preventDefault();

    const keepFields = [
      'updatedAt',
      'tankId',
      'userId',
      'serial',
      'location',
      'owner',
    ];
    const nextTank = tank;
    for (const key of Object.keys(tank)) {
      if (!keepFields.includes(key)) {
        nextTank[key] = '';
      }
    }
    setTank({ ...nextTank });

    toast('Cleared fields but you still have to save.', {
      icon: '🤓',
    });
  };

  const handleUpdateTank = (key: string, value: any) => {
    setTank({ ...tank, [key]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);

    const tankRecord = {
      ...tank,
      updatedAt: new Date(),
      userId: String(session.login),
    };

    await toast.promise(
      api.post(tankRecord).then(() => mutate('/api/tanks')),
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
        title="About"
        subtitle={
          <>
            General information about tank <b>{tank.tankId}</b>.
          </>
        }
        right={
          <Button onClick={handleEmptyTank} type="button">
            Empty
          </Button>
        }
      />
      {aboutFields.map((field, index) => (
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

      <FormSectionHeader
        title="Carbon dioxide"
        subtitle={
          <>
            Calibration statistics for CO<sub>2</sub> mole fractions.
          </>
        }
      />
      {co2Fields.map((field, index) => (
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

      <FormSectionHeader
        title="Methane"
        subtitle={
          <>
            Calibration statistics for CH<sub>4</sub> mole fractions.
          </>
        }
      />
      {ch4Fields.map((field, index) => (
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

      <FormSectionHeader
        title="Carbon monoxide"
        subtitle="Calibration statistics for CO mole fractions."
      />
      {coFields.map((field, index) => (
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

      <FormSectionHeader
        title="δ13C"
        subtitle="Calibration statistics for δ18O:δ16C isotope ratio."
      />
      {d13cFields.map((field, index) => (
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

      <FormSectionHeader
        title="δ18O"
        subtitle="Calibration statistics for δ18O:δ16C isotope ratio."
      />
      {d18oFields.map((field, index) => (
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
          <Button type="button" onClick={handleFormSubmit}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
