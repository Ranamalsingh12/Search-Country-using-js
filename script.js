const button = document.getElementsByClassName('button')[0];
const links = document.getElementsByClassName('links')[0];
const countires = document.querySelector('.countries');
const search = document.querySelector('.search')
button.addEventListener('click',() => {
    links.classList.toggle('active');
})

async function getData(){
    const data = await fetch(`https://restcountries.com/v3.1/all`)
    const res = await data.json()
    var res2 = res.sort(function compare(a,b){
        var nameA = a.ccn3;
        var nameB = b.ccn3;
        if(nameA==nameB){
            return a.ccn3 - b.ccn3
        }else{
            return nameA-nameB
        }
    })
    console.log(res2);
    res.forEach(element => {
        // console.log(element);
        showData(element)
    });
}
getData();
function showData(data){
    const country = document.createElement("div")
    country.classList.add("country")
    country.innerHTML = `
    <div class="country-info">
        <div class="cou-img">
            <img src=${data.flags.png} alt="">
        </div>
        <div class="cou-details">
            <h2 class="couName">${data.name.common}</h2>
            <p><strong>Capital:</strong>${data.capital}</p>
            <p><strong>continent:</strong>${data.continents}</p>
            <p><strong>Language:</strong> ${
                data.languages ? data.languages[Object.keys(data.languages)[0]] : '' }</p>
            <p><strong>Population:</strong> ${data.population}</p>
            <button class="btn"><a href=${data.maps.googleMaps} target="_blank">googleMaps</a></button>
            <button class="btn"><a href=${data.maps.openStreetMaps} target="_blank">openStreetMap</a></button>
        </div>
    </div>`
    countires.appendChild(country)
}
const couname = document.getElementsByClassName('couName')
search.addEventListener('input',() => {
    Array.from(couname).forEach(element => {
        if(element.innerText.toLowerCase().includes(search.value.toLowerCase())){
            element.parentElement.parentElement.style.display = "flex"
        }else{
            element.parentElement.parentElement.style.display = "none"
        }
    })
})
