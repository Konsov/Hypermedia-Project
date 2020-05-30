$(window).on("load",function () {

    $.getJSON('/api/service', function (service) { 
        for (let i = 0; i < service.length; i++) {
            var id = service[i].id;
            var name = service[i].name;
            var description = service[i].description;
            var elem= '';
            elem += '<div class="row">'
            elem += '<div class="box-c">'            
            elem += '<h3 class="custom-underline" id="service_name">'+ name +'</h3>'
            elem += '</div>'
            elem += '</div>'
            elem += '<div id="service" class="col-lg-12">'
            
           if(i % 2 == 0){
                elem += '<div class="row">'
                elem += '<div id="service-img" class="col-lg-5">'
                elem += '<img src="../assets/img/servizio'+ id+'b.jpg" class="img-thumbnail" alt="Association"></div>'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ description +'</p>'
                elem += '<a href="/pages/service.html?id='+ id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '</div>'
           }else{
                elem += '<div class="row">'
                elem += '<div id="text" class="col-lg-7">'
                elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 5;-webkit-box-orient: vertical;">'
                elem += ''+ description +'</p>'
                elem += '<a href="/pages/service.html?id='+ id +'" class="btn btn-dark">Read More</a>'
                elem += '</div>'
                elem += '<div id="service-img" class="col-lg-5 order-first order-lg-last">'
                elem += '<img src="../assets/img/servizio'+ id+'b.jpg" class="img-thumbnail" alt="Association"></div>'
                elem += '</div>'
                elem += '</div>'
           }
            elem += '</div>'
            
            $('#service-container').append(elem);
        }
    });
});
