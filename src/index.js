console.log('%c HI', 'color: firebrick')
const container = document.querySelector("#dog-image-container")
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const ulContainer = document.querySelector("#dog-breeds")
let allBreeds = []
function getDogImages(){
fetch(imgUrl)
.then(res => res.json())
.then(images => {
    const imgs = images.message
    let imgsArray = creatImgElement(imgs)
    renderImages(imgsArray)
})}

function creatImgElement(imgs) {
       return imgs.map((img) => {
            let i = `<img src= "${img}">`
            return i
        })
    }

function renderImages(imgsArray) {
        imgsArray.forEach(element => {
        renderElement(element)  
 });
}

function renderElement(element){
    container.innerHTML += element
}

function renderLi(array) {
    array.forEach(element => {
    ulContainer.innerHTML += element
    
})
};

function getBreeds(){
    fetch(breedUrl)
    .then(res => res.json())
    .then(breeds => {
        allBreeds = Object.keys(breeds.message)
       // cant map an object
       // object.keys grabs the keys of the object and turns them into an array 
       const liElements = createLiElement(allBreeds)
       renderLi(liElements)

    })
}

function createLiElement(allBreeds) {
    return allBreeds.map((breed) => {
         let li = `<li>${breed}</li>`
         //console.log(li)
         return li
     })
 }

ulContainer.addEventListener('click', handleClick)

function handleClick(event) {
     event.target.style.color = '#ED69CB'
}

const dropdown = document.querySelector("#breed-dropdown")
dropdown.addEventListener('change', handleChange)

function handleChange(event) {
   const letter = event.target.value
   //console.log(allBreeds)
   const filtered = allBreeds.filter(breed => breed.startsWith(letter))
   const breedLis = createLiElement(filtered)
   ulContainer.innerHTML = ''
   renderLi(breedLis)
}
getBreeds()
getDogImages();
