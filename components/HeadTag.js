import Head from 'next/head';

const HeadTag = (props) => {

    const { title, description, keyword } = props;

    return (
        <Head>
            <title>devBlog | {title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
        </Head>
    )
}

export default HeadTag;
