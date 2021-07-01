import Link from 'next/link';


const PageLink = (props) => {

    const { href, as, index } = props;

    return (
        <Link key={index} href={href} as={as}>
            {props.children}
        </Link>
    )

}

export default PageLink;
