$(window).on("load",function () {

    $.getJSON('/api/service', function (service) { 
        
        // GET BOOK BY ID /api/book/{bookId}
        for (let i = 0; i < service.length; i++) {
            var id = service[i].id;
            var name = service[i].name;
            var description = service[i].description;
            var elem= '';             
            elem += '<div class="col-lg-12">'
            elem += '<div class="row">'
            elem += '<div class="col-lg-2"></div>'
            elem += '<div id="serviceee" class="col-lg-8">'
            elem += '<h3 id="service_name">'+ name +'</h3>'
            elem += '<div class="col-lg-12">'
            elem += '<div class="row">'
            elem += '<div class="col-lg-4">'
            elem += '<img src="../assets/img/servizio1.jpg" class="img-thumbnail" alt="Association" width="608" height="452"></div>'
            elem += '<div class="col-lg-8">'
            elem += '<p style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 3;-webkit-box-orient: vertical;">'
            elem += ''+ description +'</p>'
            elem += '<input type="button" name="theButton" value="Detail" class="btn btn-primary" data-service="'+id+'" />'
            elem += '</div>'
            elem += '</div>'
            elem += '</div>'
            elem += '</div>'
            elem += '</div>'
            elem += '</div>'
            $('#service_array').append(elem);

        }
    });
});


$(document).on("click", ".btn", function() {

    var name = $(this).data('service');        
    if (name) {
        window.location = `/pages/singleService.html?id=${name}`;
    }
})
