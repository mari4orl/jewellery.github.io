var accList = document.querySelectorAll('.acc');

var navigation = document.querySelector('.navigation');
var toggle = document.querySelector('#toggle');
var header = document.querySelector('.page-header');

var filters = document.querySelector('.filters');
var filtersToggleLabel = document.querySelector('.main-catalog__toggle');
var filtersToggle = document.querySelector('#filter-toggle');

var filtersAccList = document.querySelectorAll('.filters-acc');

//Главное меню

navigation.classList.remove('navigation--nojs');
header.classList.remove('page-header--colored');

toggle.addEventListener('change', function() {
  if (this.checked) {
     navigation.classList.add('navigation--opened');
     header.classList.add('page-header--colored');
     document.body.classList.add('stop-scrolling');
  } else {
    navigation.classList.remove('navigation--opened');
    header.classList.remove('page-header--colored');
    document.body.classList.remove('stop-scrolling');
  }
});

//Аккордеон

for (var i = 0; i < accList.length; i++) {
  var acc = accList[i];
  acc.classList.remove('nojs');
  acc.addEventListener('click', function (evt) {
    if (evt.target.checked) {
      for (var j = 0; j < accList.length; j++) {
        accList[j].checked = accList[j] === evt.target ? true : false;
      }
    }
  });
}

//Фильтры

if (filters) {
  filters.classList.remove('filters--nojs');

  filtersToggle.addEventListener('change', function() {
    if (this.checked) {
       filters.classList.add('filters--opened');
       filtersToggleLabel.classList.add('main-catalog__toggle--opened');
    } else {
      filters.classList.remove('filters--opened');
      filtersToggleLabel.classList.remove('main-catalog__toggle--opened');
    }
  });

  for (var i = 0; i < filtersAccList.length; i++) {
    var filtersAcc = filtersAccList[i];
    filtersAcc.classList.remove('nojs');
  }
}


//логин

var ESC_KEYCODE = 27
var loginElem = document.querySelector('.login');
var openBtn = document.querySelector('.page-header__login');
var openNavDtn = document.querySelector('.navigation__login');

var overlayElem = document.querySelector('.login__overlay');
var closeBtn = document.querySelector('.login__close-btn');

function onEscKeyDown(e) {
  if(e.keyCode === ESC_KEYCODE) {
    loginElem.classList.add('login--closed');
    document.body.classList.remove('stop-scrolling');
  }
}

function closelogin() {
  if (!loginElem.classList.contains('login--closed')) {
    loginElem.classList.add('login--closed');
    document.removeEventListener('keydown', onEscKeyDown)
    document.body.classList.remove('stop-scrolling');
  }
}

try {
  localStorage.getItem('userEmail');
} catch (err) {
  isStorageSupport = false;
}

if (openBtn || openNavDtn) {

  var userEmail = loginElem.querySelector('[id=login-email]');
  openNavDtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.body.classList.add('stop-scrolling');
    if (loginElem.classList.contains('login--closed')) {
      loginElem.classList.remove('login--closed');
      document.addEventListener('keydown', onEscKeyDown)
    }
    userEmail.focus();
  });

  openBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.body.classList.add('stop-scrolling');
    if (loginElem.classList.contains('login--closed')) {
      loginElem.classList.remove('login--closed');
      document.addEventListener('keydown', onEscKeyDown)
    }
    userEmail.focus();
  });

  loginElem.addEventListener('submit', function (evt) {
    if (!userEmail.value === '') {
      evt.preventDefault();
      loginElem.classList.remove('login-error');
      loginElem.offsetWidth = loginElem.offsetWidth;
      loginElem.classList.add('login-error');
      if (!userEmail.value) {
        userEmail.focus();
      }
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userEmail', userEmail.value);
      }
    }
  });
}

closeBtn.addEventListener('click', closelogin);
overlayElem.addEventListener('click', closelogin);

//модальное окно

var modalElem = document.querySelector('.modal');
var add = document.querySelector('.card__add');

var overlayElemModal = document.querySelector('.modal__overlay');
var closeCard = document.querySelector('.modal__close-btn');

if (modalElem) {
  function onEscKeyDown(evt) {
    if(evt.keyCode === ESC_KEYCODE) {
      document.body.classList.remove('stop-scrolling');
      modalElem.classList.add('modal--closed');
    }
  }

  function openModal() {
    if (modalElem.classList.contains('modal--closed')) {
      document.body.classList.add('stop-scrolling');
      modalElem.classList.remove('modal--closed');
      document.addEventListener('keydown', onEscKeyDown)
    }
  }

  function closeModal() {
    if (!modalElem.classList.contains('modal--closed')) {
      document.body.classList.remove('stop-scrolling');
      modalElem.classList.add('modal--closed');
      document.removeEventListener('keydown', onEscKeyDown)
    }
  }

  add.addEventListener('click', function(evt) {
    evt.preventDefault();
    openModal();
  });

  closeCard.addEventListener('click', closeModal);
  overlayElemModal.addEventListener('click', closeModal);
}
