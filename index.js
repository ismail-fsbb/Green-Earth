
// Category List
const loadCategories = () =>{
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
    .then((res)=> res.json())
    .then((cats) => displayCategories(cats.categories))
}

const displayCategories = (cats) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  for (let cat of cats) {
    const categoryList = document.createElement("li");

    categoryList.innerHTML = `
      <a href="#" id="cat-btn-${cat.id}" onclick="loadCatPlant(${cat.id})" class="text-base cat-btn capitalize py-2 px-3 rounded inline-block w-full hover:bg-[#15803D] transition-all duration-500 hover:text-white">
        ${cat.category_name}
      </a>
    `;

    categoriesContainer.appendChild(categoryList);
  }
};

loadCategories();

const manageSpinner = (status) =>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("plant-container").classList.add("hidden")
    }else{
        document.getElementById("plant-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}

// Get All Plants
const loadAllPlants = () =>{
    manageSpinner(true)
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then((res)=> res.json())
    .then((plants)=> displayAllPlants(plants.plants))
}

let totalPrice = 0;
const displayAllPlants = (plants) => {
    const allPlants = document.getElementById('plant-container');
    allPlants.innerHTML="";
    for(let plant of plants){
        const displayPlants = document.createElement("div");
        displayPlants.innerHTML=`
            <div class="p-4 rounded-xl bg-white space-y-3">
                <img src="${plant.image}" class="h-[186px] w-full object-cover rounded-lg" alt="Trees image">
                <h4 class="font-semibold text-sm capitalize inline-block" onclick="loadPlantDetails(${plant.id})">${plant.name}</h4>
                <p class="text-xs">${plant.description}</p>
                <div class="flex items-center justify-between">
                    <p class="bg-[#DCFCE7] px-5 py-2 rounded-full max-w-fit">${plant.category}</p>
                    <p class="font-semibold">৳<span>${plant.price}</span></p>
                </div>
                <button class="btn mt-2 px-8 py-3 border-0 rounded-full w-full bg-[#15803D] text-white add-to-cart-btn">Add to cart</button>
            </div>
        `
        allPlants.appendChild(displayPlants);   

        // Add to card btn functionality
        const addBtn = displayPlants.querySelector(".add-to-cart-btn");
        addBtn.addEventListener("click", function () {
    alert(`${plant.name} has been added to the cart`);

    const cartContainer = document.getElementById("cart-container");
    const cartItem = document.createElement("div");
    cartItem.className = "p-4 rounded-lg flex items-center justify-between bg-[#F0FDF4] mb-2";
    cartItem.innerHTML = `
        <div>
            <h5 class="font-semibold text-sm capitalize">${plant.name}</h5>
            <p><span>৳${plant.price}</span> x <span>1</span></p>
        </div>
        <span class="cursor-pointer remove-item"><i class="fa-solid fa-xmark"></i></span>
    `;

    cartContainer.appendChild(cartItem);

    // Total price update
    totalPrice += plant.price;
    document.querySelector("#total-price").innerText = totalPrice;

    // ❌ Remove item (must be inside addBtn click)
    const removeBtn = cartItem.querySelector(".remove-item");
    removeBtn.addEventListener("click", function () {
        cartItem.remove();
        totalPrice -= plant.price;
        document.querySelector("#total-price").innerText = totalPrice;
    });
});

    }

    manageSpinner(false)
}
loadAllPlants()

// Load word Details
const loadPlantDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayPlantDetails(details.plants);
}

const displayPlantDetails = (plant) =>{
    // console.log(plant);
    const detailsBox = document.getElementById('plants-details');
    detailsBox.innerHTML=`
        <h3 class="text-lg font-bold">${plant.name}</h3>
        <img src="${plant.image}" class="h-[186px] w-full object-cover rounded-lg" alt="Trees image">
        <p><strong>Category:</strong> <span>${plant.category}</span></p>
        <p><strong>Price:</strong> ৳<span>${plant.price}</span></p>
        <p><strong>Description:</strong> ${plant.description}</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    `;
    document.getElementById('plant_details_modal').showModal()
}

// Sorting by category
const loadCatPlant = (id) => {
    const url =`https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=> {
        removeActiveClass()
        const clickCat = document.getElementById(`cat-btn-${id}`);
        clickCat.classList.add("active");
        displayAllPlants(data.plants);
    })
}

const removeActiveClass = () => {
    const lessonBtn = document.querySelectorAll('.cat-btn');
    lessonBtn.forEach(btn => {
        btn.classList.remove("active");
    });
}



