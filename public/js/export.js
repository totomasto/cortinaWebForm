let exportExcelAndSendMail = async ()=>{

    loadingModal(true);

    
    let email = document.getElementById('emailAddr').value;
    let dataPrint = await gatherOrderData('print');
    let dataAviz  = await gatherOrderData('aviz');
    let dataTransport = await gatherOrderData('transport');
    
    let data = [email, dataPrint, dataAviz, dataTransport];
    console.log(data);
    
    

    await fetch('/export/mail', {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then((response) => { 

        if(response.status === 200){
            document.getElementById('message').innerHTML = '<h2 style="color: green;">Mesaj transmis cu success</h2>';
        } else { 
            document.getElementById('message').innerHTML = '<h2 style="color : red;">Eroare : mesajul nu a fost transmis - cont. administratorul';
        }

        loadingModal(false);
    });
    
}



let exportExcel = async (type) => { 

    loadingModal(true);
    
    let data = await gatherOrderData(type);
    console.log(data);
   await fetch('/export/excel', {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(async (response)=>{
        // let path = 'http://cortina.ngrok.io/temp';
        let path = 'http://localhost:3001/temp';
        await setTimeout(function(){downloadGeneratedFile(response.filename, path)}, 2000);
        
        
    })  
   
    
}

let loadingModal = async (state) => {

    if(state == true){
    document.getElementById('loadingOverlay').style.display = 'block';
    } else if(state == false){
    document.getElementById('loadingOverlay').style.display = 'none';
    }


}




let downloadGeneratedFile = async (filename, path)=>{

let link = document.createElement('a');
link.setAttribute('href',`${path}/${filename}`); 
link.setAttribute('type','application/octet-stream');

link.click();
// stop loading screen 
loadingModal(false);

}



let gatherOrderData = async (type) => { 

    let data = [];


    let orderDetails =  {
        type : type,
        client     : document.getElementById('numeComanda').value + '-' + type,
        oras       : document.getElementById('orasComanda').value,
        judet      : document.getElementById('judetComanda').value,
        strada     : document.getElementById('adresaComanda').value,
        data       : document.getElementById('dataLivrare').value,
        observatii : document.getElementById('obs').value,
        docplata   : document.getElementById('docPlata').value,
        zile       : document.getElementById('zilePlata').value,
        livrare    : document.getElementById('livrare').value,
        sofer      : document.getElementById('sofer').value,
        agent      : document.getElementById('agent').value,
        subtotal   : parseFloat(document.getElementById('sub').innerHTML),
        tva        : parseFloat(document.getElementById('tva').innerHTML),
        total      : parseFloat(document.getElementById('total').innerHTML),
        
    

    }

    data.push(orderDetails);


        for(let i = 0 ; i<12; i++){   //30 just to be safe

            if(document.getElementById(`units_${i}`).value > 0 ){

                let element = { 
                    
                    name : document.getElementById(`name_${i}`).value,
                    width : document.getElementById(`width_${i}`).value,
                    length : document.getElementById(`length_${i}`).value,
                    units : document.getElementById(`units_${i}`).value,
                    price : document.getElementById(`price_${i}`).value,
                    total : document.getElementById(`total_${i}`).value
                }

                data.push(element);


            }


        }

       
        
        return data;

}