import { Typography } from 'antd';
import React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
};

const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  title,
  action,
}) => {
  const { Title } = Typography;

  return (
    <div className="flex flex-col mx-4 mt-4 overflow-hidden">
      <div className="flex justify-between ">
        <Title level={3} className="mt-0">
          {title}
        </Title>
        {action}
      </div>
      <div className="overflow-auto h-full mt-4 px-4 py-6 bg-white">
        {children}
      </div>
    </div>
  );
};

export default ContentLayout;
