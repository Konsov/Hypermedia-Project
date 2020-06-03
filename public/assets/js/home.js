$(window).on("load",function () {
    $.getJSON('/api/project', function (projects) { 

        console.log(projects);
        elem = '';
        primo = true;
        for (let i = 0; i < projects.length; i++) {
            if(projects[i].status == 'In Progress'){
                $.getJSON('/api/project/'+ projects[i].id + '/photo', function (photos) { 
                
                    if(primo == true){
                        elem +='<p class="project-title">RELEVANT PROJECTS</p>'
                        elem +='<div class="projects">'
                        elem +='<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" >'
                        elem +='<ol class="carousel-indicators">'
                        elem +='<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>'
                        elem +='<li data-target="#carouselExampleCaptions" data-slide-to="1"></li>'
                        elem += '<li data-target="#carouselExampleCaptions" data-slide-to="2"></li>'
                        elem +='</ol>'
                        elem += '<div id="carousel-projects" class="carousel-inner">'
                        elem +='<div class="carousel-item active">';
                        elem +='<img src=" ' + photos[0].url + '" id="h450" class="d-block" alt="...">'
                        elem +='<div class="overlay">';
                        elem +='<div id="cento">';
                        elem +='<div class="centro">';
                        elem +='<p id="texticon1">' + projects[i].name +'</p>';
                        elem += '<p id="textcaro">'
                        elem += ''+ projects[i].description +'</p>'
                        elem +='<a href="/pages/project.html?id='+projects[i].id+'" type="button" class="btn btn-light">Read More</a>';
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
                        primo = false;
                    }else{
                        elem = '';
                        elem+='<div class="carousel-item">';
                        elem+='<img src=" ' + photos[0].url + '" id="h450" class="d-block" alt="...">';
                        elem+='<div class="overlay">'
                        elem+='<div id="cento">';
                        elem+='<div class="centro">';
                        elem+='<p id="texticon1">' + projects[i].name  +  '</p>';
                        elem += '<p id="textcaro">'
                        elem += ''+ projects[i].description +'</p>'
                        elem +='<a href="/pages/project.html?id='+projects[i].id+'" type="button" class="btn btn-light">Read More</a>';
                        elem +='</div>';
                        elem += '</div>';
                        elem += '</div>';
                        elem +='</div>';
                            
                        $("#carousel-projects").append(elem);
                    }
                
                });
            }
        }    
       
    });
});