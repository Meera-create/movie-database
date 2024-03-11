const addMovieButton = document.getElementById("add-movie-btn");
const modalContent = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const inputBoxes = document.querySelectorAll('input');

const title = inputBoxes[0];
const image = inputBoxes[1];
const rating = inputBoxes[2];

const addButton = document.querySelector('.btn--success');
const cancelBtn = document.querySelector('.btn--passive')
const movieList = document.getElementById('movie-list');
const movieElement = document.querySelector('movie-element');
const deleteModal = document.getElementById('delete-modal');
const notDeleteBtn = document.querySelectorAll('.btn--passive')[1];
let confirmDeleteBtn = document.querySelector('.btn--danger');
const entryText = document.getElementById('entry-text');


const updateUI = () => {
    if (moviesArray.length > 0) {
    entryText.style.display = 'none';
} else {
    entryText.style.display = 'block';
    }
    
}

const backgroundChanges = () => {
    backdrop.classList.add('visible');
}

const showModalContent = () => {
    modalContent.classList.add('visible');
    backgroundChanges();
    
    
    //console.log('hello');
}

const closeMovieModal = () => {
    modalContent.classList.remove('visible');
    backdrop.classList.remove('visible');
}

const moviesArray = [];

const createNewMovieIcon = (id,image,title,rating) => {
    const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${image}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
    
    newMovieElement.addEventListener('click', deleteMovieEntry.bind(null,id));
    movieList.append(newMovieElement);
    console.log(movieList, 'movie list');
    

}

const clearInput = () => {
    title.value = '';
    image.value = '';
    rating.value = '';
}

const createMovieObj = () => {

    if (!title.value ||!image.value ||  !rating.value) {
        alert('please enter values')
        return;
    } 

        const moviesObj = {
            id: Math.random().toString(),
            title: title.value,
            image: image.value,
            rating: rating.value
        }

    console.log(moviesObj,'movies object')    
    moviesArray.push(moviesObj);
    console.log(moviesArray);

    createNewMovieIcon(moviesObj.id, moviesObj.image, moviesObj.title, moviesObj.rating);
    clearInput();
    modalContent.classList.remove('visible');
    backdrop.classList.remove('visible');
    updateUI();
    
};

const closeDeleteModal = () => {
    deleteModal.classList.remove('visible');
    //notDeleteBtn.removeEventListener('click',);
}

const removeMovie = (chosenID) => {
     
         let movieIndex = 0;
    for ( const film of moviesArray) {
        if (film.id === chosenID) {
            break;
        }
        movieIndex++;
    }

    moviesArray.splice(movieIndex, 1)
    const movieToRemove = movieList.children[movieIndex];
        movieList.removeChild(movieToRemove);
        deleteModal.classList.remove('visible');
        updateUI();
    }

const deleteMovieEntry = (chosenID) => {
    deleteModal.classList.add('visible');

    confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true));

    confirmDeleteBtn = deleteModal.querySelector('.btn--danger');
    //copy the button and replace with this new one, so the old event listener will not run

    notDeleteBtn.removeEventListener('click', closeDeleteModal);
    //remove the event listener 
    notDeleteBtn.addEventListener('click', closeDeleteModal);

    confirmDeleteBtn.addEventListener('click', removeMovie.bind(null, chosenID))
    
    
}






addMovieButton.addEventListener('click', showModalContent);
backdrop.addEventListener('click', closeMovieModal);
addButton.addEventListener('click', createMovieObj);  
cancelBtn.addEventListener('click', closeMovieModal); 



