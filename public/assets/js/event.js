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
    $.getJSON('/api/event/'+ id, function (project) { 

        console.log(project);

        var name = project[0].name;
        var description = project[0].text_presentation;

        elem = '<p class="service-paragraph">';
        elem +='<div class="col-lg-6" id="divimg" data-toggle="modal" data-target="#exampleModal"><img src="'+project[0].image+'" class="service-img" alt="service-img" width="400vw"></div>';
        elem +='<strong>Name</strong>';
        elem +='<br>' + name + '<br>';
        elem +='<strong>When?</strong>';
        
        if(project[0].starting_date == project[0].ending_date){
            elem +='<br>' + project[0].starting_date + '<br>';
        }else{
            elem +='<br> From ' + project[0].starting_date + ' to' + project[0].ending_date + '<br>';
        }
        
        elem +='<strong>Descritpion of The Service</strong>';
        elem +='<br>' + description + '</p>';
    
        title = '<strong class="slogan">' + name + '<br></strong>'


        $(".first_text").append(title);
        $(".service-info").append(elem);
    });
    
    $.getJSON('/api/event/'+ id + '/person', function (person) { 

        console.log(person)
        personInfo= '';
        
        for (let i = 0; i < person.length; i++) {
            
            var name = person[i].name;
            var image = person[i].image;
            var id = person[i].id;

            personInfo += '<div class="col-lg-2" id="person-info">';
            personInfo += '<img src="' + image + '" alt="personeImage" id="imgperson">';
            personInfo += '<a href="singlePerson.html?id=' + id + '">'+ name + '</a>';
            personInfo += '</div>';
          
          
        }
          
        $("#person-involved").append(personInfo);
    });

    $.getJSON('/api/event/'+ id + '/service', function (service) { 

        console.log(service)
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

});



