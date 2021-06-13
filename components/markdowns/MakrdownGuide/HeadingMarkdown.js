
const HeadingMarkdown = () => {

    return (
        <>
            <div className="post_guide_headings">Headings</div>
            <div className="post_guide_info_container">
                <table className="table post_guide_info_table">
                    <thead className="thead-dark post_guide_info_table_head">
                        <tr>
                            <th className="post_guide_info_table_th">Markdowns</th>
                            <th className="post_guide_info_table_th">Rendered Output</th>
                        </tr>
                    </thead>
                    <tbody className="post_guide_info_table_body">
                        <tr>
                            <td className="post_guide_info_table_td"><p># Heading1</p></td>
                            <td className="post_guide_info_table_td"><h1>Heading1</h1></td>
                        </tr>
                        <tr>
                            <td className="post_guide_info_table_td"><p>## Heading2</p></td>
                            <td className="post_guide_info_table_td"><h2>Heading2</h2></td>
                        </tr>
                        <tr>
                            <td className="post_guide_info_table_td"><p>### Heading3</p></td>
                            <td className="post_guide_info_table_td"><h3>Heading3</h3></td>
                        </tr>
                        <tr>
                            <td className="post_guide_info_table_td"><p>#### Heading4</p></td>
                            <td className="post_guide_info_table_td"><h4>Heading4</h4></td>
                        </tr>
                        <tr>
                            <td className="post_guide_info_table_td"><p>##### Heading5</p></td>
                            <td className="post_guide_info_table_td"><h5>Heading5</h5></td>
                        </tr>
                        <tr>
                            <td className="post_guide_info_table_td"><p>###### Heading6</p></td>
                            <td className="post_guide_info_table_td"><h6>Heading6</h6></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default HeadingMarkdown;
