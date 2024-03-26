const BASE_URL = "https://penates-fe.vercel.app/";
const scrollTopBtn = document.getElementById("scroll-top");
const form = document.forms[0];
const contactForm = document.forms[1];
const mobileScreenTypeSelect = document.querySelector("select[name=type]");
const mobileScreenLocationSelect = document.querySelector("select[name=location]");
const mobileScreenBudgetSelect = document.querySelector("select[name=budget]");
const phoneInputField = document.querySelector("#phone");
const phoneErro  = document.querySelector(".alert");
const successBox  = document.querySelector(".success-box");
const carousel = document.querySelector('.carousel-wrapper');
const prevBtn = document.getElementById('prev-btn');
const nxtBtn = document.getElementById('nxt-btn');

carousel.scrollWidth === carousel.clientWidth && (nxtBtn.style.display = 'none');

nxtBtn.onclick = (e) => {
  carousel.scrollBy({left:carousel.clientWidth,behavior:"smooth"});
}

prevBtn.onclick = (e) => {
  carousel.scrollBy({left:(carousel.clientWidth)*-1,behavior:"smooth"});
}

carousel.onscroll = (e) =>{
  if(window.innerWidth > 850){
    carousel.scrollLeft <= 0 ? prevBtn.style.display = 'none' : prevBtn.style.display = 'block';
    (carousel.scrollWidth - carousel.clientWidth) === carousel.scrollLeft ? nxtBtn.style.display = 'none' : nxtBtn.style.display = 'block';
  }
}

const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  preferredCountries: ["eg", "ae", "kw", "sa", "us"],
});

window.onscroll = (e) => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.onclick = (e) => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let propertyType = formData.get("type");
  let location = formData.get("location");
  let budget = formData.get("budget");
  let targetUrl = `${BASE_URL}?type=${propertyType}&location=${location}&budget=${budget}`;
  console.log(targetUrl);
  // window.location.href = targetUrl
});


contactForm.onsubmit = (e) => {
  e.preventDefault();
  successBox.classList.remove('success')
  if(phoneInput.isValidNumber()){
    const formData = new FormData(contactForm);
    formData.set("phone", phoneInput.getNumber());
    contactForm.reset();
    successBox.classList.add('success')
    phoneErro.style.display = 'none';
  }else{
    phoneErro.style.display = 'block';
  }
  
};

function generateMobileScreenSelectOptions(
  optionList = [],
  targetElement = HTMLSelectElement
) {
  const frag = document.createDocumentFragment();
  optionList.forEach((el, i) => {
    let option = document.createElement("option");
    option.value = el;
    option.innerText = el;
    frag.append(option);
  });
  targetElement.append(frag);
}

generateMobileScreenSelectOptions(
  ["villa", "house", "apartment"],
  mobileScreenTypeSelect
);
generateMobileScreenSelectOptions(
  ["villa", "house", "apartment"],
  mobileScreenLocationSelect
);
generateMobileScreenSelectOptions(
  ["villa", "house", "apartment"],
  mobileScreenBudgetSelect
);
