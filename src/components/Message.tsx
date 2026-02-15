import React from 'react';

interface MessageProps {
  type: string;
  children: React.ReactNode;
}

const typeStyles: Record<string, string> = {
  error: 'border border-[#d9534f] border-l-[2.5px] bg-[rgba(217,83,79,0.1)] [&_p]:text-[#d9534f]',
  success: 'border border-[#2b542c] border-l-4 bg-[rgba(43,84,44,0.1)] [&_p]:text-[#2b542c]',
  validation:
    'border border-[#f0ad4e] border-l-4 bg-[rgba(240,173,78,0.1)] text-[#f0ad4e] [&_p]:text-[#f0ad4e]',
};

const Message: React.FC<MessageProps> = ({ type, children }) => {
  return (
    <div>
      <div className={`mb-4 py-1.5 px-1 ${typeStyles[type] || ''}`}>
        <p className="ml-2 text-left font-medium p-0 mb-0!">{children}</p>
      </div>
    </div>
  );
};

export default Message;
