interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const InputLabel = ({ children, ...props }: InputLabelProps) => {
  return (
    <label className="block text-sm font-medium text-gray-500" {...props}>
      {children}
    </label>
  );
};

export default InputLabel;
