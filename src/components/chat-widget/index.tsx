import React, { ComponentType, ReactElement } from 'react';
import dynamic from 'next/dynamic';
import { PageLoader } from '@components/page-loader';

interface IChatWidgetProps {
  className: string;
  fullScreenMode: boolean;
  title: string;
  subTitle: string;
  senderPlaceHolder: string;
  showCloseButton: boolean;
  showTimeStamp: boolean;
  launcherCloseLabel: string;
  handleNewUserMessage: (text: string) => void;
  launcher: () => ReactElement;
  handleTextInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// @ts-ignore
const ChatWidget: ComponentType<Partial<IChatWidgetProps>> = dynamic(() => import('react-chat-widget').then((mod) => mod.Widget), {
  loading: () => <PageLoader />,
  ssr: false,
});

export default ChatWidget;
