/**
 * Fetches the Gelos Enterprise Main Navigation List data to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getNavigationData = async () => {
    const gelosNavEndPath = "js/data-model/main-nav-list.json";

    try {
        const response = await fetch(gelosNavEndPath);

        if (!response) {
            throw new Error(
                `Faield to fetch ${gelosNavEndPath} : ${response.status} ${esponse.stautsText}`
            )
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            navList: jsonResponse.gelos_main_nav,
            code: "200"
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON Parse error in ${gelosNavEndPath}:`, error.message)
        } else {
            console.error(`Error fetching ${gelosNavEndPath}:`, error.message)
        }

        return {
            status: 'error',
            navList: [],
            code: "500"
        }
    }
}

export { getNavigationData }
