import React from 'react';

interface MessageProps {
  type: string;
  children: React.ReactNode;
}

const typeStyles: Record<string, string> = {
  error:
    'border border-[#d9534f]/30 border-l-[3px] border-l-[#d9534f] bg-[#d9534f]/5 [&_p]:text-[#d9534f]',
  success:
    'border border-[#2b542c]/30 border-l-[3px] border-l-[#2b542c] bg-[#2b542c]/5 [&_p]:text-[#2b542c]',
  validation:
    'border border-[#f0ad4e]/30 border-l-[3px] border-l-[#f0ad4e] bg-[#f0ad4e]/5 [&_p]:text-[#f0ad4e]',
};

const Message: React.FC<MessageProps> = ({ type, children }) => {
  return (
    <div
      className={`rounded-lg py-3 px-4 ${typeStyles[type] || ''}`}
    >
      <p className="text-left text-sm font-medium p-0 mb-0!">{children}</p>
    </div>
  );
};

export default Message;
