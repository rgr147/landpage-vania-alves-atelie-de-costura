const state = {
    view: {
        btnNext: document.querySelector('.next'),
        btnPrev: document.querySelector('.prev'),
        carousel: document.querySelector('.mes-versario-carousel'),
        list: document.querySelector('.mes-versario-caousel-list'),
        item: document.querySelectorAll('.mes-versario-carousel-list-item'),
    },
    values: {
        touchStartX: 0,
        touchEndX: 0,
    },
}

/*ações botões next e prev do carrosel mes-versario*/
state.view.btnNext.addEventListener('click', () =>
    showNextPhoto('next', state.view.list)
);

state.view.btnPrev.addEventListener('click', () =>
    showPreviousPhoto('prev', state.view.list)
);
/*fim ações botões next e prev do carrosel mes-versario*/


/*ação de deslizar do dedo*/
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
        showNextPhoto('next', state.view.list);
    }
    if(state.values.touchEndX > state.values.touchStartX +50) {
        showPreviousPhoto('prev', state.view.list);
    }
}
/*fim ação de deslizar do dedo

/*função para mostrar próxima foto no carrosel do mes-versario */
function showNextPhoto(type, list) {
    if (type === 'next') {
        // console.log(list)
        // console.log(list.children[0])
        state.view.list.appendChild(list.children[0])
        // state.view.list.appendChild(list[0])
    }
}

/*função para mostrar a foto anterior do carrosel mes-versario*/
function showPreviousPhoto(type, list) {
    if (type === 'prev') {
        listLength = list.children.length;
        state.view.list.prepend(list.children[listLength -1]);
    }
}
