import Image from 'next/image';

interface NoResultsProps {
  title: string;
  description: string;
}
const NoResults: React.FC<NoResultsProps> = ({ title, description }) => {
  return (
    <div className="loader-container mb-16 flex flex-1 flex-col items-center justify-center p-4">
      <Image
        src="/assets/ambodex.svg"
        alt="Error"
        width={42}
        height={42}
        className="mb-3"
      />
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="max-w-[310px] text-center text-sm text-[#999999]">
        {description}
      </p>
    </div>
  );
};
export default NoResults;
