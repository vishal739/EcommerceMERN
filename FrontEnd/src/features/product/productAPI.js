// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  // console.log("data fetching started");
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products');
    console.log(response);
    const data = await response.json()
    //console.log("data fetched");
    resolve({ data });
  });
}
export function fetchProductById(id) {
  // console.log("data fetching started");
  return new Promise(async (resolve) => {
    console.log("id",id);
    const response = await fetch('http://localhost:8080/products/'+id);
    console.log(response);
    const data = await response.json()
    //console.log("data fetched");
    resolve({ data });
  });
}
export function fetchAllCategories() {
  // console.log("data fetching started");
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories');
    console.log(response);
    const data = await response.json()
    console.log("Categories fetched: ",data);
    resolve({ data });
  });
}

export function fetchAllBrands() {
  console.log("brands fetching started");
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands');
    console.log(response);
    const data = await response.json()
    console.log("Brands fetched: ",data);
    resolve({ data });
  });
}

export function fetchAllProductsByFilters(filter,sort,pagination) {
  let queryString='';
  console.log("filter: ",filter, sort,pagination);
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      let category= categoryValues[categoryValues.length - 1]
      queryString += `${key}=${category}&`;
    }
  }
  for(let key in sort){
    queryString+=`_sort=${sort[key]}&`;
  }
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`
  }
  // queryString+=`_page=${pagination.page}&_per_page=${pagination.limit}&`
  console.log("qs: ",queryString);
  return new Promise(async (resolve) => {
    // console.log("http://localhost:8080/products?"+queryString)
    const response = await fetch('http://localhost:8080/products?'+queryString);
    console.log(response);
    const data = await response.json()
    const totalItems = await data.items;
    console.log("data fetched", data,totalItems);
    resolve({data:{products: data.data,totalItems:+totalItems}})
  });
}



