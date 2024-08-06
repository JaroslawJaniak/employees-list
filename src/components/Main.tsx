import React from 'react'
import { BackButton } from './ButtonBack'
import { LanguageSelector } from './LanguageSelector'

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className="bg-white p-2 min-h-screen relative">
      <nav className=" p-3 fixed md:static z-50">
        <div className="grid grid-cols-12 ">
          <BackButton />
          <LanguageSelector />
        </div>
      </nav>
      <div className="mt-12">{children}</div>
    </main>
  );
};
