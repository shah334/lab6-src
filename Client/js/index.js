var data=[];
var num=0;
function reload()
{
    var app = new Vue({
        el: '#app',
        data: {
            amt: ' ',
        },
        watch: {
            amt: function () {
                adddata(this.amt);
            }
        }
    })
    displaynutrition();
    displayingredients();
}
function open1(val)
{
    window.open(data[val].url, "_blank");
}
function insertfav(val)
{
    var fav=JSON.parse(localStorage.getItem("FAV"));
    if(fav==null)
        fav=[];

    for(var i=0;i<fav.length;i++)
    {
        if(fav[i].url===data[val].url)
            return;
    }
    fav[fav.length]= new Object();
    fav[fav.length-1].label=data[val].label;
    fav[fav.length-1].url=data[val].url;
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("FAV");
        localStorage.setItem("FAV", JSON.stringify(fav));
    } else {
        alert("Unable to store data!");
    }
}
function onlyfav()
{
    data=JSON.parse(localStorage.getItem("FAV"));
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("DATA");
        localStorage.setItem("DATA", JSON.stringify(data));
    } else {
        alert("Unable to store data!");
    }
    displayEntries();
}
function adddata(val)
{

    var url = "http://lab6recipe.herokuapp.com/edamam/search?q="+val+"&from=0&to=100";
    fetch(url,{
        method: 'GET',
    })
        .then((resp) => resp.json())
     .then(function(responseData) {
    data =[];
    for(var i=0;i<responseData.hits.length;i++)
    {
        data[data.length]= new Object();
        data[data.length-1].label=responseData.hits[i].recipe.label;
        data[data.length-1].url=responseData.hits[i].recipe.url;
        data[data.length-1].ingredients=responseData.hits[i].recipe.ingredients;
        data[data.length-1].nutrition=responseData.hits[i].recipe.totalNutrients;
    }
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("DATA");
        localStorage.setItem("DATA", JSON.stringify(data));
    } else {
        alert("Unable to store data!");
    }
    displayEntries();
});
}
function displayEntries()
{

    data=JSON.parse(localStorage.getItem("DATA"));
    if(data!=null){
        var table = document.getElementById("tablefill");
        while(table.rows.length > 1) {
            table.deleteRow(1);
        }
        for(var i=0;i<data.length;i++)
        {
            var table = document.getElementById("tablefill");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = data[i].label;
            cell2.innerHTML = "Add to Fav";
            cell3.innerHTML = "Add to Nutrition";
            cell4.innerHTML = "Add Ingredients";
            cell1.setAttribute("onclick", "open1("+i+")");
            cell2.setAttribute("onclick", "insertfav("+i+")");
            cell3.setAttribute("onclick", "insertnutrition("+i+")");
            cell4.setAttribute("onclick", "insertingredient("+i+")");
        }
    }
    else
    {
        data=[];
        num=0;
    }
}
function insertnutrition(val)
{
    var nutrition=JSON.parse(localStorage.getItem("NUTRITION"));
    if(nutrition==null) {
        nutrition = [];
        for (var i = 0; i < 30; i++) {
            nutrition[i] = new Object();
            nutrition[i].value = 0;
        }
        nutrition[0].label = "Calcium";
        nutrition[1].label = "Carbs";
        nutrition[2].label = "Cholesterol";
        nutrition[3].label = "Energy";
        nutrition[4].label = "Monounsaturated";
        nutrition[5].label = "Polyunsaturated";
        nutrition[6].label = "Saturated";
        nutrition[7].label = "Fat";
        nutrition[8].label = "Trans";
        nutrition[9].label = "Iron";
        nutrition[10].label = "Fiber";
        nutrition[11].label = "Folate equivalent (total)";
        nutrition[12].label = "Folate (food)";
        nutrition[13].label = "Potassium";
        nutrition[14].label = "Magnesium";
        nutrition[15].label = "Sodium";
        nutrition[16].label = "Niacin (B3)";
        nutrition[17].label = "Phosphorus";
        nutrition[18].label = "Protein";
        nutrition[19].label = "Riboflavin (B2)";
        nutrition[20].label = "Sugars";
        nutrition[21].label = "Thiamin (B1)";
        nutrition[22].label = "Vitamin E";
        nutrition[23].label = "Vitamin A";
        nutrition[24].label = "Vitamin B6";
        nutrition[25].label = "Vitamin B12";
        nutrition[26].label = "Vitamin D";
        nutrition[27].label = "Vitamin K";
        nutrition[28].label = "Zinc";
        nutrition[29].label = "Vitamin c";
    }
    if(data[val].nutrition.CA!=null){
        if(data[val].nutrition.CA.unit==="g")
            nutrition[0].value+=parseFloat(data[val].nutrition.CA.quantity)*1000;
        else
            nutrition[0].value+=parseFloat(data[val].nutrition.CA.quantity);
    }
    if(data[val].nutrition.CHOCDF!=null){
        if(data[val].nutrition.CHOCDF.unit==="g")
            nutrition[1].value+=parseFloat(data[val].nutrition.CHOCDF.quantity)*1000;
        else
            nutrition[1].value+=parseFloat(data[val].nutrition.CHOCDF.quantity);
    }
    if(data[val].nutrition.CHOLE!=null){
        if(data[val].nutrition.CHOLE.unit==="g")
            nutrition[2].value+=parseFloat(data[val].nutrition.CHOLE.quantity)*1000;
        else
            nutrition[2].value+=parseFloat(data[val].nutrition.CHOLE.quantity);
    }
    if(data[val].nutrition.ENERC_KCAL!=null){
        if(data[val].nutrition.ENERC_KCAL.unit==="g")
            nutrition[3].value+=parseFloat(data[val].nutrition.ENERC_KCAL.quantity)*1000;
        else
            nutrition[3].value+=parseFloat(data[val].nutrition.ENERC_KCAL.quantity);
    }
    if(data[val].nutrition.FAMS!=null){
        if(data[val].nutrition.FAMS.unit==="g")
            nutrition[4].value+=parseFloat(data[val].nutrition.FAMS.quantity)*1000;
        else
            nutrition[4].value+=parseFloat(data[val].nutrition.FAMS.quantity);
    }
    if(data[val].nutrition.FAPU!=null){
        if(data[val].nutrition.FAPU.unit==="g")
            nutrition[5].value+=parseFloat(data[val].nutrition.FAPU.quantity)*1000;
        else
            nutrition[5].value+=parseFloat(data[val].nutrition.FAPU.quantity);
    }
    if(data[val].nutrition.FASAT!=null){
        if(data[val].nutrition.FASAT.unit==="g")
            nutrition[6].value+=parseFloat(data[val].nutrition.FASAT.quantity)*1000;
        else
            nutrition[6].value+=parseFloat(data[val].nutrition.FASAT.quantity);
    }
    if(data[val].nutrition.FAT!=null){
        if(data[val].nutrition.FAT.unit==="g")
            nutrition[7].value+=parseFloat(data[val].nutrition.FAT.quantity)*1000;
        else
            nutrition[7].value+=parseFloat(data[val].nutrition.FAT.quantity);
    }
    if(data[val].nutrition.FATRN!=null){
        if(data[val].nutrition.FATRN.unit==="g")
            nutrition[8].value+=parseFloat(data[val].nutrition.FATRN.quantity)*1000;
        else
            nutrition[8].value+=parseFloat(data[val].nutrition.FATRN.quantity);
    }
    if(data[val].nutrition.FE!=null){
        if(data[val].nutrition.FE.unit==="g")
            nutrition[9].value+=parseFloat(data[val].nutrition.FE.quantity)*1000;
        else
            nutrition[9].value+=parseFloat(data[val].nutrition.FE.quantity);
    }
    if(data[val].nutrition.FIBTG!=null){
        if(data[val].nutrition.FIBTG.unit==="g")
            nutrition[10].value+=parseFloat(data[val].nutrition.FIBTG.quantity)*1000;
        else
            nutrition[10].value+=parseFloat(data[val].nutrition.FIBTG.quantity);
    }
    if(data[val].nutrition.FOLDFE!=null){
        if(data[val].nutrition.FOLDFE.unit==="g")
            nutrition[11].value+=parseFloat(data[val].nutrition.FOLDFE.quantity)*1000;
        else
            nutrition[11].value+=parseFloat(data[val].nutrition.FOLDFE.quantity);
    }
    if(data[val].nutrition.FOLFD!=null){
        if(data[val].nutrition.FOLFD.unit==="g")
            nutrition[12].value+=parseFloat(data[val].nutrition.FOLFD.quantity)*1000;
        else
            nutrition[12].value+=parseFloat(data[val].nutrition.FOLFD.quantity);
    }
    if(data[val].nutrition.K!=null){
        if(data[val].nutrition.K.unit==="g")
            nutrition[13].value+=parseFloat(data[val].nutrition.K.quantity)*1000;
        else
            nutrition[13].value+=parseFloat(data[val].nutrition.K.quantity);
    }
    if(data[val].nutrition.MG!=null){
        if(data[val].nutrition.MG.unit==="g")
            nutrition[14].value+=parseFloat(data[val].nutrition.MG.quantity)*1000;
        else
            nutrition[14].value+=parseFloat(data[val].nutrition.MG.quantity);
    }
    if(data[val].nutrition.NA!=null){
        if(data[val].nutrition.NA.unit==="g")
            nutrition[15].value+=parseFloat(data[val].nutrition.NA.quantity)*1000;
        else
            nutrition[15].value+=parseFloat(data[val].nutrition.NA.quantity);
    }
    if(data[val].nutrition.NIA!=null){
        if(data[val].nutrition.NIA.unit==="g")
            nutrition[16].value+=parseFloat(data[val].nutrition.NIA.quantity)*1000;
        else
            nutrition[16].value+=parseFloat(data[val].nutrition.NIA.quantity);
    }
    if(data[val].nutrition.P!=null){
        if(data[val].nutrition.P.unit==="g")
            nutrition[17].value+=parseFloat(data[val].nutrition.P.quantity)*1000;
        else
            nutrition[17].value+=parseFloat(data[val].nutrition.P.quantity);
    }
    if(data[val].nutrition.PROCNT!=null){
        if(data[val].nutrition.PROCNT.unit==="g")
            nutrition[18].value+=parseFloat(data[val].nutrition.PROCNT.quantity)*1000;
        else
            nutrition[18].value+=parseFloat(data[val].nutrition.PROCNT.quantity);
    }
    if(data[val].nutrition.RIBF!=null){
        if(data[val].nutrition.RIBF.unit==="g")
            nutrition[19].value+=parseFloat(data[val].nutrition.RIBF.quantity)*1000;
        else
            nutrition[19].value+=parseFloat(data[val].nutrition.RIBF.quantity);
    }
    if(data[val].nutrition.SUGAR!=null){
        if(data[val].nutrition.SUGAR.unit==="g")
            nutrition[20].value+=parseFloat(data[val].nutrition.SUGAR.quantity)*1000;
        else
            nutrition2[0].value+=parseFloat(data[val].nutrition.SUGAR.quantity);
    }
    if(data[val].nutrition.THIA!=null){
        if(data[val].nutrition.THIA.unit==="g")
            nutrition[21].value+=parseFloat(data[val].nutrition.THIA.quantity)*1000;
        else
            nutrition[21].value+=parseFloat(data[val].nutrition.THIA.quantity);
    }
    if(data[val].nutrition.TOCPHA!=null){
        if(data[val].nutrition.TOCPHA.unit==="g")
            nutrition[22].value+=parseFloat(data[val].nutrition.TOCPHA.quantity)*1000;
        else
            nutrition[22].value+=parseFloat(data[val].nutrition.TOCPHA.quantity);
    }
    if(data[val].nutrition.VITA_RAE!=null){
        if(data[val].nutrition.VITA_RAE.unit==="g")
            nutrition[23].value+=parseFloat(data[val].nutrition.VITA_RAE.quantity)*1000;
        else
            nutrition[23].value+=parseFloat(data[val].nutrition.VITA_RAE.quantity);
    }
    if(data[val].nutrition.VITB6A!=null){
        if(data[val].nutrition.VITB6A.unit==="g")
            nutrition[24].value+=parseFloat(data[val].nutrition.VITB6A.quantity)*1000;
        else
            nutrition[24].value+=parseFloat(data[val].nutrition.VITB6A.quantity);
    }
    if(data[val].nutrition.VITB12!=null){
        if(data[val].nutrition.VITB12.unit==="g")
            nutrition[25].value+=parseFloat(data[val].nutrition.VITB12.quantity)*1000;
        else
            nutrition[25].value+=parseFloat(data[val].nutrition.VITB12.quantity);
    }
    if(data[val].nutrition.VITD!=null){
        if(data[val].nutrition.VITD.unit==="g")
            nutrition[26].value+=parseFloat(data[val].nutrition.VITD.quantity)*1000;
        else
            nutrition[26].value+=parseFloat(data[val].nutrition.VITD.quantity);
    }
    if(data[val].nutrition.VITK1!=null){
        if(data[val].nutrition.VITK1.unit==="g")
            nutrition[27].value+=parseFloat(data[val].nutrition.VITK1.quantity)*1000;
        else
            nutrition[27].value+=parseFloat(data[val].nutrition.VITK1.quantity);
    }
    if(data[val].nutrition.ZN!=null){
        if(data[val].nutrition.ZN.unit==="g")
            nutrition[28].value+=parseFloat(data[val].nutrition.ZN.quantity)*1000;
        else
            nutrition[28].value+=parseFloat(data[val].nutrition.ZN.quantity);
    }
    if(data[val].nutrition.VITC!=null){
        if(data[val].nutrition.VITC.unit==="g")
            nutrition[29].value+=parseFloat(data[val].nutrition.VITC.quantity)*1000;
        else
            nutrition[29].value+=parseFloat(data[val].nutrition.VITC.quantity);
    }
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("NUTRITION");
        localStorage.setItem("NUTRITION", JSON.stringify(nutrition));
    } else {
        alert("Unable to store data!");
    }
    displaynutrition();
}
function displaynutrition()
{
    var data1=JSON.parse(localStorage.getItem("NUTRITION"));
    if(data1!=null){
        var table = document.getElementById("tablefill1");
        while(table.rows.length >=1) {
            table.deleteRow(0);
        }
        for(var i=0;i<data1.length;i++)
        {
            var table = document.getElementById("tablefill1");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = data1[i].label;
            cell2.innerHTML =Math.round(data1[i].value * 100) / 100;
        }
    }
    else
    {
        data1=[];
        num=0;
    }

}

function insertingredient(val)
{
    var ingre=JSON.parse(localStorage.getItem("INGRE"));
    if(ingre==null)
        ingre=[];
    for(var j=0;j<data[val].ingredients.length;j++) {
        ingre[ingre.length] = new Object();
        ingre[ingre.length - 1].label = data[val].ingredients[j].text;
    }
    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("INGRE");
        localStorage.setItem("INGRE", JSON.stringify(ingre));
    } else {
        alert("Unable to store data!");
    }
    displayingredients();
}
function displayingredients()
{
    var data1=JSON.parse(localStorage.getItem("INGRE"));
    if(data1!=null){
        var table = document.getElementById("tablefill2");
        while(table.rows.length >=1) {
            table.deleteRow(0);
        }
        for(var i=0;i<data1.length;i++)
        {
            var table = document.getElementById("tablefill2");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = data1[i].label;
        }
    }
    else
    {
        data1=[];
        num=0;
    }

}
