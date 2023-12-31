import { IChatbotMessageModel, SuggestionPostPattern } from '@/api/ai.api';
import ChatBotAvatarImg from '@assets/img/chat-bot-avatar.jpeg';
import { Avatar } from 'antd';
import { FC } from 'react';

export type MessageListProps = {
  messages: IChatbotMessageModel[];
};

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 px-2 overflow-scroll">
      {messages.map((message, index) => {
        return <MessageItem key={index} {...message} />;
      })}
    </div>
  );
};

const MessageItem: FC<IChatbotMessageModel> = ({ text, fromBot = true }) => {
  const textColor = !fromBot ? 'white' : 'black';
  const bgColor = !fromBot ? '#1677FF' : '#E4E6EB';

  const renderText = (text: string) => {
    if (text.match(SuggestionPostPattern)) {
      const matchResult = text.match(SuggestionPostPattern);
      const title = matchResult?.at(1);
      const slug = matchResult?.at(2);

      return (
        <div>
          Gợi ý bài viết:{' '}
          <a className="underline text-blue-500" href={`/posts/${slug}`}>
            {title}
          </a>
        </div>
      );
    }

    return text;
  };

  return (
    <div
      className="flex w-full mb-1 gap-2 items-center z-1"
      style={{ justifyContent: !fromBot ? 'flex-end' : 'flex-start' }}
    >
      {fromBot && <Avatar src={ChatBotAvatarImg} size={36} />}
      {text && (
        <div
          className="text-xs md:text-sm my-0.5 max-w-[60%] rounded-lg px-4 py-2 2xl:max-w-[60%] text-black bg-[#E4E6EB] leading-[1] h-fit break-words"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {renderText(text)}
        </div>
      )}
    </div>
  );
};
export default MessageList;
