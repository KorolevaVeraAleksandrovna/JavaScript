var formElement = document.forms['formElement'];

//formElement.onfocus = function(evt) {
//    var activeElement = formElement.querySelector('.focused');
//	if (activeElement) {
//	    activeElement.classList.remove('focused');
//    }
//    evt.target.classList.add('focused');
//};
//
//formElement.onblur = function(evt) {
//	var activeElement = formElement.querySelector('.focused');
//    if (activeElement) {
//     	activeElement.classList.remove('focused');
//    }
//};

formElement.addEventListener("focus", (evt) => evt.target.classList.add('focused'), true);
formElement.addEventListener("blur", (evt) => evt.target.classList.remove('focused'), true);