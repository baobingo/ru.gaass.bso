import Client from "../../Services/Client";

const fetchData = (rowsPerPage, number) =>  Client({
    method: 'GET',
    path: `/api/shipments/search/findShipmentByCompletedIsTrue?size=${rowsPerPage}&page=${number}`});

export default fetchData;