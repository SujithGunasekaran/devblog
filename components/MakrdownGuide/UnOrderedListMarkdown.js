

const UnOrderedListMarkdown = () => {

    return (
        <>
            <div className="post_guide_headings">Unordered Lists</div>
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
                                    - First item<br />
                                    - Second item<br />
                                    - Third item<br />
                                    - Fourth item<br />
                                </p>
                            </td>
                            <td className="post_guide_info_table_td">
                                <p>
                                    <ul>
                                        <li>First Item</li>
                                        <li>Second Item</li>
                                        <li>Third Item</li>
                                        <li>Fourth Item</li>
                                    </ul>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="post_guide_info_table_td">
                                <p>
                                    - First item<br />
                                    - Second item<br />
                                    - Third item<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;- Indented item<br />
                                        &nbsp;&nbsp;&nbsp;&nbsp;- Indented item<br />
                                    - Fourth item<br />
                                </p>
                            </td>
                            <td className="post_guide_info_table_td">
                                <p>
                                    <ul>
                                        <li>First Item</li>
                                        <li>Second Item</li>
                                        <li>Third Item</li>
                                        <ul>
                                            <li>Indented Item</li>
                                            <li>Indented Item</li>
                                        </ul>
                                        <li>Fourth Item</li>
                                    </ul>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default UnOrderedListMarkdown;
