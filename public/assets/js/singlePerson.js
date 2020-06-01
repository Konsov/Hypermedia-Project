//"use strict";

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

    $.getJSON('/api/person/'+id, function (person) { 
        
        // GET BOOK BY ID /api/book/{bookId}
        
        var id = person.id;
        
        var name = person.name;
        var age = person.age;
        var role = person.role;
        var image = person.image;
        var email = person.email;
        var profession = person.profession;
        var short_description = person.short_description;
        console.log(person['name'])
        var k= '<p id="p1">'+name+'</p>'
        $(".header").append(k);
        $("#person_age").html(age);
        $("#person_role").html(role);
        $("#person_email").html(email);
        $("#person_profession").html(profession);
        $("#person_description").html(short_description);
        var img = '<div class="item"><img src="' + image + '" id="person_img" alt=""></div>';
        $("#product-carousel").append(img);
    });
    $.getJSON('/api/person/'+ id + '/event', function (events) { 

        elem = '';

        for (let i = 0; i < events.length; i++) {

                if(i == 0){
                    elem +='<p class="project-title">RELATED EVENTS</p>'
                    elem +='<div class="events">'
                    elem +='<div id="carouselExampleCaptions2" class="carousel slide" data-ride="carousel" style="height: 400px;">'
                    elem +='<ol class="carousel-indicators">'
                    elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="0" class="active"></li>'
                    elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="1"></li>'
                    elem += '<li data-target="#carouselExampleCaptions2" data-slide-to="2"></li>'
                    elem +='</ol>'
                    elem += '<div id="carousel-events" class="carousel-inner">'

                    elem +='<div class="carousel-item active">';
                    elem +='<img src=" ' + events[i].image + '" style="height: 400px" class="d-block w-100" alt="...">'
                    elem +='<div class="overlay">';
                    elem +='<div style="width: 100%;height: 100%;position: relative;">';
                    elem +='<div class="centro">';
                    elem +='<p style="color: white; font-size: large; font-weight:bold">' + events[i].name +'</p>';
                    elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 3;-webkit-box-orient: vertical; color: white;">'
                    elem += ''+ events[i].text_presentation +'</p>'
                    elem +='<a href="event.html?id='+ events[i].id+'" type="button" class="btn btn-light">Read More</a>';
                    elem +='</div>';
                    elem +='</div>';
                    elem +='</div>';
                    elem +='</div>';        
                    elem +='<a class="carousel-control-prev" href="#carouselExampleCaptions2" role="button" data-slide="prev">';
                    elem +='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
                    elem +='<span class="sr-only">Previous</span>';
                    elem +='</a>';
                    elem +='<a class="carousel-control-next" href="#carouselExampleCaptions2" role="button" data-slide="next">';
                    elem +='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
                    elem +='<span class="sr-only">Next</span>';
                    elem +='</a>';
                    elem +='</div>';
                    elem +='</div>';

                    $(".container-events").append(elem);
                }else{
                    elem = '';
                    elem+='<div class="carousel-item">';
                    elem+='<img src=" ' + events[i].image + '" style="height: 400px" class="d-block w-100" alt="...">';
                    elem+='<div class="overlay">'
                    elem+='<div style="width: 100%;height: 100%;position: relative;">';
                    elem+='<div class="centro">';
                    elem+='<p style="color: white; font-size: large; font-weight:bold">' +  events[i].name  +  '</p>';
                    elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 3;-webkit-box-orient: vertical; color: white;">'
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



