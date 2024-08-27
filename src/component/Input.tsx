type InputProps = {
  label: string;
  id: string;
} & React.ComponentProps<"input">;

export const Input = ({ className, label, id, ...props }: InputProps) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium mb-2 float-left">
        {label}
      </label>
      <input
        id={id}
        className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );
};
