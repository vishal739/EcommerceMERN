// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  console.log("data fetching started");
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/products')
    console.log(response);
    const data = await response.json()
    console.log("data fetched");
    resolve({data})
});
console.log("data fetching end");
}
