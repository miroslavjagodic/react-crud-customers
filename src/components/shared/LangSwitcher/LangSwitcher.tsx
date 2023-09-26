import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { Language } from '../../../utils/enums';

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const handleLangChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue="en"
      className="w-16"
      onChange={handleLangChange}
      value={language}
      options={[
        { value: 'en', label: Language.EN },
        { value: 'de', label: Language.DE },
      ]}
    />
  );
};

export default LangSwitcher;
