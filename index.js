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
const carousel = document.querySelectorAll('.carousel-wrapper');
const prevBtn = document.querySelectorAll('.prev-btn');
const nxtBtn = document.querySelectorAll('.nxt-btn');

carousel.forEach((el,i) => {
  el.scrollWidth === el.clientWidth && (nxtBtn[i].style.display = 'none');
  el.onscroll = (e) =>{
    if(window.innerWidth > 850){
      el.scrollLeft <= 0 ? prevBtn[i].style.display = 'none' : prevBtn[i].style.display = 'block';
      (el.scrollWidth - el.clientWidth) === el.scrollLeft ? nxtBtn[i].style.display = 'none' : nxtBtn[i].style.display = 'block';
    }
  }
});

nxtBtn.forEach((el,i) => {
  el.onclick = (e) => {
    carousel[i].scrollBy({left:carousel[i].clientWidth,behavior:"smooth"});
  }
})

prevBtn.forEach((el,i) => {
  el.onclick = (e) => {
    carousel[i].scrollBy({left:(carousel[i].clientWidth)*-1,behavior:"smooth"});
  }
});



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

//list=[{pic:'',title:'',id:''}]
function generateCarousleItems(carousel,list=[]){
  if(carousel) {
  const frag = document.createDocumentFragment();
  for(let item of list){
    let li = document.createElement('li');
    let a = document.createElement('a');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    let figcaption = document.createElement('figcaption');
    li.role = 'listitem';
    li.className = 'list-item';
    a.href = item?.id ? `${BASE_URL}/${item?.id}` : '';
    img.src = item?.pic;
    figcaption.innerText = item?.tile;
    figure.append(img,figcaption);
    a.append(figure);
    li.append(a);
    frag.append(li);
  };
  carousel.append(frag)
}
};