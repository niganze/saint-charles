interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
}

export const StatCard = ({ title, value, description }: StatCardProps) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-sc-black">
              {value}
            </dd>
          </div>
        </div>
        {description && (
          <div className="mt-4">
            <div className="text-sm text-gray-500">{description}</div>
          </div>
        )}
      </div>
    </div>
  );
};
