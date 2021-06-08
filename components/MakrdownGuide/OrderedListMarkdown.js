
const OrderedListMarkdown = () => {

    return (
        <>
            <div className="post_guide_headings">Ordered List</div>
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
                            <td className="post_guide_info_table_td">
                                <p>
                                    1. First item<br />
                                    2. Second item<br />
                                    3. Third item<br />
                                    4. Fourth item<br />
                                </p>
                            </td>
                            <td className="post_guide_info_table_td">
                                <p>
                                    1. First item<br />
                                    2. Second item<br />
                                    3. Third item<br />
                                    4. Fourth item<br />
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="post_guide_info_table_td">
                                <p>
                                    1. First item<br />
                                    2. Second item<br />
                                    3. Third item<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;1. Indented item<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;2. Indented item<br />
                                    4. Fourth item<br />
                                </p>
                            </td>
                            <td className="post_guide_info_table_td">
                                <p>
                                    1. First item<br />
                                    2. Second item<br />
                                    3. Third item<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;1. Indented item<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;2. Indented item<br />
                                    4. Fourth item<br />
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default OrderedListMarkdown;
