//get ID from url
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
 
    //get info person from db
    $.getJSON('/api/person/'+id, function (person) { 
       
        var name = person.name;
        var age = person.age;
        var role = person.role;
        var image = person.image;
        var email = person.email;
        var profession = person.profession;
        var short_description = person.short_description;
        console.log(person['name'])
        title = '<strong class="slogan">' + name + '<br></strong>'
        $(".first_text").append(title);
        $("#person_age").html(age);
        $("#person_role").html(role);
        $("#person_email").html(email);
        $("#person_profession").html(profession);
        $("#person_description").html(short_description);
        var img = '<div class="item"><img src="' + image + '" id="person_img" alt=""></div>';
        $("#product-carousel").append(img);
    });
    
    $.getJSON('/api/person/'+ id + '/service', function (service) {

        console.log(service)
        elem = '';
        elem += '<div class="row">'
        for (let i = 0; i < service.length; i++) {
            elem += '<a id="serv_link" href="service.html?id=' + service[i].id + '">'+ service[i].name + '</a>'; 
        }
        elem += '</div>'
        $("#person_service").append(elem);
    });

    $.getJSON('/api/person/'+ id + '/event', function (events) { 

        elem = '';

        for (let i = 0; i < events.length; i++) {

                if(i == 0){
                    elem +='<p class="project-title">RELATED EVENTS</p>'
                    elem +='<div class="events">'
                    elem +='<div id="carouselExampleCaptions2" class="carousel slide" data-ride="carousel" id="h400">'
                    elem +='<ol class="carousel-indicators">'
                    for(let j=0; j < events.length ;j++){
                        if (j==0){
                            elem +='<li data-target="#carouselExampleCaptions" data-slide-to="'+j+'" class="active"></li>'
                        } else {
                            elem +='<li data-target="#carouselExampleCaptions" data-slide-to="'+j+'"></li>'
                        }
                    }
                    elem +='</ol>'
                    elem += '<div id="carousel-events" class="carousel-inner">'

                    elem +='<div class="carousel-item active">';
                    elem +='<img src=" ' + events[i].image + '" id="h450" class="d-block" alt="...">'
                    elem +='<div class="overlay">';
                    elem +='<div id="cento">';
                    elem +='<div class="centro">';
                    elem +='<p id="texticon1">' + events[i].name +'</p>';
                    elem += '<p id="textcaro">'
                    elem += ''+ events[i].text_presentation +'</p>'
                    elem +='<a href="event.html?id='+ events[i].id+'" type="button" class="btn btn-light">Read More</a>';
                    elem +='</div>';
                    elem +='</div>';
                    elem +='</div>';
                    elem +='</div>';
                    if(events.length > 1){      
                        elem +='<a class="carousel-control-prev" href="#carouselExampleCaptions2" role="button" data-slide="prev">';
                        elem +='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
                        elem +='<span class="sr-only">Previous</span>';
                        elem +='</a>';
                        elem +='<a class="carousel-control-next" href="#carouselExampleCaptions2" role="button" data-slide="next">';
                        elem +='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
                        elem +='<span class="sr-only">Next</span>';
                        elem +='</a>';
                    }
                    elem +='</div>';
                    elem +='</div>';

                    $(".container-events").append(elem);
                }else{
                    elem = '';
                    elem+='<div class="carousel-item">';
                    elem+='<img src=" ' + events[i].image + '" id="h450" class="d-block" alt="...">';
                    elem+='<div class="overlay">'
                    elem+='<div id="cento">';
                    elem+='<div class="centro">';
                    elem+='<p id="texticon1">' +  events[i].name  +  '</p>';
                    elem += '<p id="textcaro">'
                    elem += ''+ events[i].text_presentation +'</p>'
                    elem +='<a href="event.html?id='+ events[i].id+'" type="button" class="btn btn-light">Read More</a>';
                    elem +='</div>';
                    elem += '</div>';
                    elem += '</div>';
                    elem +='</div>';
                    $("#carousel-events").append(elem);
                }
        }
    });
});



