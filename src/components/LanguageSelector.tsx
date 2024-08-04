import React from "react";
import i18n from "../i18n"

export function LanguageSelector() {
    const languages = [
        { code: 'pl', label: 'Polski' },
        { code: 'en', label: 'English' }
    ]
    const initLanguage = i18n.language;

    const onLanguageChange = (event: React.ChangeEvent): void => {
        const select = event.target as HTMLSelectElement;
        i18n.changeLanguage(select.value);
    }

    return (
      <>
        <select
          onChange={onLanguageChange}
          className="form-control w-44 col-end-3 md:col-end-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-sm"
          defaultValue={initLanguage}
        >
          {languages.map((language) => (
            <option
              key={language.code}
              value={language.code}
              className="text-gray-700 bg-white "
            >
              {language.label}
            </option>
          ))}
        </select>
      </>
    );
}