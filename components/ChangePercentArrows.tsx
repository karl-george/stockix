import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const ChangePercentArrows = ({
  changePercent,
}: {
  changePercent: number | undefined;
}) => {
  return (
    <span className='text-[#79797a]'>
      {changePercent?.toString().charAt(0) === '-' ? (
        <div className='flex items-center gap-1'>
          <ArrowDownRight className='w-4 h-4' fill='red' stroke='red' />
          <span className='text-red-500'>{changePercent?.toFixed(2)}%</span>
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          <ArrowUpRight className='w-4 h-4' fill='green' stroke='green' />
          <span className='text-green-500'>{changePercent?.toFixed(2)}%</span>
        </div>
      )}
    </span>
  );
};

export default ChangePercentArrows;
