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
    $.getJSON('/api/service/'+ id, function (service) { 
        
        // GET BOOK BY ID /api/service/{id}
        
        var name = service.name;
        var description = service.description;

        elem = '<p class="service-paragraph"><img src="../assets/img/servizio1.jpg" class="service-img" alt="service-img"><strong>Descritpion of The Service</strong><br>' + description + '</p>';
    
        title = '<strong class="slogan">' + name + '<br></strong>'


        $(".first_text").append(title);
        $(".service-info").append(elem);
    });
    
    $.getJSON('/api/service/'+ id + '/person', function (person) { 

    console.log(person)

    });

});



