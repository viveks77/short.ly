import { generateSSGHelper } from '@/server/helpers/SSGhelpers';
import { TRPCError } from '@trpc/server';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next';
import React from 'react'

type Props = {

}

const shortUrlRedirect = (props: Props) => {
  return (
    <div></div>
  )
}

export default shortUrlRedirect;

export const getServerSideProps = async (context: GetServerSidePropsContext<{alias: string}>) => {
    
    let alias = context.params?.alias;

    if(!alias) return;

    const ssg = generateSSGHelper();
    try{
        const shortUrl = await ssg.shortUrlRouter.get.fetch({alias: alias}, );
        return {
            redirect: {
                destination: shortUrl.url
            }
        }
    }
    catch(e: any){
        
    }

    return {
        redirect: {
            destination: "/"
        }
    }
}