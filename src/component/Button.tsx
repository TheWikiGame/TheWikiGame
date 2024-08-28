type ButtonProps = {
  variant: "primary" | "secondary";
} & React.ComponentProps<"button">;

export const Button = ({ className, variant, ...props }: ButtonProps) => {
  const primaryStyle = "bg-[var(--text-secondary)] text-[var(--bg-primary)]";
  const secondaryStyle = "bg-[var(--bg-secondary)]";

  const style = variant === "primary" ? primaryStyle : secondaryStyle;
  return (
    <button className={`px-2 py-1 rounded ${style} ${className}`} {...props} />
  );
};
