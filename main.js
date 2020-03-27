
let likeBtn = document.querySelectorAll('.fa-heart');
likeBtn.forEach(e => e.addEventListener('click', whishList));

let footer = document.querySelector('.modal-footer');

//            Adding list 

function whishList(e){
  let parnt = e.target.parentNode;
  let card = parnt.lastElementChild;
  let img = parnt.firstElementChild.src;
  let title = card.firstElementChild.textContent;
  let price = card.lastElementChild.textContent;
  let span = card.lastElementChild.firstElementChild.textContent;

  let product = {
    pic: img,
    name: title,
    mrp: span
  }  

  let check = noRepeat(product);
  if(check === false){
    return;
  }

  //          Set product in localStorage

  if(localStorage.getItem('products') === null)
  {
    var products = [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

  } else{
      var products = JSON.parse(localStorage.getItem('products'));
      products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  let list = document.querySelector('.modal-body');
  list.innerHTML = '';

    startFetching();

  alert('Congrats! The product has added in you cart go and check out.');
}


//          Adding in Cart

  function startFetching(){
    
    var sum = 0;
    let products = JSON.parse(localStorage.getItem('products')) || [];

    if(products.length === 0){
      noItems();
      return;
    } 
      
    for(let i = 0; i < products.length; i++){

  footer.style.display = 'block';

      let pic = products[i].pic;
      let name = products[i].name;
      let mrp = products[i].mrp;

//            For body

    let list = document.querySelector('.modal-body');
    let item = document.createElement('div');
    let textItem = 
    `<div class="row my-2 h-50" aria-labelledby="modal-item" id="modal-item">
    <div class="col"><img src="${pic}" alt="bed" class="img-fluid"></div>      
      <div class="col align-items-between text-capitalize">
      ${name} 
      <br> 
      <p class="text-warning">Price : $ ${mrp}</p>
      </div>
      <div class="col text-right">
      <button class="btn-del btn btn-danger btn-sm" value="${name}" >X</button>
        </div>
    </div>`;

    item.innerHTML = textItem;
      list.appendChild(item);

      sum += parseInt(mrp);
      let total = document.getElementById('total');
      total.innerHTML = parseInt(sum);

    let count = document.getElementById('count');
      count.innerHTML = i + 1; 
    }
  
    delItem();
  }

  

//        If cart is empty

 function noItems(){

   let list = document.querySelector('.modal-body');
   list.innerHTML = 
    `<h2 class="text-center text-danger">Empty Cart</h2>`;

  footer.style.display = 'none';
 }


 //               Delete Item from cart


 function delItem(){


  let products = JSON.parse(localStorage.getItem('products'));

  let delBtn = document.querySelectorAll('.btn-del');
  delBtn.forEach( e => e.addEventListener('click', () => {
        let item = e.value;

  for(let i = 0; i < products.length; i++){
    if(products[i].name === item){
      products.splice(i, 1);
    }
  }
  localStorage.setItem('products', JSON.stringify(products));

  window.location.reload();

  
  } ));
     
  return;
}

//          No repeat

function noRepeat(product){

  let products = JSON.parse(localStorage.getItem('products')) || [];

  for(let i = 0; i < products.length; i++){
      if(products[i].name === product.name){
        alert('!! Product is already in Cart !!')
        return false;
      }
  }
}