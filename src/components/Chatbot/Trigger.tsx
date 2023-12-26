import ChatBotAvatarImg from '@assets/img/chat-bot-avatar.jpeg';
import classNames from 'classnames';
import { FC } from 'react';
export type ChatBotTriggerProps = {
  onClick?: () => void;
  isShowBox?: boolean;
};

const ChatBotTrigger: FC<ChatBotTriggerProps> = ({ onClick, isShowBox }) => {
  return (
    <div className="relative group">
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className={classNames([
          'peer chatbot w-20 h-20 rounded-full bg-white flex justify-center items-center cursor-pointer select-none shadow-xl drop-shadow-lg  transition-all ease-in-out hover:scale-105',
          isShowBox && 'hover:scale-100',
        ])}
      >
        <img src={ChatBotAvatarImg} className="w-full h-full rounded-full object-cover" />
      </div>
      <div
        className={classNames([
          'hello-message absolute top-1/2 -translate-y-1/2 rounded-full px-4 py-2 text-white w-fit -translate-x-full left-0  opacity-0 whitespace-nowrap bg-green-600 pointer-events-none transition-all duration-400 ease-out',
          isShowBox
            ? ''
            : 'peer-hover:opacity-100 peer-hover:pointer-events-auto peer-hover:-left-3',
        ])}
      >
        Xin chào, tôi có thể giúp gì cho bạn?
      </div>
    </div>
  );
};

export default ChatBotTrigger;
