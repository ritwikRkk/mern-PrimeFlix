
const fetchTmdb = async (url)=>{
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    // console.log(url);
    const json = await response.json();
    return json;
    // console.log(json);
}

export default {fetchTmdb};