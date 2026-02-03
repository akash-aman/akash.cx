import React from 'react';

export const useHeader = (): [{ page: string; title: string; subtitle: string }, () => void] => [{ page: 'home', title: 'Title', subtitle: 'Subtitle' }, () => { }];
export const useSetHeader = (data: any) => { };
export const HeaderProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
