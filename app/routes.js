const Excel = require('exceljs');
const fs = require('fs');
const path = require('path');
module.exports = function(app, passport) {


    app.get('/',(req, res)=>{ res.render('login.pug');  });
    app.get('/login', (req, res)=>{ res.render('login.pug') });
    app.get('/home', isLoggedIn , (req, res)=>{ res.render('index.pug') });

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}),
function(req, res) {
    console.log("hello");

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
res.redirect('/home');
});


// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/home', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}























//  EVERYTHING DOWN THERE IS EXPORT EXCEL MOVE IT OR DO WHATEVER 
app.post('/export/mail', async(req,res)=>{
let absolutePath = path.dirname(process.mainModule.filename);
let email = req.body[0];
let print = req.body[1];
let aviz  = req.body[2];
let transport = req.body[3]; 
    // console.log(email , print , aviz , transport);
await exportExcel(print, async (err, filename)=>{});
await exportExcelAviz(aviz, async (err, filename)=>{});
await exportExcelTransport(transport, async (err, filename)=>{});

setTimeout(async function(){
    console.log('Wait for 5 sec');
    console.log(`${absolutePath}/public/temp/${print[0].client}`);
let mailOptions = {
    to: email + ';iuliana.nita@wetterbest.ro;tomas.niculae@wetterbest.ro',
    subject : print[0].client,
    attachments : [
        {
           fileName : `${print[0].client}.xlsx`, 
           filePath : `${absolutePath}/public/temp/${print[0].client}.xlsx`
        },
        {
            fileName : `${aviz[0].client}.xlsx`, 
            filePath : `${absolutePath}/public/temp/${aviz[0].client}.xlsx`
         },
         {
            fileName : `${transport[0].client}.xlsx`, 
            filePath : `${absolutePath}/public/temp/${transport[0].client}.xlsx`
         }
        
    ]
}


await app.mailer.send('email', mailOptions, function (err, message){
    if (err) { console.log(err);  }
    res.sendStatus(200);

    if(fs.existsSync(`${absolutePath}/public/temp/${print[0].client}.xlsx`)){

    fs.unlink(`${absolutePath}/public/temp/${print[0].client}.xlsx`, (err)=>{});
    
    }


    if(fs.existsSync(`${absolutePath}/public/temp/${aviz[0].client}.xlsx`)){


    fs.unlink(`${absolutePath}/public/temp/${aviz[0].client}.xlsx`, (err)=>{ });
    
    }

    if(fs.existsSync(`${absolutePath}/public/temp/${transport[0].client}.xlsx`)){

    fs.unlink(`${absolutePath}/public/temp/${transport[0].client}.xlsx`, (err)=>{ });
    
    }

});

}, 15000);






});


app.post('/export/excel', async (req,res)=>{  
    // console.log(req.body);
    if(req.body[0].type === 'print'){
        await exportExcel(req.body, (err, filename)=>{
           
         console.log(filename);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({filename : filename}));

        try{
        setTimeout(function(){ fs.unlink(`${__dirname}/../public/temp/${filename}`), (err)=>{
            if(err) throw err;
            console.log(`${filename} was deleted`);
        } }, 9000);
        } catch (error){
            console.log('Error caught print normal');
        }
        });
        } else if(req.body[0].type === 'aviz'){
        await exportExcelAviz(req.body, (err, filename)=>{

            console.log(filename);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({filename : filename}));

            try{
            setTimeout(function(){ fs.unlink(`${__dirname}/../public/temp/${filename}`), (err)=>{
                if(err) throw err;
                console.log(`${filename} was deleted`);
            } }, 9000);

             } catch (error){
            console.log('Error caught aviz normal');
        }
        });
        } else { 
        await exportExcelTransport(req.body,(err, filename)=>{

            console.log(filename);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({filename : filename}));

            try{
            setTimeout(function(){ fs.unlink(`${__dirname}/../public/temp/${filename}`), (err)=>{
                if(err) throw err;
                console.log(`${filename} was deleted`);
            } }, 15000);
             } catch (error){
            console.log('Error caught transp. normal');
        }
        });
        }

        

 });
















 let exportExcel = async (data, callback) => {

    const pathToDesktop = `${__dirname}/../public/temp`;
    let template = `${__dirname}/../order_template.xlsx`;
    let filename = `${data[0].client}.xlsx`;
    
    let workbook = new Excel.Workbook();

    workbook.xlsx.readFile(template).then(()=>{

        var worksheet = workbook.getWorksheet('sheet1');
        let count = 1;
        let font = {size: 9 };

            worksheet.getCell('D7').value    = data[0].client;
            worksheet.getCell('D8').value    = data[0].oras;
            worksheet.getCell('D9').value    = data[0].judet;
            worksheet.getCell('D10').value   = data[0].strada;
            worksheet.getCell('D11').value   = data[0].data;
            worksheet.getCell('D12').value   = data[0].observatii;
            worksheet.getCell('D13').value   = '';
            worksheet.getCell('D14').value   = '';
            worksheet.getCell('D15').value   = '';
            worksheet.getCell('D16').value   = data[0].sofer;
            worksheet.getCell('D18').value   = data[0].docplata; 
            worksheet.getCell('D19').value   = data[0].zile;
            worksheet.getCell('D20').value   = data[0].livrare;
            worksheet.getCell('D21').value   = data[0].agent;
            worksheet.getCell('H18').value   = data[0].subtotal;
            worksheet.getCell('H19').value   = data[0].tva;
            worksheet.getCell('H20').value   = data[0].total;

            for(let rowNumber = 30; rowNumber < 29+data.length; rowNumber++){

                let nrCrt     = worksheet.getCell(`B${rowNumber}`);
                let denumire  = worksheet.getCell(`C${rowNumber}`);
                let lungime   = worksheet.getCell(`D${rowNumber}`);
                let latime    = worksheet.getCell(`E${rowNumber}`);
                let bucati    = worksheet.getCell(`F${rowNumber}`);
                let price     = worksheet.getCell(`G${rowNumber}`);
                let pricemp   = worksheet.getCell(`H${rowNumber}`);
                let mp        = worksheet.getCell(`I${rowNumber}`);
                let total     = worksheet.getCell(`J${rowNumber}`);


                nrCrt.border      = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                denumire.border   = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                lungime.border    = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                latime.border     = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                bucati.border     = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                price.border      = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                pricemp.border    =
                mp.border         = 
                total.border      = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};


                nrCrt   .font = font;
                denumire.font = font;
                lungime .font = font;
                latime  .font = font;
                bucati  .font = font;
                price   .font = font;
                pricemp .font = font;
                mp      .font = font;
                total   .font = font;

                nrCrt.value    = rowNumber-29;
                denumire.value = data[rowNumber - 29].name.trim();
                lungime.value  = data[rowNumber - 29].length;
                latime.value   = data[rowNumber - 29].width;
                bucati.value   = data[rowNumber - 29].units;
                price.value    = data[rowNumber - 29].price;
                pricemp.value  = ((data[rowNumber - 29].total) / ((data[rowNumber - 29].width) / 1000 * data[rowNumber - 29].length/1000 * data[rowNumber - 29].units) / 1.19).toFixed(4);
                mp.value       = (data[rowNumber - 29].width) / 1000 * data[rowNumber - 29].length/1000 * data[rowNumber - 29].units;
                total.value    = data[rowNumber - 29].total;
                    

                count++;
            }
    workbook.xlsx.writeFile(`${pathToDesktop}/${filename}`);
}).then(() => {

   console.log('Export was successfull');
   callback(null, filename);
 


}).catch(err => console.error(err));

    





}









let exportExcelAviz = async (data, callback) => {

    const pathToDesktop = `${__dirname}/../public/temp`;
    let template = `${__dirname}/../order_template_aviz.xlsx`;
    let filename = `${data[0].client}.xlsx`;
    
    let workbook = new Excel.Workbook();

    workbook.xlsx.readFile(template).then(()=>{

        var worksheet = workbook.getWorksheet('sheet1');
        let count = 1;
        let font = {size: 9 };

            worksheet.getCell('D7').value    = data[0].client;
            worksheet.getCell('D8').value    = data[0].oras;
            worksheet.getCell('D9').value    = data[0].judet;
            worksheet.getCell('D10').value   = data[0].strada;
            worksheet.getCell('D11').value   = data[0].data;
            worksheet.getCell('D12').value   = data[0].observatii;
            worksheet.getCell('D13').value   = '';
            worksheet.getCell('D14').value   = '';
            worksheet.getCell('D15').value   = '';
            worksheet.getCell('D16').value   = data[0].sofer;
            worksheet.getCell('D18').value    = data[0].docplata; 
            worksheet.getCell('D19').value    = data[0].zile;
            worksheet.getCell('D20').value    = data[0].livrare;
            worksheet.getCell('D21').value   = data[0].agent;
            worksheet.getCell('H18').value   = data[0].subtotal;
            worksheet.getCell('H19').value   = data[0].tva;
            worksheet.getCell('H20').value   = data[0].total;


            for(let rowNumber = 30; rowNumber < 29+data.length; rowNumber++){

                let nrCrt     = worksheet.getCell(`B${rowNumber}`);
                let denumire  = worksheet.getCell(`C${rowNumber}`);
                let lungime   = worksheet.getCell(`D${rowNumber}`);
                let latime    = worksheet.getCell(`E${rowNumber}`);
                let bucati    = worksheet.getCell(`F${rowNumber}`);
               


                nrCrt.border      = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                denumire.border   = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                lungime.border    = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                latime.border     = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                bucati.border     = {top:{style:'thin'},right:{style:'thin'},bottom:{style:'thin'},left:{style:'thin'}};
                


                nrCrt   .font = font;
                denumire.font = font;
                lungime .font = font;
                latime  .font = font;
                bucati  .font = font;
                
              

                nrCrt.value    = rowNumber-29;
                denumire.value = data[rowNumber - 29].name;
                lungime.value  = data[rowNumber - 29].length;
                latime.value   = data[rowNumber - 29].width;
                bucati.value   = data[rowNumber - 29].units;
             
                    

                count++;
            }
    workbook.xlsx.writeFile(`${pathToDesktop}/${filename}`);
}).then(() => {

   console.log('Export was successfull');
   callback(null, filename);
 


}).catch(err => console.error(err));

    





}








let exportExcelTransport = async (data, callback) => {

    const pathToDesktop = `${__dirname}/../public/temp`;
    let template = `${__dirname}/../order_template_transport.xlsx`;
    let filename = `${data[0].client}.xlsx`;
    
    let workbook = new Excel.Workbook();

    workbook.xlsx.readFile(template).then(()=>{

        var worksheet = workbook.getWorksheet('sheet1');
        let count = 1;
        let font = {size: 9 };

            worksheet.getCell('C3').value    = data[0].client;
            worksheet.getCell('D7').value    = data[0].oras;
            worksheet.getCell('D8').value    = data[0].judet;
            worksheet.getCell('D9').value   = data[0].strada;
            worksheet.getCell('D12').value   = data[0].data;
            worksheet.getCell('C19').value   = data[0].observatii;
            
            worksheet.getCell('F31').value   = data[0].sofer;
            worksheet.getCell('D25').value    = data[0].docplata; 
            worksheet.getCell('H25').value    = data[0].zile;
            worksheet.getCell('D28').value    = data[0].livrare;
            worksheet.getCell('C22').value   = data[0].agent;


          
    workbook.xlsx.writeFile(`${pathToDesktop}/${filename}`);
}).then(() => {

   console.log('Export was successfull');
   callback(null, filename);
 


}).catch(err => console.error(err));

    





}





}