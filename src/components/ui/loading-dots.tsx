export const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"
          style={{
            animationDelay: `${dot * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};
