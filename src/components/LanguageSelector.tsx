import React, { useState } from "react";
import i18n from "../i18n";

export function LanguageSelector() {
  const languages = [
    { code: "pl", label: "Polski" },
    { code: "en", label: "English" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const initLanguage = i18n.language;

  const onLanguageChange = (event: React.ChangeEvent): void => {
    const select = event.target as HTMLSelectElement;
    setSelectedLanguage(select.value);
    i18n.changeLanguage(select.value);
  };

  const flagPLSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        d="M1,24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V15H1v9Z"
        fill="#cb2e40"
      ></path>
      <path
        d="M27,4H5c-2.209,0-4,1.791-4,4v8H31V8c0-2.209-1.791-4-4-4Z"
        fill="#fff"
      ></path>
      <path
        d="M5,28H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4ZM2,8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8Z"
        opacity=".15"
      ></path>
      <path
        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
        fill="#fff"
        opacity=".2"
      ></path>
    </svg>
  );

  const flagENGSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect>
      <path
        fill="#be2a2a"
        d="M31 14L18 14 18 4 14 4 14 14 1 14 1 18 14 18 14 28 18 28 18 18 31 18 31 14z"
      ></path>
      <path
        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
        opacity=".15"
      ></path>
      <path
        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
        fill="#fff"
        opacity=".2"
      ></path>
    </svg>
  );

  return (
    <>
      <div className="col-end-3 md:col-end-4 flex">
        {selectedLanguage === "pl" ? flagPLSvg : flagENGSvg}
        {}
        <select
          onChange={onLanguageChange}
          className="form-control w-44 ml-1 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
      </div>
    </>
  );
}
