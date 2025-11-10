interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage=({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="bg-red-50 border border-red-300 p-4 text-center">
      <p className="text-red-800 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-3 py-1 border border-red-700 cursor-pointer rounded-lg"
        >
          Retry
        </button>
      )}
    </div>
  );
}
export default ErrorMessage;