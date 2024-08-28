type ButtonProps = {
  variant: "primary" | "secondary";
} & React.ComponentProps<"button">;

export const Button = ({ className, variant, ...props }: ButtonProps) => {
  const primaryStyle =
    "bg-[var(--bg-accent)] text-[var(--bg-primary)] hover:bg-[var(--bg-accent-hover)] active:bg-[var(--bg-accent-active)]";
  const secondaryStyle =
    "bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary-hover)] active:bg-[var(--bg-secondary-active)]";

  const style = variant === "primary" ? primaryStyle : secondaryStyle;
  return (
    <button
      className={`px-2 py-1 rounded transition-colors duration-75 ${style} ${className}`}
      {...props}
    />
  );
};
