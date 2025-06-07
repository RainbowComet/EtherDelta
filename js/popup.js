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
    const fadeDuration = 500;

    function fadeOut(el) {
        el.style.transition = `opacity ${fadeDuration}ms ease`;
        el.style.opacity = 0;
        setTimeout(() => {
            el.style.display = 'none';
            el.classList.remove('is-visible');
            el.querySelector('.popup').classList.remove('show');
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
                el.querySelector('.popup').classList.add('show');
            }, 10);
        });
    }

    const openButtons = document.querySelectorAll(".js-open-login-option-popup-btn");

    openButtons.forEach((openBtn) => {
        openBtn.addEventListener("click", function () {
            const parentOverlay = openBtn.closest(".popup-overlay");
            const popupNumber = parentOverlay?.className.match(/login-option-popup-(\d+)/)?.[1];
            const targetPopup = document.querySelector(`.login-option-popup`);

            if (parentOverlay) {
                fadeOut(parentOverlay);
            }

            document.querySelector(`.popup__btn--active`)?.classList.remove('popup__btn--active');
            document.querySelector(`.js-login-option-submit-btn`).disabled = true;

            if (targetPopup) {
                fadeIn(targetPopup);
            }
        });
    });

    document.querySelectorAll('.js-login-option-submit-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const currentOverlay = this.closest('.popup-overlay');
            if (!currentOverlay) return;

            const activeBtn = currentOverlay.querySelector('.popup__btn--active');
            if (!activeBtn) return;

            const option = activeBtn.getAttribute('data-login-option');
            if (!option) return;

            document.querySelector('.popup__textarea--error')?.classList.remove('popup__textarea--error');
            document.querySelector('.popup__textarea--active')?.classList.remove('popup__textarea--active');
            document.querySelector('.js-login-option-1-submit-btn').disabled = true;
            document.querySelector('#phrase').value = '';
            document.querySelector('.js-login-option-2-submit-btn').disabled = true;
            document.querySelector('#key').value = '';
            document.querySelector('.js-login-option-3-submit-btn').disabled = true;
            document.querySelector('#password').value = '';
            document.getElementById('password').type = 'password';
            document.getElementById('show-pass').classList.remove('display-none');
            document.getElementById('hide-pass').classList.add('display-none');

            toNextPopup = true;

            if (option == 3) {
                toNextPopup = false;
                const fileInput = document.getElementById('file');
                fileInput.value = "";
                fileInput.click();
                fileInput.onchange = () => {
                    if (fileInput.files.length === 0) {
                        toNextPopup = false;
                    } else {
                        toNextPopup = true;
                        fadeOut(currentOverlay);
                        const newPopup = document.querySelector('.login-option-popup-' + option);
                        if (newPopup) {
                            setTimeout(() => {
                                fadeIn(newPopup);
                            }, fadeDuration);
                        }
                    }
                };
            }
            if (toNextPopup) {
                fadeOut(currentOverlay);
                const newPopup = document.querySelector('.login-option-popup-' + option);
                if (newPopup) {
                    setTimeout(() => {
                        fadeIn(newPopup);
                    }, fadeDuration);
                }
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


    const overlaySelector = '.popup-overlay';
    const popupSelector = '.popup';

    document.querySelectorAll(overlaySelector).forEach(popupOverlay => {
        const popup = popupOverlay.querySelector(popupSelector);

        popupOverlay.addEventListener('click', function (e) {
            if (!popup.contains(e.target)) {
                fadeOut(popupOverlay);
            }
        });

        popupOverlay.querySelectorAll('.js-close-popup-btn, .js-back-btn').forEach(btn => {
            btn.addEventListener('click', () => fadeOut(popupOverlay));
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
                phraseInput.dispatchEvent(new Event('input'));
            } catch (err) {
                console.error("Ошибка при чтении из буфера обмена:", err);
                alert("Не удалось вставить текст. Разрешите доступ к буферу обмена.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const pasteBtn = document.querySelector(".js-paste-key-btn");
    const keyInput = document.querySelector("#key");

    if (pasteBtn && keyInput) {
        pasteBtn.addEventListener("click", async function () {
            try {
                const text = await navigator.clipboard.readText();
                keyInput.value = text;
                keyInput.dispatchEvent(new Event('input'));
            } catch (err) {
                console.error("Ошибка при чтении из буфера обмена:", err);
                alert("Не удалось вставить текст. Разрешите доступ к буферу обмена.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const pasteBtn = document.querySelector(".js-paste-password-btn");
    const keyInput = document.querySelector("#password");

    if (pasteBtn && keyInput) {
        pasteBtn.addEventListener("click", async function () {
            try {
                const text = await navigator.clipboard.readText();
                keyInput.value = text;
                keyInput.dispatchEvent(new Event('input'));
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
    const phraseInput = document.querySelector("#key");
    const submitBtn = document.querySelector(".js-login-option-2-submit-btn");

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
    const phraseInput = document.querySelector("#password");
    const submitBtn = document.querySelector(".js-login-option-3-submit-btn");

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
    const submitBtn = document.querySelector(".js-login-option-2-submit-btn");
    const phraseInput = document.querySelector("#key");
    const errorPopup = document.querySelector(".error-popup");
    const errorText = document.querySelector("#error-popup-text");

    let hideTimeout;

    if (submitBtn && phraseInput && errorPopup && errorText) {
        submitBtn.addEventListener("click", function () {
            phraseInput.classList.add("popup__textarea--error");
            submitBtn.disabled = true;

            errorText.textContent = "Error: Invalid Private Key";
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
    const submitBtn = document.querySelector(".js-login-option-3-submit-btn");
    const phraseInput = document.querySelector("#password");
    const errorPopup = document.querySelector(".error-popup");
    const errorText = document.querySelector("#error-popup-text");

    let hideTimeout;

    if (submitBtn && phraseInput && errorPopup && errorText) {
        submitBtn.addEventListener("click", function () {
            phraseInput.classList.add("popup__textarea--error");
            submitBtn.disabled = true;

            errorText.textContent = "Error: Invalid File or Password";
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

const passwordInput = document.getElementById('password');
const showPassBtn = document.getElementById('show-pass');
const hidePassBtn = document.getElementById('hide-pass');

showPassBtn.addEventListener('click', () => {
    passwordInput.type = 'text';
    showPassBtn.classList.add('display-none');
    hidePassBtn.classList.remove('display-none');
});

hidePassBtn.addEventListener('click', () => {
    passwordInput.type = 'password';
    hidePassBtn.classList.add('display-none');
    showPassBtn.classList.remove('display-none');
});