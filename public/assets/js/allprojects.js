$(window).on("load",function () {

    $.getJSON('/api/project', function (projects) { 
       
        var elem= '';
       
        for (let i = 0; i < projects.length; i++) {
            
            $.getJSON('/api/project/'+ projects[i].id + '/photo', function (photos) { 
                
                elem= '';
                elem += '<h3 id="service_name">'+ projects[i].name +'</h3>'

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
});
