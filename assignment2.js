
function getDataFromAPI() {

    var geography = $("#geography").val();
    var year = $("#year").val();

    if (geography == "" || geography.length > 100) {
        alert("You need to enter a town name.:");
    } else if (year == "" || year.length != 4 || isNaN(year)) {
        alert("You need to enter a valid year.");
    } else {
        $("#results_container").html("");
        $("#pleasewait").show();
        $("#geography").val("");
        $("#year").val("");
        $("#geography").focus();
    
        var url = "https://data.novascotia.ca/resource/m862-kmjy.json?$where=geography%20like%20%27%25" + geography + "%25%27%20and%20year%20=%20%27" + year + "%27";
        $.get(url, function(data, status){
            console.log(data, status);
            var count = 0;
    
            var result = "<h1>Crime for " + geography + " in " + year +"</h1>";
            result += "<ul>";
            for(var i = 0; i < data.length; i++) {
                console.log(data[i].violations,data[i].incidents);
                result += "<li>" + data[i].violations + " " + (data[i].incidents? data[i].incidents : "") + "</li>"
                count +=  parseInt(data[i].incidents? data[i].incidents : 0);
            }
          //  result += "</ul><P>" + count + " incidents.</p>";
           result += "</ul>" + "No of  matches  from your search:  "+count;
            $("#pleasewait").hide();
            $("#results_container").html(result);
        });    
    }

}

window.addEventListener("load", (event) => {

    $("#pleasewait").hide();
    $("#geography").focus();

    const el = document.getElementById("getdata_btn");
    el.addEventListener("click", getDataFromAPI, false);
});










