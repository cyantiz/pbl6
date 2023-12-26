import { FC } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import ChatBotBoxChat from './BoxChat';
import ChatBotTrigger from './Trigger';

export type ChatBotProps = {
  // Define your props here if needed
};

const ChatBot: FC<ChatBotProps> = ({}) => {
  const { isOpen: isShowBox, toggle: toggleShowBox, close: closeBox } = useDisclosure(false);

  return (
    <div className="chatbot__trigger fixed bottom-12 right-12 z-[666]">
      <div className="relative flex">
        <ChatBotBoxChat isShow={isShowBox} close={closeBox} />
        <ChatBotTrigger onClick={toggleShowBox} isShowBox={isShowBox} />
      </div>
    </div>
  );
};

export default ChatBot;
