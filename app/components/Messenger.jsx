"use client"

import { FacebookProvider, CustomChat } from 'react-facebook';

export default function FacebookMsg() {  
      return (
        <>
        <FacebookProvider appId="3994118814175573" chatSupport>
          <CustomChat pageId="486155097906577" minimized={true}/>
        </FacebookProvider>
        </>
      );
  }