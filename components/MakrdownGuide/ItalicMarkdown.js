
const ItalicMarkdown = () => {

    return (
        <>
            <div className="post_guide_headings">Italic</div>
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
                            <td className="post_guide_info_table_td"><p>I Just love *Italic Text*</p></td>
                            <td className="post_guide_info_table_td"><p>I Just love <em>Italic Text</em></p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default ItalicMarkdown;
