
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

// Get All Plants
const loadAllPlants = () =>{
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then((res)=> res.json())
    .then((plants)=> displayAllPlants(plants.plants))
}
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
                <button class="btn mt-2 px-8 py-3 border-0 rounded-full w-full bg-[#15803D] text-white">Add to cart</button>
            </div>
        `
        allPlants.appendChild(displayPlants);   
    }
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

