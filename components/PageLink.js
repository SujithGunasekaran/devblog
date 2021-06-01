import Link from 'next/link';


const PageLink = (props) => {

    const { href, as } = props;

    return (
        <Link href={href} as={as}>
            { props.children}
        </Link>
    )

}

export default PageLink;
