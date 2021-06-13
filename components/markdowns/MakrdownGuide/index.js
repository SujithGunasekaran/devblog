import dynamic from 'next/dynamic';


const Heading = dynamic(() => import('./HeadingMarkdown'));
const Bold = dynamic(() => import('./BoldMarkdown'));
const Italic = dynamic(() => import('./ItalicMarkdown'));
const BoldItalic = dynamic(() => import('./BoldItalicMarkdown.js'));
const OrderedList = dynamic(() => import('./OrderedListMarkdown'));
const UnOrderedList = dynamic(() => import('./UnOrderedListMarkdown'));


const MarkdownGuide = () => {

    return (
        <div>
            <Heading />
            <Bold />
            <Italic />
            <BoldItalic />
            <OrderedList />
            <UnOrderedList />
            <div className="post_guide_headings">Tables</div>
            <div className="post_guide_info_container">
                <pre>
                    <code>
                        | Syntax      | Description |
                        | ----------- | ----------- |
                        | Header      | Title       |
                        | Paragraph   | Text        |

                    </code>
                </pre>
            </div>
            <div className="post_guide_headings">Tables Alignments</div>
            <div className="post_guide_info_container">
                <pre>
                    <code>
                        | Syntax      | Description | Test Text     |
                        | :---        |    :----:   |          ---: |
                        | Header      | Title       | Here's this   |
                        | Paragraph   | Text        | And more      |

                    </code>
                </pre>
            </div>
            <div className="post_guide_headings">Images</div>
            <div className="post_guide_info_container">
                <p>![penguin](https://wallpaperaccess.com/full/1238532.jpg)</p><br />
                <img src="https://wallpaperaccess.com/full/1238532.jpg" width={300} height={200} />
            </div>
            <div className="post_guide_headings">Horizontal Rules</div>
            <div className="post_guide_info_container">
                <p> **** </p>
            </div>
            <div className="post_guide_headings">Links</div>
            <div className="post_guide_info_container">
                <p> My favorite search engine is [Google](https://google.com). </p>
                <p> My favorite search engine is <a href="https://google.com">Google</a> </p>
            </div>
        </div>
    )

}

export default MarkdownGuide;
