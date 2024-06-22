


const Table = ({ headers, ToDisplay }) => {

    console.log(headers, " headers and To display ", ToDisplay)

    return (
        <>
            <div className="overflow-x-auto shadow-md rounded-lg mx-auto w-full lg:w-4/5">
                <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((e, index) => (
                                <th key={index} className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {e}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {ToDisplay && ToDisplay.map((e) => (
                            <tr key={e['id']} className="hover:bg-gray-50">
                                {headers.map((hea, index) => (
                                    <td key={index} className="whitespace-nowrap px-6 py-4 text-gray-900">
                                        {e[hea]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table 