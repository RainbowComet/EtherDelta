document.addEventListener('DOMContentLoaded', function () {
    const optionButtons = document.querySelectorAll('.js-login-option-btn');
    const submitButton = document.querySelector('.js-login-option-submit-btn');

    optionButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            optionButtons.forEach(b => b.classList.remove('popup__btn--active'));


            this.classList.add('popup__btn--active');


            if (submitButton) {
                submitButton.removeAttribute('disabled');
            }
        });
    });

});


document.addEventListener('DOMContentLoaded', function () {
    const fadeDuration = 300;

    function fadeOut(el) {
        el.style.transition = `opacity ${fadeDuration}ms ease`;
        el.style.opacity = 0;
        setTimeout(() => {
            el.style.display = 'none';
            el.classList.remove('is-visible');
        }, fadeDuration);
    }

    function fadeIn(el) {
        el.style.display = 'flex';
        el.classList.add('is-visible');
        requestAnimationFrame(() => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.style.transition = `opacity ${fadeDuration}ms ease`;
                el.style.opacity = 1;
            }, 10);
        });
    }

    document.querySelectorAll('.js-login-option-submit-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const currentOverlay = this.closest('.popup-overlay');
            if (!currentOverlay) return;

            const activeBtn = currentOverlay.querySelector('.popup__btn--active');
            if (!activeBtn) return;

            const option = activeBtn.getAttribute('data-login-option');
            if (!option) return;

            fadeOut(currentOverlay);

            document.querySelector('.popup__textarea--error')?.classList.remove('popup__textarea--error');
            document.querySelector('.popup__textarea--active')?.classList.remove('popup__textarea--active');
            document.querySelector('.js-login-option-1-submit-btn').disabled = true;
            document.querySelector('#phrase').value = '';


            const newPopup = document.querySelector('.login-option-popup-' + option);
            if (newPopup) {
                setTimeout(() => {
                    fadeIn(newPopup);
                }, fadeDuration);
            }
        });
    });

    document.querySelectorAll('.js-login-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const popup = document.querySelector('.login-option-popup');
            if (!popup) return;

            popup.querySelectorAll('.popup__btn--active').forEach(activeBtn => {
                activeBtn.classList.remove('popup__btn--active');
            });

            const submitBtn = popup.querySelector('.js-login-option-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
            }

            fadeIn(popup);
        });
    });

});


document.addEventListener('DOMContentLoaded', function () {
    const overlaySelector = '.popup-overlay';
    const popupSelector = '.popup';
    const activeClass = 'is-visible';
    const fadeDuration = 300;

    function closePopup(popupOverlay) {
        if (!popupOverlay) return;

        popupOverlay.classList.remove(activeClass);
        popupOverlay.style.opacity = 1;

        const fade = setInterval(() => {
            if (!popupOverlay.style.opacity) {
                popupOverlay.style.opacity = 1;
            }
            if (popupOverlay.style.opacity > 0) {
                popupOverlay.style.opacity -= 0.1;
            } else {
                clearInterval(fade);
                popupOverlay.style.display = 'none';
            }
        }, fadeDuration / 10);
    }

    document.querySelectorAll(overlaySelector).forEach(popupOverlay => {
        const popup = popupOverlay.querySelector(popupSelector);

        popupOverlay.addEventListener('click', function (e) {
            if (!popup.contains(e.target)) {
                closePopup(popupOverlay);
            }
        });

        popupOverlay.querySelectorAll('.js-close-popup-btn, .js-back-btn').forEach(btn => {
            btn.addEventListener('click', () => closePopup(popupOverlay));
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const pasteBtn = document.querySelector(".js-paste-btn");
    const phraseInput = document.querySelector("#phrase");

    if (pasteBtn && phraseInput) {
        pasteBtn.addEventListener("click", async function () {
            try {
                const text = await navigator.clipboard.readText();
                phraseInput.value = text;
                phraseInput.dispatchEvent(new Event('input')); // если нужно триггерить слушатели input
            } catch (err) {
                console.error("Ошибка при чтении из буфера обмена:", err);
                alert("Не удалось вставить текст. Разрешите доступ к буферу обмена.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const phraseInput = document.querySelector("#phrase");
    const submitBtn = document.querySelector(".js-login-option-1-submit-btn");

    if (phraseInput) {
        phraseInput.addEventListener("input", function () {
            const value = phraseInput.value.trim();

            phraseInput.classList.toggle("popup__textarea--active", value.length > 0);

            phraseInput.classList.remove("popup__textarea--error");

            if (submitBtn) {
                submitBtn.disabled = value.length === 0;
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector(".js-login-option-1-submit-btn");
    const phraseInput = document.querySelector("#phrase");
    const errorPopup = document.querySelector(".error-popup");
    const errorText = document.querySelector("#error-popup-text");

    let hideTimeout;

    if (submitBtn && phraseInput && errorPopup && errorText) {
        submitBtn.addEventListener("click", function () {
            phraseInput.classList.add("popup__textarea--error");
            submitBtn.disabled = true;

            errorText.textContent = "Error: Invalid Mnemonic";
            errorPopup.style.display = "flex";
            errorPopup.style.opacity = "0";
            errorPopup.style.transition = "opacity 0.3s ease";

            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }

            setTimeout(() => {
                errorPopup.style.opacity = "1";
            }, 10);

            hideTimeout = setTimeout(() => {
                errorPopup.style.opacity = "0";
                setTimeout(() => {
                    errorPopup.style.display = "none";
                }, 300);
            }, 4000);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const errorPopup = document.querySelector(".error-popup");
    const closeErrorBtn = document.querySelector(".js-close-error-popup-btn");

    if (errorPopup && closeErrorBtn) {
        closeErrorBtn.addEventListener("click", function () {
            errorPopup.style.opacity = "0";
            setTimeout(() => {
                errorPopup.style.display = "none";
            }, 300);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.querySelector(".js-open-login-option-popup-btn");
    const targetPopup = document.querySelector(".login-option-popup");

    if (openBtn && targetPopup) {
        openBtn.addEventListener("click", function () {
            const parentOverlay = openBtn.closest(".popup-overlay");

            if (parentOverlay) {
                parentOverlay.style.transition = "opacity 0.3s ease";
                parentOverlay.style.opacity = "0";

                setTimeout(() => {
                    parentOverlay.style.display = "none";
                }, 300);
            }

            targetPopup.style.display = "flex";
            targetPopup.style.opacity = "0";
            targetPopup.style.transition = "opacity 0.3s ease";

            setTimeout(() => {
                targetPopup.style.opacity = "1";
            }, 10);
        });
    }
});
