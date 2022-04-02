/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import * as Styled from './styles';

export type HtmlContentProps = {
  html: string;
};

export const HtmlContent = ({ html }: HtmlContentProps) => {
  useEffect(() => {
    let removeAds = null;
    if(typeof window !== 'undefined') {
      removeAds = setTimeout(() => {
        document.querySelectorAll('div[id*=container]').forEach((el) => el.remove())
      }, 1000)
    }
    return () => clearTimeout(removeAds);
  }, [])
  
  return <Styled.Container dangerouslySetInnerHTML={{ __html: html }} />;
};
