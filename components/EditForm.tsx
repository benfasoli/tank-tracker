import Button from './Button';
import Container from './Container';
import { TankRecord } from '../lib/tanks';
import api from '../lib/api';
import { formatDate } from '../lib/date';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const aboutFields = [
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
  { key: 'fillId', name: 'Fill ID', type: 'text' },
  { key: 'pressure', name: 'Pressure', type: 'number' },
  { key: 'location', name: 'Location', wide: true },
  { key: 'owner', name: 'Owner', wide: true },
  {
    key: 'comment',
    name: 'Comments',
    wide: true,
  },
];

const co2Fields = [
  {
    key: 'co2',
    name: 'Mole fraction',
    unit: 'ppm',
  },
  { key: 'co2Stdev', name: 'Standard deviation', unit: 'ppm' },
  { key: 'co2Sterr', name: 'Standard error', unit: 'ppm' },
  { key: 'co2N', name: 'N', type: 'number' },
  { key: 'co2RelativeTo', name: 'Relative to', wide: true },
  {
    key: 'co2CalibrationFile',
    name: 'Calibration file',
    wide: true,
  },
  { key: 'co2InstrumentId', name: 'Instrument ID', wide: true },
];

const ch4Fields = [
  {
    key: 'ch4',
    name: 'Mole fraction',
    unit: 'ppm',
  },
  { key: 'ch4Stdev', name: 'Standard deviation', unit: 'ppm' },
  { key: 'ch4Sterr', name: 'Standard error', unit: 'ppm' },
  { key: 'ch4N', name: 'N', type: 'number' },
  { key: 'ch4RelativeTo', name: 'Relative to', wide: true },
  {
    key: 'ch4CalibrationFile',
    name: 'Calibration file',
    wide: true,
  },
  { key: 'ch4InstrumentId', name: 'Instrument ID', wide: true },
];

const coFields = [
  {
    key: 'co',
    name: 'Mole fraction',
    unit: 'ppb',
  },
  { key: 'coStdev', name: 'Standard deviation', unit: 'ppb' },
  { key: 'coSterr', name: 'Standard error', unit: 'ppb' },
  { key: 'coN', name: 'N', type: 'number' },
  { key: 'coRelativeTo', name: 'Relative to', wide: true },
  {
    key: 'coCalibrationFile',
    name: 'Calibration file',
    wide: true,
  },
  { key: 'coInstrumentId', name: 'Instrument ID', wide: true },
];

const d13cFields = [
  {
    key: 'd13c',
    name: 'Mole fraction',
    unit: '‰',
  },
  { key: 'd13cStdev', name: 'Standard deviation', unit: '‰' },
  { key: 'd13cSterr', name: 'Standard error', unit: '‰' },
  { key: 'd13cN', name: 'N', type: 'number' },
  {
    key: 'ottoCalibrationFile',
    name: 'OTTO calibration file',
    wide: true,
  },
];

const d18oFields = [
  {
    key: 'd18o',
    name: 'Mole fraction',
    unit: '‰',
  },
  { key: 'd18oStdev', name: 'Standard deviation', unit: '‰' },
  { key: 'd18oSterr', name: 'Standard error', unit: '‰' },
  { key: 'd18oN', name: 'N', type: 'number' },
  {
    key: 'ottoCalibrationFile',
    name: 'OTTO calibration file',
    wide: true,
  },
];

type Props = {
  defaultTank: TankRecord;
};

const EditForm = ({ defaultTank }: Props) => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const [tank, setTank] = useState({
    ...defaultTank,
    updatedAt: formatDate(defaultTank.updatedAt),
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

    toast.promise(
      api.post(tankRecord).then(() => mutate('/api/tanks')),
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
          readOnly={field.disabled}
          disabled={field.disabled}
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
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                  About
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  General information about tank <b>{tank.tankId}</b>.
                </p>
              </div>
              <div className="pt-3">
                <Button onClick={handleEmptyTank}>Empty</Button>
              </div>
            </div>

            <div className="mt-6 space-y-6">{aboutFields.map(renderField)}</div>
          </div>

          <div>
            <div className="pt-8 space-y-6 sm:pt-10">
              <div>
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                  Carbon Dioxide
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Calibration statistics for CO<sub>2</sub> mole fractions.
                </p>
              </div>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              {co2Fields.map(renderField)}
            </div>
          </div>

          <div>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                  Methane
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Calibration statistics for CH<sub>4</sub> mole fractions.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">{ch4Fields.map(renderField)}</div>
          </div>

          <div>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                  Carbon Monoxide
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Calibration statistics for CO mole fractions.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">{coFields.map(renderField)}</div>
          </div>

          <div>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                  δ13C
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Calibration statistics for δ13C:δ12C isotope ratio.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">{d13cFields.map(renderField)}</div>
          </div>

          <div>
            <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
              <div>
                <h3 className="text-lg leading-6 font-bold text-gray-900">
                  δ18O
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Calibration statistics for δ18O:δ16C isotope ratio.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">{d18oFields.map(renderField)}</div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default EditForm;
