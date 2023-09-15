//all function i will ues
//get total
//create product
//save local storage
//clear inputs
//read
//delete
//update
//search
//clean date
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let btnSubmit = document.getElementById("btnSubmit")
let update ="false";
let temp;




//function get total
function getTotal(){
    if(price.value != ''){
        let result = parseInt (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ="#0c780c"
    }
    
    else{
    total.innerHTML=""
    total.style.background ="#cf1919e2"
 
    }
}
price.onkeyup= getTotal
taxes.onkeyup= getTotal
ads.onkeyup= getTotal
discount.onkeyup= getTotal




//function crate product
let nweProduct;

if(localStorage.product !=null){
    nweProduct = JSON.parse(localStorage.product)

}
else {
    nweProduct=[];
}

btnSubmit.onclick = function(){

    let newObjectPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(title.value !="" && price.value !='' &category.value!='' && newObjectPro.count < 1000){
        if(update ==="false"){
            //create count
        if(newObjectPro.count >1 ){
            for(let i=0 ;i<newObjectPro.count;i++){
                nweProduct.push(newObjectPro)
            }
         
        }
        else{
            nweProduct.push(newObjectPro)
        }
        }
        else{
            nweProduct[temp]=newObjectPro;
            count.style.display="block"
            btnSubmit.innerHTML="create"
        }
        clearDate();
    }
    
    
  
  
//save date to local storage
    localStorage.setItem("product", JSON.stringify(nweProduct))

    showProduct();
 }
 


 // function clear inputs date

 function clearDate(){
    title.value = '';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    category.value ='';
    count.value ='';
  
 }


 // function show product  on table
 function showProduct(){
    getTotal()
let table = '';
for(let i =0 ; i<nweProduct.length ;i++){
    table +=
`<tr>
    <td>${i+1}</td>
    <td>${nweProduct[i].title}</td>
    <td>${nweProduct[i].price}</td>
    <td>${nweProduct[i].taxes}</td>
    <td>${nweProduct[i].ads}</td>
    <td>${nweProduct[i].discount}</td>
    <td>${nweProduct[i].total}</td>
    <td>${nweProduct[i].category}</td>
    <td><button onclick=updateDate(${i}) id="update">Update</button></td>
    <td><button onclick=deleteRow(${i}) id="delete">Delete</button></td>
</tr>`
}
document.getElementById("tbody").innerHTML=table;

let deleteAll = document.querySelector(".deleteAll")
if(nweProduct.length > 0){
    deleteAll.innerHTML = `
    <button onclick=deleteAllProduct() id="deleteAll"> Delete All Products (${nweProduct.length}) </button>
    `
}
else{
    deleteAll.innerHTML="";
}

 }
 showProduct();

 
 //function delete data on row
function deleteRow(i){
    nweProduct.splice(i,1)
    localStorage.product=JSON.stringify(nweProduct)
    showProduct()
    }
    
    //function delete all products
    function deleteAllProduct(){
    localStorage.clear("product");
    nweProduct.splice(0);
    showProduct()
    }


//function updateDate
function updateDate(i){
title.value = nweProduct[i].title
price.value = nweProduct[i].price
taxes.value = nweProduct[i].taxes
ads.value = nweProduct[i].ads
discount.value =nweProduct[i].discount
getTotal()
count.style.display='none'
category.value=nweProduct[i].category;
btnSubmit.innerHTML="UpDate";
update = "true"
temp=i;
scroll({ 
        top:0,
        behavior:"smooth"
    })

}

//function search
let searchMood ="title"
function getSearch(id){   
    let searchInput = document.getElementById("search")
    if(id =="searchTitle"){
         searchMood ="title"
        searchInput.placeholder = "search by title.."
    }
    else{
        searchMood ="category"      
        searchInput.placeholder = "search by category.."       
    } 
    searchInput.focus()
    searchInput.value=''
    showProduct()
}

function  searchDate(value){
    let table='';
    for(let i =0 ; i<nweProduct.length ; i++){
        if(searchMood =='title'){
    
            if(nweProduct[i].title.includes(value)){
                table +=
                `<tr>
                    <td>${i+1}</td>
                    <td>${nweProduct[i].title}</td>
                    <td>${nweProduct[i].price}</td>
                    <td>${nweProduct[i].taxes}</td>
                    <td>${nweProduct[i].ads}</td>
                    <td>${nweProduct[i].discount}</td>
                    <td>${nweProduct[i].total}</td>
                    <td>${nweProduct[i].category}</td>
                    <td><button onclick=updateDate(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteRow(${i}) id="delete">Delete</button></td>
                </tr>`
            }
        
        }
        else{
        
            if(nweProduct[i].category.includes(value)){
                table +=
                `<tr>
                    <td>${i+1}</td>
                    <td>${nweProduct[i].title}</td>
                    <td>${nweProduct[i].price}</td>
                    <td>${nweProduct[i].taxes}</td>
                    <td>${nweProduct[i].ads}</td>
                    <td>${nweProduct[i].discount}</td>
                    <td>${nweProduct[i].total}</td>
                    <td>${nweProduct[i].category}</td>
                    <td><button onclick=updateDate(${i}) id="update">Update</button></td>
                    <td><button onclick=deleteRow(${i}) id="delete">Delete</button></td>
                </tr>`
            }
        
        }
    }   
document.getElementById("tbody").innerHTML=table;
}