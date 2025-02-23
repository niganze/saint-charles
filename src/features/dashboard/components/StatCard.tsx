import Link from "next/link";

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  link?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  description,
  link,
}: StatCardProps) => {
  return (
    <Link
      href={link ?? ""}
      className="bg-white overflow-hidden rounded-xl transition-all duration-200 hover:shadow-md"
    >
      <div className="p-8">
        <div className="flex gap-4">
          <div>
            {icon && <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>}
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">{title}</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {value}
            </dd>
          </div>
        </div>
        {description && (
          <p className="mt-4 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </Link>
  );
};
