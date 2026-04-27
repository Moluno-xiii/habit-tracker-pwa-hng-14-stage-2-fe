interface Props {
  error: string | null;
}

const ErrorDisplay: React.FC<Props> = ({ error }) => {
  if (!error) return null;
  return (
    <p className="text-sm font-semibold text-red-600/60 italic">{error}</p>
  );
};

export default ErrorDisplay;
