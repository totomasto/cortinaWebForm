let fetchProducts = async () => {

    // if(localStorage.getItem('DBProducts')){

        
<<<<<<< HEAD
        await displayLeftProducts(JSON.parse(localStorage.getItem('DBProducts'))); 
        await displaySecondLeftProduct(JSON.parse(localStorage.getItem('DBProducts')));
        await displayRightProducts(JSON.parse(localStorage.getItem('DBProducts')));
=======
    //     await displayLeftProducts(JSON.parse(localStorage.getItem('DBProducts'))); 
    //     await displayRightProducts(JSON.parse(localStorage.getItem('DBProducts')));
>>>>>>> bba93d9dd7d3877caac9d1191ccf91282ecb951d

    // } else {

    const url = 'http://72c578e3.ngrok.io/cortina/form/products';

    fetch(url, {
        method: 'GET', // or 'PUT'
       
      }).then((res) => { return res.json()})
      .then(async (data) => {
         
          console.log(data);
          await displayLeftProducts(data); 
          await displaySecondLeftProduct(data);
          await displayRightProducts(data);
          await uploadDataToLocalStorage(data);
      })
      .catch(error => console.error('Error:', error));

    // }



}



let displayLeftProducts = async (data) => {

    let leftTable = document.getElementById('leftTable');

    for(let i = 0 ; i<4; i++){


    let name = `<select class="form-control"  onchange="updateWidth(this.value, this.id); updatePrice(this.id);" id="name_${i}" style="width:150px;"><option value="" selected="">Selecteaza Tabla Cutata</option>`;
    

    data.forEach((element)=> { 
<<<<<<< HEAD
        if(element.name.includes('W')){
=======
        if(element.name.includes('W8')){
>>>>>>> bba93d9dd7d3877caac9d1191ccf91282ecb951d
        name += `<option value="${element.name}" >${element.name}</option>`; 
        // width += `<option value="${element.width}" > ${element.width}</option>`;
        // console.log(element);
        }

    });

let row = leftTable.insertRow(-1);
let cell1 = row.insertCell(-1);
let cell2 = row.insertCell(-1);
let cell3 = row.insertCell(-1);
let cell4 = row.insertCell(-1);
let cell5 = row.insertCell(-1);
let cell6 = row.insertCell(-1);

    name += '</select>';
    // width += '</select>';
    let width  = cell2.innerHTML  = `<input class="form-control" id="width_${i}"  style="width:100px;" readonly="">`;
    let length = cell3.innerHTML  = `<input class="form-control" id="length_${i}" onchange="updatePrice(this.id);" value="2000" min="0" style="width:80px;" type="number">`;
    let units  = cell4.innerHTML  = `<input class="form-control" id="units_${i}"  onchange="updatePrice(this.id);" min="0" style="width:70px;" type="number">`;  
    let price  = cell5.innerHTML  = `<input class="form-control" id="price_${i}" style="width:100px;" readonly="" type="number">`; 
    let total  = cell6.innerHTML  = `<input class="form-control" id="total_${i}" style="width:100px;" readonly="" type="number"> `; 

    cell1.innerHTML = name; 
    
    
    
    }

    for(let i = 4 ; i<8; i++){


        let name = `<select class="form-control"  onchange="updateWidth(this.value, this.id); updatePrice(this.id);" id="name_${i}" style="width:150px;"><option value="" selected="">Selecteaza Tabla Cutata</option>`;
        
    
        data.forEach((element)=> { 
<<<<<<< HEAD
            if(element.name.includes('W')){
=======
            if(element.name.includes('W8')){
>>>>>>> bba93d9dd7d3877caac9d1191ccf91282ecb951d
            name += `<option value="${element.name}" >${element.name}</option>`; 
            // width += `<option value="${element.width}" > ${element.width}</option>`;
            // console.log(element);
            }
    
        });
    
    let row = leftTable.insertRow(-1);
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    let cell5 = row.insertCell(-1);
    let cell6 = row.insertCell(-1);
    
        name += '</select>';
        // width += '</select>';
        let width  = cell2.innerHTML  = `<input class="form-control" id="width_${i}"  style="width:100px;" readonly="">`;
        let length = cell3.innerHTML  = `<input class="form-control" id="length_${i}" onchange="updatePrice(this.id);"  min="0" style="width:80px;" type="number">`;
        let units  = cell4.innerHTML  = `<input class="form-control" id="units_${i}"  onchange="updatePrice(this.id);" min="0" style="width:70px;" type="number">`;  
        let price  = cell5.innerHTML  = `<input class="form-control" id="price_${i}" style="width:100px;" readonly="" type="number">`; 
        let total  = cell6.innerHTML  = `<input class="form-control" id="total_${i}" style="width:100px;" readonly="" type="number"> `; 
    
        cell1.innerHTML = name; 
        
        
        
        }
     

}

let displayRightProducts = async (data) => {

    let rightTable = document.getElementById('rightTable');

    for(let i = 8 ; i<12; i++){


    let name = `<select class="form-control"  onchange="updateWidth(this.value, this.id); updatePrice(this.id);" id="name_${i}" style="width:150px;"><option value="" selected="">Selecteaza Tabla Cutata</option>`;
    

    data.forEach((element)=> { 
        if(element.name.includes('Plana')){
        name += `<option value="${element.name}" >${element.name}</option>`; 
        // width += `<option value="${element.width}" > ${element.width}</option>`;
        // console.log(element);
        }

    });

let row = rightTable.insertRow(-1);
let cell1 = row.insertCell(-1);
let cell2 = row.insertCell(-1);
let cell3 = row.insertCell(-1);
let cell4 = row.insertCell(-1);
let cell5 = row.insertCell(-1);
let cell6 = row.insertCell(-1);

    name += '</select>';
    // width += '</select>';
    let width  = cell2.innerHTML  = `<input class="form-control" id="width_${i}"  style="width:100px;" readonly="">`;
    let length = cell3.innerHTML  = `<input class="form-control" id="length_${i}" onchange="updatePrice(this.id);" value="2000"  style="width:80px;" type="number" readonly="">`;
    let units  = cell4.innerHTML  = `<input class="form-control" id="units_${i}"  onchange="updatePrice(this.id);" min="0" style="width:70px;" type="number">`;  
    let price  = cell5.innerHTML  = `<input class="form-control" id="price_${i}" style="width:100px;" readonly="" type="number">`; 
    let total  = cell6.innerHTML  = `<input class="form-control" id="total_${i}" style="width:100px;" readonly="" type="number">`; 

    cell1.innerHTML = name; 
    
    
    
    }
     

}


let displaySecondLeftProduct = async (data) => {

    let secondLeftTable = document.getElementById('leftSecondTable');

    for(let i = 12 ; i<15; i++){


        let name = `<select class="form-control"  onchange=" updatePriceFolie(this.id);" id="name_${i}" style="width:150px;">`;
        
    
        data.forEach((element)=> { 
            if(element.name.includes('Folie')){
            name += `<option value="${element.name}" >${element.name}</option>`; 
            // width += `<option value="${element.width}" > ${element.width}</option>`;
            // console.log(element);
            }
    
        });
    
    let row = secondLeftTable.insertRow(-1);
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    let cell5 = row.insertCell(-1);
   
    
        name += '</select>';
        
        let person = cell2.innerHTML  = `<select class="form-control" onchange="updatePriceFolie(this.id);" id="person_${i}"><option value="PJ" selected="">PJ</option><option value="PF">PF</option></select> `  
        let units  = cell3.innerHTML  = `<input class="form-control" id="units_${i}"  onchange="updatePriceFolie(this.id);" min="0" style="width:70px;" type="number">`;
        let price  = cell4.innerHTML  = `<input class="form-control" id="price_${i}" style="width:100px;" readonly="" type="number">`; 
        let total  = cell5.innerHTML  = `<input class="form-control" id="total_${i}" style="width:100px;" readonly="" type="number">`; 
    
        cell1.innerHTML = name; 
        
        
        
        }


}



let uploadDataToLocalStorage = async (data) => { 

let convertedData = JSON.stringify(data);

localStorage.setItem('DBProducts', convertedData);

}


let updateWidth = async (name, id) => {

if(name === ""){
    
} else { 
    
    id = id.match(/\d+/)[0];
    
    let data = JSON.parse(localStorage.getItem('DBProducts'));

    data.forEach((element)=>{

        if(element.name === name){

            document.getElementById(`width_${id}`).value = element.width;
        
        }

    });
    
}


}


let updatePrice = async (id) => { 

    id = id.match(/\d+/)[0];
    
    if(document.getElementById(`length_${id}`).value.length == 0 || document.getElementById(`width_${id}`).value.length == 0 || document.getElementById(`units_${id}`).value.length == 0){
        
        console.log('Product not suitable for price calculation check length, width or units');
        
    } else { 
        
        let name   = document.getElementById(`name_${id}`).value;
        let length = document.getElementById(`length_${id}`).value;
        let width  = document.getElementById(`width_${id}`).value;
        let units  = document.getElementById(`units_${id}`).value
        let data = JSON.parse(localStorage.getItem('DBProducts'));

        // daca lungimea depaseste 2000 se adauga un leu la pret 
        let price = (length > 2000) ? 1 : 0;  
        (length < 2000) ? price = price + 1 : 0;
         
         
        data.forEach((element)=>{

            if(element.name === name){
                
                    if(units <= 100 ){
                         price += element.price_1;
                    } else if(units <= 200 ){
                         price += element.price_2;
                    } else if(element.price_3 == 0 ){ // conditia se aplica pentru tabla plana care nu are price_3 doar 1 si 2 iar in cazul unei valori mai mari se aplica price_2
                         price += element.price_2;
                    } else { // continua cu price_3 cutata 
                        price += element.price_3;
                    }

                    if(length != 2000){
                        console.log(length);
                        pricemp = price / (2000/1000 * width/1000 * units) / 1.19;
                        price = (pricemp * (length / 1000 * width/1000 * units) * 1.19).toFixed(2);
                    }

                    document.getElementById(`price_${id}`).value = price;
                    document.getElementById(`total_${id}`).value = price * units;
                    displayTotal();
            }


        });


        
     
    }



}


let updatePriceFolie = async (id) => {

    id = id.match(/\d+/)[0];

    if(document.getElementById(`units_${id}`).value.length == 0){

        console.log('Product not suitable for price calculation , check units ');

    } else {

        let name   = document.getElementById(`name_${id}`).value;
        let units  = document.getElementById(`units_${id}`).value;
        let person = document.getElementById(`person_${id}`).value;
        let data = JSON.parse(localStorage.getItem('DBProducts'));

        let price = 0 ;

        data.forEach((element)=>{

            if(element.name === name){

                if(person === 'PF'){ price += element.price_6 }
                else if(units > 50) {price += element.price_1}
                else if(units <= 50 && units > 25) {price += element.price_2}
                else if(units <= 25 && units > 10) {price += element.price_3}
                else if(units <=10 && units >= 5) {price += element.price_4 }
                else if(units <= 4 && units >= 1 ){ price += element.price_5 }
                

                document.getElementById(`price_${id}`).value = price;
                document.getElementById(`total_${id}`).value = price * units;
                displayTotal();


            }


        });


    }



}


let displayTotal = async () => { 

    let total = 0; 
    let tva = 0;
    let sub = 0;
    for(let i = 0; i < 15; i++){
        if(document.getElementById(`total_${i}`).value > 0){
            total += parseFloat(document.getElementById(`total_${i}`).value);
        }
    }
    
    document.getElementById('total').innerHTML = (total).toFixed(2); 
    document.getElementById('sub').innerHTML = (total / (1.19)).toFixed(2);
    document.getElementById('tva').innerHTML = (total - (total / (1.19))).toFixed(2);
    // if(document.getElementById('eurValue').value > 0){
    //     document.getElementById('totalEur').innerHTML = (total / document.getElementById('eurValue').value).toFixed(2);
    // }


}



let completeEmail = async (email) => {

let element = document.getElementById('emailAddr');

    if(element.value.includes(email)){
        element.value = element.value.replace(email, "");
    } else { 
    
    element.value += email;
    
    }

}


fetchProducts();