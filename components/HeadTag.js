import Head from 'next/head';
import { memo } from 'react';

const HeadTag = memo((props) => {

    const { title, description, keyword = "", isLogoNameNeeded = true } = props;

    return (
        <Head>
            <title>{`${isLogoNameNeeded ? 'devBlog |' : ''} ${title}`}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keyword} />
        </Head>
    )
})

export default HeadTag;
