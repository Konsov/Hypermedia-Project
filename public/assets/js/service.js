//get id from url
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
    //take info from db about service with id id
    $.getJSON('/api/service/'+ id, function (service) { 
        
        var name = service.name;
        var description = service.description;

        elem = '<p class="service-paragraph"><strong>Description of The Service</strong><br>' + description + '</p>';
    
        title = '<strong class="slogan">' + name + '<br></strong>'


        $(".first_text").append(title);
        $(".service-info").append(elem);
    });


    //create photogallery
    $.getJSON('/api/service/'+ id + '/photo', function (photos) { 
        var img = '';
        console.log(photos)
        img +='<div class="col-lg-6" id="divimg" data-toggle="modal" data-target="#exampleModal"><a href="#"><img src="'+ photos[0].url +'" class="service-img img-thumbnail" alt="service-img"></a></div>';
        $(".service-info").prepend(img);

       
        var carouselGallery =  '<div class="carousel-inner">';
        for(let i=0; i<photos.length;i++){
        console.log( photos[i].url )

            if(i == 0){
                carouselGallery +='<div class="carousel-item active">';
            }else{
                carouselGallery += '<div class="carousel-item">';
            }
            carouselGallery +='<img class="d-block w-100" src="'+ photos[i].url +'">';
            carouselGallery +='</div>';
           
        }
        carouselGallery +='</div>';
        $("#carouselPhotogallery").append(carouselGallery);


    });
   
    
    $.getJSON('/api/service/'+ id + '/person', function (person) { 

        console.log(person)
        personInfo= '';
        
        for (let i = 0; i < person.length; i++) {
            
            var name = person[i].name;
            var image = person[i].image;
            var id = person[i].id;

            personInfo += '<div class="col-lg-2" id="person-info">';
            personInfo += '<img src="' + image + '" alt="personeImage" class= "img-thumbnail" id="imgperson">';
            personInfo += '<a href="singlePerson.html?id=' + id + '">'+ name + '</a>';
            personInfo += '</div>';
          
            
            $("#person-involved").append(personInfo);
            personInfo = '';
        }
    });

    //create carousel with projects with this service
    $.getJSON('/api/service/'+ id + '/project', function (projects) { 

        console.log(projects);
        elem = '';

        for (let i = 0; i < projects.length; i++) {
            $.getJSON('/api/project/'+ projects[i].id + '/photo', function (photos) { 

                if(i == 0){
                    elem +='<p class="project-title">RELATED PROJECTS</p>'
                    elem +='<div class="projects">'
                    elem +='<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" >'
                    elem +='<ol class="carousel-indicators">'
                    elem +='<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>'
                    elem +='<li data-target="#carouselExampleCaptions" data-slide-to="1"></li>'
                    elem += '<li data-target="#carouselExampleCaptions" data-slide-to="2"></li>'
                    elem +='</ol>'
                    elem += '<div id="carousel-projects" class="carousel-inner">'
                    elem +='<div class="carousel-item active">';
                    elem+='<img src=" ' + photos[0].url + '" id="h400" class="d-block w-100" alt="...">';
                    elem+='<div class="overlay">'
                    elem+='<div id="cento">';
                    elem+='<div class="centro">';
                    elem+='<p id="texticon1">' + projects[i].name  +  '</p>';
                    elem += '<p id="textcaro">'
                    elem += ''+ projects[i].description +'</p>'
                    elem +='<a href="project.html?id='+projects[i].id+'" type="button" class="btn btn-light">Read More</a>';
                    elem +='</div>';
                    elem +='</div>';
                    elem +='</div>';
                    elem +='</div>';        
                    elem +='<a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">';
                    elem +='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
                    elem +='<span class="sr-only">Previous</span>';
                    elem +='</a>';
                    elem +='<a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">';
                    elem +='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
                    elem +='<span class="sr-only">Next</span>';
                    elem +='</a>';
                    elem +='</div>';
                    elem +='</div>';

                    $(".container-projects").append(elem);
                }else{
                    elem = '';
                    elem+='<div class="carousel-item">';
                    elem+='<img src=" ' + photos[0].url + '" id="h400" class="d-block w-100" alt="...">';
                    elem+='<div class="overlay">'
                    elem+='<div id="cento">';
                    elem+='<div class="centro">';
                    elem+='<p id="texticon1">' + projects[i].name  +  '</p>';
                    elem += '<p id="textcaro">'
                    elem += ''+ projects[i].description +'</p>'
                    elem +='<a href="project.html?id='+projects[i].id+'" type="button" class="btn btn-light">Read More</a>';
                    elem +='</div>';
                    elem += '</div>';
                    elem += '</div>';
                    elem +='</div>';
                        
                    $("#carousel-projects").append(elem);
                }
            });
        }
    });

    //create a carousle with evemts related to this service

    $.getJSON('/api/service/'+ id + '/event', function (events) { 

        console.log(events);
        elem = '';

        for (let i = 0; i < events.length; i++) {

                if(i == 0){
                    elem +='<p class="project-title">RELATED EVENTS</p>'
                    elem +='<div class="events">'
                    elem +='<div id="carouselExampleCaptions2" class="carousel slide" data-ride="carousel">'
                    elem +='<ol class="carousel-indicators">'
                    elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="0" class="active"></li>'
                    elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="1"></li>'
                    elem += '<li data-target="#carouselExampleCaptions2" data-slide-to="2"></li>'
                    elem +='</ol>'
                    elem += '<div id="carousel-events" class="carousel-inner">'

                    elem +='<div class="carousel-item active">';
                    elem+='<img src=" ' + events[i].image + '" id="h400" class="d-block w-100" alt="...">';
                    elem+='<div class="overlay">'
                    elem+='<div id="cento">';
                    elem+='<div class="centro">';
                    elem+='<p id="texticon1">' + events[i].name  +  '</p>';
                    elem += '<p id="textcaro">'
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
                    elem+='<img src=" ' + events[i].image + '" id="h400" class="d-block w-100" alt="...">';
                    elem+='<div class="overlay">'
                    elem+='<div id="cento">';
                    elem+='<div class="centro">';
                    elem+='<p id="texticon1">' + events[i].name  +  '</p>';
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



