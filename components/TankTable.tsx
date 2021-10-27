import { TankRecord } from '../lib/tanks';
import TextIcon from './TextIcon';
import { formatDate } from '../lib/date';
import { useState } from 'react';

const tankFields = [
  { key: 'updatedAt' },
  { key: 'fillId' },
  { key: 'userId' },
  { key: 'pressure' },
  { key: 'location' },
  { key: 'owner' },
  { key: 'co2' },
  { key: 'co2Stdev' },
  { key: 'co2Sterr' },
  { key: 'co2N' },
  { key: 'co2RelativeTo' },
  { key: 'co2CalibrationFile' },
  { key: 'co2InstrumentId' },
  { key: 'ch4' },
  { key: 'ch4Stdev' },
  { key: 'ch4Sterr' },
  { key: 'ch4N' },
  { key: 'ch4RelativeTo' },
  { key: 'ch4CalibrationFile' },
  { key: 'ch4InstrumentId' },
  { key: 'co' },
  { key: 'coStdev' },
  { key: 'coSterr' },
  { key: 'coN' },
  { key: 'coRelativeTo' },
  { key: 'coCalibrationFile' },
  { key: 'coInstrumentId' },
  { key: 'd13c' },
  { key: 'd13cStdev' },
  { key: 'd13cSterr' },
  { key: 'd13cN' },
  { key: 'd18o' },
  { key: 'd18oStdev' },
  { key: 'd18oSterr' },
  { key: 'd18oN' },
  { key: 'ottoCalibrationFile' },
  { key: 'comment' },
];

type Props = {
  tankRecords: TankRecord[];
};

const TankRecordTable = ({ tankRecords }: Props) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleSelection = (index: number) => {
    if (index === selectedRowIndex) {
      setSelectedRowIndex(null);
    } else {
      setSelectedRowIndex(index);
    }
  };

  return (
    <div className="max-w-full overflow-x-scroll rounded-lg border shadow-sm">
      <table>
        <thead className="bg-gray-50 text-left text-xs font-medium text-gray-700 tracking-wider border-b">
          <tr>
            {tankFields.map((field) => (
              <th key={field.key} className="px-4 py-4">
                {field.key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tankRecords.map((tank, index) => (
            <tr
              key={index}
              onClick={() => handleSelection(index)}
              className={`rounded-lg
              ${index === selectedRowIndex ? 'bg-gray-700 text-white' : ''}
              ${index % 2 === 1 && 'bg-gray-50'}
              `}>
              {tankFields.map((field) => {
                const value = tank[field.key];
                const formatter = value instanceof Date ? formatDate : String;
                const formattedValue = !!value ? (
                  formatter(value)
                ) : (
                  <TextIcon muted>-</TextIcon>
                );
                return (
                  <td
                    key={field.key}
                    className={'px-4 py-2 text-left text-xs whitespace-nowrap'}>
                    {formattedValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TankRecordTable;
