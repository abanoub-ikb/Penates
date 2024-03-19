
const form = document.forms[0];
const wideScreenTypeSelect = document.getElementById('type');
const mobileScreenTypeSelect = document.querySelector('select[name=type]');
const wideScreenLocationSelect = document.getElementById('location');
const mobileScreenLocationSelect = document.querySelector('select[name=location]');
const wideScreenBudgetSelect = document.getElementById('budget');
const mobileScreenBudgetSelect = document.querySelector('select[name=budget]');

const BASE_URL = 'https://penates-fe.vercel.app/';
let isWideScreen = true;

form.addEventListener('submit',e=>{
    e.preventDefault();
    let dataIndex = isWideScreen ? 0 : 1;
    const formData = new FormData(form);
    let propertyType = formData.getAll('type')[dataIndex];
    let location = formData.getAll('location')[dataIndex];
    let budget = formData.getAll('budget')[dataIndex];
    let targetUrl = `${BASE_URL}?type=${propertyType}&location=${location}&budget=${budget}`
    // window.location.href = targetUrl
});

form.addEventListener('click',e =>{
    if(e.target.classList.contains('mobile') || e.target.classList.contains('wide')){
        isWideScreen = e.target.classList.contains('mobile') ? false : true;
    };
});

function generateWideScreenSelectOptions(optionList = [],targetElement = HTMLDivElement,name = '',id = ''){
    const frag = document.createDocumentFragment();
    optionList.forEach((el,i)=>{
        let inputId = `${id}-${i+1}`;
        let input = document.createElement('input');
        let inputLabel = document.createElement('label');
        input.type = 'radio';
        input.classList.add('selectopt');
        input.value = el;
        input.name = name
        input.id = inputId;
        inputLabel.classList.add('option');
        inputLabel.setAttribute('for',inputId);
        inputLabel.innerText = el;
        frag.append(input,inputLabel);
    });
    targetElement.append(frag)
};

function generateMobileScreenSelectOptions(optionList = [],targetElement = HTMLSelectElement){
    const frag = document.createDocumentFragment();
    optionList.forEach((el,i)=>{
        let option = document.createElement('option');
        option.value = el;
        option.innerText = el;
        frag.append(option);
    });
    targetElement.append(frag)
};

generateWideScreenSelectOptions(['villa','house','apartment'],wideScreenTypeSelect,'type','type');
generateWideScreenSelectOptions(['villa','house','apartment'],wideScreenLocationSelect,'location','location');
generateWideScreenSelectOptions(['villa','house','apartment'],wideScreenBudgetSelect,'budget','budget');

generateMobileScreenSelectOptions(['villa','house','apartment'],mobileScreenTypeSelect);
generateMobileScreenSelectOptions(['villa','house','apartment'],mobileScreenLocationSelect);
generateMobileScreenSelectOptions(['villa','house','apartment'],mobileScreenBudgetSelect);