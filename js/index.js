var data=[];
var num=0;
function reload()
{
    data=JSON.parse(localStorage.getItem("DATA"));
    alert("data"+data);
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
            cell1.innerHTML = data[i].name;
            cell2.innerHTML = "Add to Fav";
            cell1.setAttribute("onclick", "open1("+i+")");
            cell2.setAttribute("onclick", "insertfav("+i+")");
        }
    }
    else
    {
        adddata();
        data=[];
        num=0;
    }
}
function open1(val)
{
    alert("here");
    window.open(data[val].url, "_blank");
}
function insertfav(val)
{
    var fav=JSON.parse(localStorage.getItem("FAV"));
    if(fav==null)
        fav=[];
    fav[fav.length]= new Object();
    fav[fav.length-1].name=data[val].name;
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
    window.location.href = "index.html";
}



function adddata()
{
    var url = "http://cs390-hw5.herokuapp.com/";
    fetch(url+"timelogs",{
        method: 'GET',
    }).then((resp) => resp.json()) // Transform the data into json
     .then(function(responseData) {
       data =[];
       data=responseData;
    });

    alert("here"+data);

    if (typeof(Storage) !== "undefined") {
        localStorage.removeItem("DATA");
        localStorage.setItem("DATA", JSON.stringify(data));
    } else {
        alert("Unable to store data!");
    }
    window.location.href = "index.html";
}
