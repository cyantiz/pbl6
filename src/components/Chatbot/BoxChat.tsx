import { IChatbotMessageModel, SuggestionPostPattern, getChatbotResponse } from '@/api/ai.api';
import { CloseOutlined } from '@ant-design/icons';
import ChatBotAvatarImg from '@assets/img/chat-bot-avatar.jpeg';
import { Button, Divider } from 'antd';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

export type ChatBotBoxChatProps = {
  isShow: boolean;
  close?: () => void;
};

const storeMessagesToLocalStorage = (messages: IChatbotMessageModel[]) => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

const addNewMessageToLocalStorage = (message: IChatbotMessageModel) => {
  const messages = getMessagesFromLocalStorage();
  messages.push(message);
  storeMessagesToLocalStorage(messages);
};

const getMessagesFromLocalStorage = (): IChatbotMessageModel[] => {
  const messages = localStorage.getItem('messages');
  if (!messages)
    return [
      {
        text: 'Xin chào, tôi có thể giúp gì cho bạn?',
        fromBot: true,
        date: new Date(),
      },
    ];

  return JSON.parse(messages);
};

const ChatBotBoxChat: FC<ChatBotBoxChatProps> = ({ isShow, close }) => {
  const [messages, setMessages] = useState<IChatbotMessageModel[]>([
    {
      text: 'Xin chào, tôi có thể giúp gì cho bạn?',
      fromBot: true,
      date: new Date(),
    },
  ]);

  useEffect(() => {
    const messages = getMessagesFromLocalStorage();
    setMessages(messages);
  }, []);

  const handleSendMessage = (newMessage: IChatbotMessageModel) => {
    setMessages((prev) => [...prev, newMessage]);
    addNewMessageToLocalStorage(newMessage);

    getChatbotResponse(newMessage.text)
      .then((text) => {
        const texts: string[] = [];
        if (text instanceof Array) {
          texts.push(...text);
        } else {
          texts.push(text);
        }

        const newMessage: IChatbotMessageModel[] = [];
        for (let i = 0; i < texts.length; i++) {
          newMessage.push({
            text: texts[i],
            fromBot: true,
            date: new Date(),
            isPostSuggestion: texts[i].match(SuggestionPostPattern) ? true : false,
          });

          addNewMessageToLocalStorage(newMessage[i]);
        }

        setMessages((prev) => [...prev, ...newMessage]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: 'I am sorry, I cannot understand your question',
            fromBot: true,
            date: new Date(),
          },
        ]);
      });
  };

  return (
    <div
      className={classNames([
        'box-chat md:absolute fixed z-[1001] -translate-x-1/2 md:-translate-x-full bottom-1/2 md:bottom-0  translate-y-1/2 md:translate-y-0  md:w-96 md:h-[500px] bg-white rounded-lg transition-all ease-out duration-400 drop-shadow-2xl shadow-2xl flex flex-col w-[90vw] h-[440px]',
        isShow ? 'left-1/2 md:-left-4' : 'left-0 opacity-0 pointer-events-none',
      ])}
    >
      <div className="box-chat__header p-2 font-bold flex flex-col">
        <div className="flex items-center justify-start gap-3 text-sm">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-solid border-blue-700"
            src={ChatBotAvatarImg}
          />
          <span>Sportivefy Chatbot</span>
          <Button
            type="link"
            className="ml-auto justify-self-end"
            onClick={() => {
              close && close();
            }}
          >
            <CloseOutlined />
          </Button>
        </div>
        <Divider className="!my-2" />
      </div>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatBotBoxChat;
