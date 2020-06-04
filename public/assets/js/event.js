//take id from url
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return undefined;
};
var id = getUrlParameter('id');


$(window).on("load",function () {

    //take info of event with id: id
    $.getJSON('/api/event/'+ id, function (project) { 


        var name = project[0].name;
        var description = project[0].text_presentation;

        elem = '<p class="service-paragraph">';
        elem +='<div class="col-lg-6" id="divimg" data-toggle="modal" data-target="#exampleModal"><img src="'+project[0].image+'" class="service-img img-thumbnail"" alt="service-img" width="400vw"></div>';
        elem +='<strong>Name</strong>';
        elem +='<br>' + name + '<br>';
        elem +='<strong>When?</strong>';

        var timeStr = project[0].ending_date;
        var date = new Date(timeStr);
        var day = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dateStr1 = day+"/"+month+"/"+year;
        var timeStr = project[0].starting_date;
        var date = new Date(timeStr);
        var day = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var dateStr2 = day+"/"+month+"/"+year;
        
        if(project[0].starting_date == project[0].ending_date){
            elem +='<br>' + dateStr2 + '<br>';
        }else{
            elem +='<br> From ' + dateStr2 + ' to ' + dateStr1 + '<br>';
        }
        
        elem +='<strong>Descritpion of The Service</strong>';
        elem +='<br>' + description + '</p>';
    
        title = '<strong class="slogan">' + name + '<br></strong>'


        $(".first_text").append(title);
        $(".service-info").append(elem);

        elem = '';        

    });

    //take info about person involved in a event
    $.getJSON('/api/event/'+ id + '/person', function (person) { 

        personInfo= '';
        
        for (let i = 0; i < person.length; i++) {
            
            var name = person[i].name;
            var image = person[i].image;
            var id = person[i].id;

            personInfo += '<div class="col-lg-2" id="person-info">';
            personInfo += '<img class= "img-thumbnail" src="' + image + '" alt="personeImage" id="imgperson">';
            personInfo += '<a href="singlePerson.html?id=' + id + '">'+ name + '</a>';
            personInfo += '</div>';
          
          
        }
          
        $("#person-involved").append(personInfo);
    });

    //take info about service related to an event
    $.getJSON('/api/event/'+ id + '/service', function (service) { 

        serviceInfo= '';
        firstProject = true;
        firstEvent=true;
        for (let i = 0; i < service.length; i++) {
            
            var name = service[i].name;
            var id = service[i].id;

            serviceInfo += '<div class="col-lg-2" id="person-info">';
            serviceInfo += '<img src="../assets/img/servizio'+ id+'b.jpg" class="img-thumbnail" alt="serviceImg" id="imgperson">';
            serviceInfo += '<a href="service.html?id=' + id + '">'+ name + '</a>';
            serviceInfo += '</div>';
          
            
            $("#service-related").append(serviceInfo);
            serviceInfo = '';
        }
    });

    //buttons to go at previous and next event
    $.getJSON('/api/event/'+ id+'/prev', function (prev) { 

        elem = '';
        if (prev.length == 0){
            elem += '<a href="#" class="previous evnt-btn inactiveLink">&laquo; Previous</a>'
        } else {
            elem += '<a href="/pages/event.html?id='+prev[0].id+'" class="previous evnt-btn">&laquo; Previous</a>'
        }
        $('#buttons').append(elem)

        
        $.getJSON('/api/event/'+ id+'/next', function (next) { 

            elem = '';
            if (next.length == 0){
                elem +='<a href="#" class="next evnt-btn inactiveLink">Next &raquo;</a>'
                
            } else {
                elem +='<a href="/pages/event.html?id='+next[0].id+'" class="next evnt-btn">Next &raquo;</a>'
            }   
            $('#buttons').append(elem) 
        
        });
    });
});


