import { BaseUrl } from '@/constants/constants';
import React, { useState } from 'react'
import Link from 'next/link';
import {CopyIcon, CheckIcon} from './icons';

type Props = {
    url: string;
    shortUrl: string;
}

const ResultCard = ({url, shortUrl}: Props) => {
  
  const generateShortUrl = (link:string) => {
    const url = new URL(link);
    return url;
  }

  const shortly = generateShortUrl([BaseUrl, shortUrl].join("/"));

  return (
    <div className="rounded-md m-5 p-2 bg-gray-50 dark:bg-bg-secondary w-full">
        <div className="p-2 flex items-center justify-between">
           <Link className='text-blue-400 font-bold hover:text-blue-500' target='_blank' href={shortly.href}>{shortly.host + shortly.pathname}</Link>
           <button onClick={() => {navigator.clipboard.writeText(shortly.href)}} title='copy' className="p-2 border rounded-md dark:border-border-gray hover:bg-gray-50 dark:hover:bg-bg-secondary transition-all">
              <CopyIcon />
           </button>
        </div>
    </div>
  )
}

export default ResultCard;