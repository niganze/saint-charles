export default function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tab  text-gray-500 p-3 border-2 border-transparent  ${
        active ? " text-sc-black border-b-sc-red" : ""
      }`}
    >
      {children}
    </button>
  );
}
