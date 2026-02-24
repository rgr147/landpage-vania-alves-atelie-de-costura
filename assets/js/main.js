const state = {
    view: {
        btnNext: document.querySelector('.next'),
        btnPrev: document.querySelector('.prev'),
        carousel: document.querySelector('.mes-versario-carousel'),
        carouselList: document.querySelector('.mes-versario-carousel-list'),
        carouselItem: document.querySelectorAll('.mes-versario-carousel-list-item'),
    },
    values: {
        touchStartX: 0,
        touchEndX: 0,
        numberPhotosCarousel: 10,
    },
}

createItemsCarousel();

/*função responsável por adicionar fotos no carrosel do mes-versario */
function createItemsCarousel() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < state.values.numberPhotosCarousel; i++) {
        const div = document.createElement('div');
        div.className = 'mes-versario-carousel-list-item';
        div.style.backgroundImage = `url(./assets/img/mesversario-${i+1}.jpeg)`;
        fragment.appendChild(div);
    }
    state.view.carouselList.appendChild(fragment);
}
/*fim função responsável por adicionar fotos no carrosel do mes-versario*/



/*ações botões next e prev do carrosel mes-versario*/
state.view.btnNext.addEventListener('click', () =>
    showNextPhoto('next', state.view.carouselList)
);

state.view.btnPrev.addEventListener('click', () =>
    showPreviousPhoto('prev', state.view.carouselList)
);

/*função botão next para mostrar próxima foto no carrosel do mes-versario */
function showNextPhoto(type, list) {
    if (type === 'next') {
        // console.log(list)
        // console.log(list.children[0])
        state.view.carouselList.appendChild(list.children[0])
        // state.view.list.appendChild(list[0])
    }
}

/*função botão prev para mostrar a foto anterior do carrosel mes-versario*/
function showPreviousPhoto(type, list) {
    if (type === 'prev') {
        const listLength = list.children.length;
        state.view.carouselList.prepend(list.children[listLength -1]);
    }
}

/*fim ações botões next e prev do carrosel mes-versario*/



/*ações de deslizar do dedo no carrosel mes-versario*/
state.view.carousel.addEventListener('touchstart', (event) => {
    state.values.touchStartX = event.changedTouches[0].screenX;
}, {passive: true});

state.view.carousel.addEventListener('touchend', (event) => {
    state.values.touchEndX = event.changedTouches[0].screenX;
    chosenSide(); 
}, {passive: true}
);

function chosenSide() {
    if(state.values.touchEndX < state.values.touchStartX -50) {
        showNextPhoto('next', state.view.carouselList);
    }
    if(state.values.touchEndX > state.values.touchStartX +50) {
        showPreviousPhoto('prev', state.view.carouselList);
    }
}
/*fim ações de deslizar do dedo no carrosel mes-versario*/

/*proteção básica de imagens*/
/*previne o menu de contexto (botão direito) em imagens*/
document.addEventListener('contextmenu', (event) => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

/*previne o arrastar de imagens (drag and drop)*/
document.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});
/*fim proteção básica de imagens*/
