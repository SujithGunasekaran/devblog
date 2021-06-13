

const BoldMarkdown = () => {

    return (
        <>
            <div className="post_guide_headings">Bold</div>
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
                            <td className="post_guide_info_table_td"><p>I Just love **bold Text**</p></td>
                            <td className="post_guide_info_table_td"><p>I Just love <strong>Bold Text</strong></p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default BoldMarkdown;
