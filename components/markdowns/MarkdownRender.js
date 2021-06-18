import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const MarkdownRender = (props) => {

    const { content } = props;

    let customRenderers = {}

    customRenderers = {
        code(code) {
            const { className, children } = code;
            const language = className && className.split('-')[1];
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    children={children}
                />
            );
        }
    }

    return (
        <ReactMarkdown plugins={[gfm]} components={customRenderers} children={content} />
    )

}

export default MarkdownRender;
