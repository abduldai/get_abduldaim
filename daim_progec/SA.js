let tatal = document.getElementById('tatal');
let price = document.getElementById('price');
let texts = document.getElementById('texts');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let subm = document.getElementById('subm');

let mood = 'create';
let tmp;

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +texts.value + +ads.value + +discount.value);
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}



subm.onclick = function() {
    let newPro = {
        tatal: tatal.value.toLowerCase(),
        price: price.value,
        texts: texts.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    if (tatal.value != '' &&
        price.value != '' &&
        category.value != '' &&
        newPro.count < 1000) {

        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro)
            }

        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            subm.innerHTML = 'اضافة المنتج';
            count.style.display = 'block';
        }
        clearData();
    }



    localStorage.setItem('product', JSON.stringify(dataPro));


    showData();
}



function clearData() {
    tatal.value = '';
    price.value = '';
    texts.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `    
                <tr>
                    <td>${i +1}</td>
                    <td>${dataPro[i].tatal}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].texts}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="upddeet(${i})" id="upddate">تعديل المنتج</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">حذف المنتج</button></td>
                </tr>
                `
    }
    document.getElementById('tbody').innerHTML = table;
    let deletes = document.getElementById('daleteAll');
    if (dataPro.length > 0) {
        deletes.innerHTML = `<button onclick="deletell()">حذف الكل(${dataPro.length})</button>`
    } else {
        deletes.innerHTML = '';
    }
}
showData()


function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deletell() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

function upddeet(i) {
    tatal.value = dataPro[i].tatal;
    price.value = dataPro[i].price;
    texts.value = dataPro[i].texts;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    subm.innerHTML = 'تعديل المنتج';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

let sershmood = 'tatal';

function getsershmod(id) {
    let search = document.getElementById('search');
    if (id == 'searchtit') {
        sershmood = 'tatal';


    } else {
        sershmood = 'category';

    }
    search.placeholder = 'Search By ' + sershmood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {

    let table;
    for (let i = 0; i < dataPro.length; i++) {
        if (sershmood == 'tatal') {
            if (dataPro[i].tatal.includes(value)) {
                table += `    
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].tatal}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].texts}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upddeet(${i})" id="upddate">upddate</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
            }
        } else {

            if (dataPro[i].category.includes(value())) {
                table += `    
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].tatal}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].texts}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="upddeet(${i})" id="upddate">upddat</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}