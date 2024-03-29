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
    //take from db info about project with id id 
    $.getJSON('/api/project/'+ id, function (project) { 

        console.log(project)
        
        var name = project[0].name;
        var description = project[0].description;

        elem = '<p class="service-paragraph">';
        elem +='<strong>Name</strong>';
        elem +='<br>' + name + '<br>';
        elem +='<strong>Status</strong>';
        elem +='<br>' + project[0].status + '<br>';
        elem +='<strong>When?</strong>';
        
        if(project[0].starting_date == project[0].ending_date){
            var timeStr = project[0].ending_date;
            var date = new Date(timeStr);
            var day = date.getDate();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var dateStr = day+"/"+month+"/"+year;
            elem +='<br>' + dateStr + '<br>';
        }else{
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
            elem +='<br> From ' + dateStr2 + ' to ' + dateStr1 + '<br>';
        }
        
        elem +='<strong>Descritpion of The Project</strong>';
        elem +='<br>' + description + '</p>';
    
        title = '<strong class="slogan">' + name + '<br></strong>'


        $(".first_text").append(title);
        $(".service-info").append(elem);
    });

    //take photos and create gallery for the project
    $.getJSON('/api/project/'+ id + '/photo', function (photos) { 
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
   
   
    $.getJSON('/api/project/'+ id + '/service', function (service) { 

        console.log(service)
        serviceInfo= '';
        firstProject = true;
        firstEvent=true;
        for (let i = 0; i < service.length; i++) {
            
            var name = service[i].name;
            var idserv = service[i].id;

            serviceInfo += '<div class="col-lg-2" id="person-info">';
            serviceInfo += '<img src="../assets/img/servizio'+ idserv+'b.jpg" class="img-thumbnail" alt="serviceImg id="imgperson"">';
            serviceInfo += '<a href="service.html?id=' + idserv + '">'+ name + '</a>';
            serviceInfo += '</div>';
          
            
            $("#person-involved").append(serviceInfo);
            serviceInfo = '';
  
            //take projects related to this (projects with same services) 
            $.getJSON('/api/service/'+ idserv + '/project', function (projects) { 
                console.log(firstProject);
                console.log(projects);
                elem = '';


                for (let i = 0; i < projects.length; i++) {
                    
                    if(projects[i].id == id){
                        console.log('uno',projects[i].id)
                        console.log('due',id)
                        continue;
                    }

                    $.getJSON('/api/project/'+ projects[i].id + '/photo', function (photos) { 
                        console.log(firstProject);
                        if(firstProject == true){
                            elem +='<p class="project-title">RELATED PROJECTS</p>'
                            elem +='<div class="projects">'
                            elem +='<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" >'
                            elem +='<ol class="carousel-indicators">'
                            for(let j=0; j < (projects.length - 1) ;j++){                                
                                if (j==0){
                                    elem +='<li data-target="#carouselExampleCaptions" data-slide-to="'+j+'" class="active"></li>'
                                } else {
                                    elem +='<li data-target="#carouselExampleCaptions" data-slide-to="'+j+'"></li>'
                                }
                            }
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
                            if(projects.length >1){       
                                elem +='<a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">';
                                elem +='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
                                elem +='<span class="sr-only">Previous</span>';
                                elem +='</a>';
                                elem +='<a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">';
                                elem +='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
                                elem +='<span class="sr-only">Next</span>';
                                elem +='</a>';
                            }
                            elem +='</div>';
                            elem +='</div>';

                            $(".container-projects").append(elem);
                            firstProject = false;
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
     
            $.getJSON('/api/service/'+ idserv + '/event', function (events) { 
                console.log(events);
                elem = '';

                for (let i = 0; i < events.length; i++) {

                        if(i == 0 && firstEvent==true){
                            elem +='<p class="project-title">RELATED EVENTS</p>'
                            elem +='<div class="events">'
                            elem +='<div id="carouselExampleCaptions2" class="carousel slide" data-ride="carousel">'
                            elem +='<ol class="carousel-indicators">'
                            for(let j=0; j < events.length ;j++){
                                if (j==0){
                                    elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="'+j+'" class="active"></li>'
                                } else {
                                    elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="'+j+'"></li>'
                                }
                            }
                            elem +='</ol>'
                            elem += '<div id="carousel-events" class="carousel-inner">'

                            elem +='<div class="carousel-item active">';
                            elem +='<img src=" ' + events[i].image + '" id="h400" class="d-block w-100" alt="...">'
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
                            if(events.length){     
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
                            firstEvent=false;
                        }else{
                            elem = '';
                            elem+='<div class="carousel-item">';
                            elem +='<img src=" ' + events[i].image + '" id="h400" class="d-block w-100" alt="...">'
                            elem +='<div class="overlay">';
                            elem +='<div id="cento">';
                            elem +='<div class="centro">';
                            elem +='<p id="texticon1">' + events[i].name +'</p>';
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
        }
    });
});



