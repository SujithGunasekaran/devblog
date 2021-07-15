import Head from 'next/head';
import { memo } from 'react';
import { useRouter } from 'next/router';

const HeadTag = memo((props) => {

    const { title, description, keyword = "", isLogoNameNeeded = true } = props;

    const router = useRouter();

    return (
        <Head>
            <title>{`${isLogoNameNeeded ? 'devBlog |' : ''} ${title}`}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keyword} />

            <meta property="og:type" content="devBlog" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta property="twitter:card" content="devBlog" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
        </Head>
    )
})

export default HeadTag;
