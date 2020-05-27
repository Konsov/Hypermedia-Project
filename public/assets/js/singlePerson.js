//"use strict";

var currencies = {
    EUR: '&euro;',
    USD: '$'
};

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
        console.log(person);
        var id = person.id;
        
        var name = person.name;
        var age = person.age;
        var role = person.role;
        var image = person.image;
        var email = person.email;
        var profession = person.profession;
        var short_description = person.short_description;
        console.log(person['name'])
        $("#person_name").html(name);
        $("#person_age").html(age);
        $("#person_role").html(role);
        $("#person_email").html(email);
        $("#person_profession").html(profession);
        $("#person_description").html(short_description);
        var img = '<div class="item"><img src="' + image + '" id="person_img" class="img-responsive" alt=""></div>';
        $("#product-carousel").append(img);
    });
});



