import Head from 'next/head';
import { memo } from 'react';

const HeadTag = memo((props) => {

    const { title, description, keyword } = props;

    return (
        <Head>
            <title>devBlog | {title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
        </Head>
    )
})

export default HeadTag;
