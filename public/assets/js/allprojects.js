function pageNext() {
    if(j == 4){        
        $('#prev').removeClass('disabled');
    }
    j=j+1;
    $('#service-container').empty();
    k= j + 5;
    
    if($('.pagination .last-item').hasClass('active')){
        //incremento tutto di uno
        $('.pagination .page-item-number a').each(function(){
            $(this).html(parseInt($(this).html()) + 1);
        });
    } else {
        let currActive = $('.pagination .active');
        currActive.next().addClass('active');
        currActive.removeClass('active');
    }

    for (let i = j; i < k &&  i < prog.length; i++) {
        
        j=i;
        $.getJSON('/api/project/'+ prog[i].id + '/photo', function (photos) { 
            
            elem= '';
            elem += '<div class="box-c">' 
            elem += '<h3 class="custom-underline" id="service_name">'+ prog[i].name +'</h3>'
            elem += '</div>'
            elem += '<div id="service" class="col-lg-12">'
            
            if(i % 2 == 0){
                elem += '<div class="row">'
                elem += '<div id="service-img" class="col-lg-5">'
                elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ prog[i].description +'</p>'
                elem += '<a href="/pages/project.html?id='+ prog[i].id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '</div>'
            }else{
                elem += '<div class="row">'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ prog[i].description +'</p>'
                elem += '<a href="/pages/project.html?id='+ prog[i].id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '<div id="service-img" class="col-lg-5 order-first order-lg-last">'
                elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                elem += '</div>'
                elem += '</div>'
            }
            elem += '</div>'
            
            $('#service-container').append(elem);
        });
    }
    if((j+1) == prog.length){        
        $('#next').addClass('disabled');
    }
}


var prog = '';
var j = '';

function newPage(){
    if(j == 5 || j== 10){        
        $('#prev').removeClass('disabled');
    }
    if(j == 5 || j== 0){        
        $('#next').removeClass('disabled');
    }    
    if(j==0){        
        $('#prev').addClass('disabled');
    }

    $('#service-container').empty();
    k= j + 5;
     
    for (let i = j; i < k &&  i < prog.length; i++) {
        
        j=i;
        $.getJSON('/api/project/'+ prog[i].id + '/photo', function (photos) { 
            
            elem= '';
            elem += '<div class="box-c">' 
            elem += '<h3 class="custom-underline" id="service_name">'+ prog[i].name +'</h3>'
            elem += '</div>'

            elem += '<div id="service" class="col-lg-12">'
            
            if(i % 2 == 0){
                elem += '<div class="row">'
                elem += '<div id="service-img" class="col-lg-5">'
                elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ prog[i].description +'</p>'
                elem += '<a href="/pages/project.html?id='+ prog[i].id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '</div>'
            }else{
                elem += '<div class="row">'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ prog[i].description +'</p>'
                elem += '<a href="/pages/project.html?id='+ prog[i].id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '<div id="service-img" class="col-lg-5 order-first order-lg-last">'
                elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                elem += '</div>'
                elem += '</div>'
            }
            elem += '</div>'
            
            $('#service-container').append(elem);
        });
    }
    if((j+1) == prog.length){        
        $('#next').addClass('disabled');
    }
}
function pagePrevious(){    

    if($('.pagination .first-item').hasClass('active')){
        //decremento tutto di uno
        $('.pagination .page-item-number a').each(function(){
            $(this).html(parseInt($(this).html()) - 1);
        });
    } else {
        let currActive = $('.pagination .active');
        currActive.prev().addClass('active');
        currActive.removeClass('active');
    }


    if(j == 9){        
        $('#prev').addClass('disabled');
    }
    $('#next').removeClass('disabled');
    $('#service-container').empty();

    if(j % 5 == 4) {
        j=j-9;
    } else {
        j= (j-(j % 5) - 5)
    }

   
    k= j + 5;
    for (let i = j; i < k; i++) {
        j=i;
        $.getJSON('/api/project/'+ prog[i].id + '/photo', function (photos) { 
            
            elem= '';
            elem += '<div class="box-c">' 
            elem += '<h3 class="custom-underline" id="service_name">'+ prog[i].name +'</h3>'
            elem += '</div>'

            elem += '<div id="service" class="col-lg-12">'
            
            if(i % 2 == 0){
                elem += '<div class="row">'
                elem += '<div id="service-img" class="col-lg-5">'
                elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ prog[i].description +'</p>'
                elem += '<a href="/pages/project.html?id='+ prog[i].id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '</div>'
            }else{
                elem += '<div class="row">'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ prog[i].description +'</p>'
                elem += '<a href="/pages/project.html?id='+ prog[i].id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '<div id="service-img" class="col-lg-5 order-first order-lg-last">'
                elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                elem += '</div>'
                elem += '</div>'
            }
            elem += '</div>'
            
            $('#service-container').append(elem);
        });
    }
    
    
}
$(window).on("load",function () {

    $.getJSON('/api/project', function (projects) { 
        
        projects.sort(function(a, b) {
            return a.id - b.id;
        });
        prog = projects;
        var elem= '';
       
        for (let i = 0; i < 5; i++) {
            
            j=i;
            $.getJSON('/api/project/'+ projects[i].id + '/photo', function (photos) { 
                
                elem= '';
                elem += '<div class="box-c">' 
                elem += '<h3 class="custom-underline" id="service_name">'+ prog[i].name +'</h3>'
                elem += '</div>'

                elem += '<div id="service" class="col-lg-12">'
                
                if(i % 2 == 0){
                    elem += '<div class="row">'
                    elem += '<div id="service-img" class="col-lg-5">'
                    elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                    elem += '<div id="text" class="col-lg-7">'
                    elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                    elem += ''+ projects[i].description +'</p>'
                    elem += '<a href="/pages/project.html?id='+ projects[i].id +'" class="btn btn-dark">Read More</a>'
                    elem += '</div>'
                    elem += '</div>'
                }else{
                    elem += '<div class="row">'
                    elem += '<div id="text" class="col-lg-7">'
                    elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                    elem += ''+ projects[i].description +'</p>'
                    elem += '<a href="/pages/project.html?id='+ projects[i].id +'" class="btn btn-dark">Read More</a>'
                    elem += '</div>'
                    elem += '<div id="service-img" class="col-lg-5 order-first order-lg-last">'
                    elem += '<img src="'+ photos[0].url +'" class="img-thumbnail" alt="Association"></div>'
                    elem += '</div>'
                    elem += '</div>'
                }
                elem += '</div>'
                
                $('#service-container').append(elem);
            });
        }
    });

    $('.pagination .prev-item').click(function(){
        if ( $('#prev').hasClass('disabled') ){
            return
        }
        $('#scrolltop').click();
        pagePrevious();
    });

    $('.pagination .next-item').click(function(){
        if ( $('#next').hasClass('disabled') ){
            return
        }
        $('#scrolltop').click();
        pageNext();
    });

    $('.pagination .page-item-number').click(function(){
        $('#scrolltop').click();
        let pageNumber = parseInt($(this).find('a').html());
        if( pageNumber == 1){
            j=0;
        } else if (pageNumber == 2){
            j=5;
        } else {
            j=10;
        }
        newPage();
        $('.page-item-number').removeClass('active');
        $('.page-item-number').each(function(){
            if(parseInt($(this).find('a').html()) === pageNumber)
                $(this).addClass('active');
        });
    });


});

$(document).ready(function() {

    function scrollToObj(target, offset, time) {
        $('html, body').animate({scrollTop: $( target ).offset().top - offset}, time);
    }

    $("#scrolltop").click(function() {
        scrollToObj('body',0, 1000);
    });
})
