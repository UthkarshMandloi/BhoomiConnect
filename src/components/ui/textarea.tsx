import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

export { Textarea };
