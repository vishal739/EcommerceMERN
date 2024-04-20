// A mock function to mimic making an async request for data
export function addToCart(data) {
  return new Promise(async (resolve) =>{
    console.log("cart sync: ", data )
    const response = await fetch('http://localhost:8080/cart/',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'content-type': 'application/json' },
  })
    const result = await response.json()
    resolve(({data}))
});
}
export function fetchCartById(userId) {
  // console.log("data fetching started");
  return new Promise(async (resolve) => {
    console.log("Userid",userId);
    const response = await fetch('http://localhost:8080/cart?user='+userId);
    console.log(response);
    const data = await response.json()
    //console.log("data fetched");
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) =>{
    console.log("cart sync: ", update )
    const response = await fetch('http://localhost:8080/cart/'+update.id,{
    method: 'PATCH',
    body: JSON.stringify(update),
    headers: { 'content-type': 'application/json' },
  })
    console.log("Quantity updated,", data);
    const data = await response.json()
    resolve(({data}))
});
}
export function deleteCart(itemId) {
  return new Promise(async (resolve) =>{
    console.log("Deleting sync: ", itemId )
    const response = await fetch('http://localhost:8080/cart/'+itemId,{
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
  })
    console.log("delete updated,", itemId);
    const result = await response.json()
    resolve({data:{id: itemId}})
});
}
