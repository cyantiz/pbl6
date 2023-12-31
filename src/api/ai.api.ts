import axios from 'axios';

export interface IChatbotMessageModel {
  text: string;
  fromBot?: boolean;
  isPostSuggestion?: boolean;
  date: Date;
}

export const SuggestionPostPattern: RegExp =
  /^Bài báo liên quan với tiêu đề "([^"]+)": https:\/\/sportivefy\.info\/posts\/([^"]+)$/;

export const getChatbotResponse = async (message: string): Promise<string | string[]> => {
  const CHAT_BOT_API_URL = import.meta.env.VITE_CHATBOT_URL;

  const response = await axios
    .get<{ result: string | string[] }>(`${CHAT_BOT_API_URL}?query=${message}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);

  // return {
  //   result: [
  //     'Bài báo liên quan với tiêu đề "Chủ tịch CLB Saudi Arabia: \'Ronaldo là ai?\' ": https://sportivefy.info/posts/chutichclbsaudiarabiaronaldolaai',
  //     'Bài báo liên quan với tiêu đề "Ronaldo mời bốn cầu thủ Man Utd sang Saudi ": https://sportivefy.info/posts/ronaldomoiboncauthumanutdsangsaudi',
  //     'Bài báo liên quan với tiêu đề "Ronaldo ký hai năm với Al Nassr ": https://sportivefy.info/posts/ronaldokyhainamvoialnassr',
  //     'Bài báo liên quan với tiêu đề "Solskajer: Cuộc tái hợp Ronaldo không như ý ": https://sportivefy.info/posts/solskajercuoctaihopronaldokhongnhuy',
  //     'Bài báo liên quan với tiêu đề "Ramsey: \'Ronaldo là người vui tính\' ": https://sportivefy.info/posts/ramseyronaldolanguoivuitinh',
  //   ],
  // }.result;

  return response.result;
};

export const getGeneratedContentFromTitle = async (title: string): Promise<string> => {
  // if (process.env.NODE_ENV === 'development') {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   return 'Cạnh tranh giữa Messi-Ronaldo là cuộc so tài bóng đá giữa tiền đạo người Argentina Lionel Messi và tiền đạo người Bồ Đào Nha Cristiano Ronaldo trong giai đoạn từ 2008 đến nay trên cả phương diện cá nhân lẫn tập thể.';
  // }

  const GENERATE_FROM_TITLE_URL = import.meta.env.VITE_GENERATE_FROM_TITLE_URL;

  const res = await axios
    .post<{ response: string }>(`${GENERATE_FROM_TITLE_URL}?prompt=${title}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data);

  return res.response;
};
