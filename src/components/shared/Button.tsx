interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-mono transition-all duration-300';
  const variantClasses = {
    primary: 'bg-cyber-amber text-cyber-dark hover:shadow-lg hover:shadow-cyber-amber/50',
    secondary: 'border border-cyber-cyan text-cyber-cyan hover:shadow-lg hover:shadow-cyber-cyan/50',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
