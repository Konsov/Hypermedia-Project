$(window).on("load",function () {

    $.getJSON('/api/person', function (person) { 
        //get info for person

        var elem= '';
        person.sort(function(a, b) {
            return a.id - b.id;
        });
        
        for (let i = 0; i < person.length; i++) {

            var id = person[i].id;
            var name = person[i].name;
            var role = person[i].role;
            var profession = person[i].profession;
            var image = person[i].image;
            var email = person[i].email;

            if (i % 4 == 0){
                elem += '<div class="row align-items-center">'
            }       
            
            elem += '<div class="array_person align-self-start" align="center">'
            elem += '<div class="column" >'
            elem += '<a href="/pages/singlePerson.html?id='+id+'">'
            elem += '<img src="'+ image +'" "alt="personeImage">'
            elem += '</a>'
            elem += '<p id="name">'+ name +'</p>'
            elem += '<p>'+ role +'</p>'
            elem += '<p id="profession">'+ profession +'</p>'
            elem += '<ul class="social-icons" id="w17">'
            elem += '<li><a class="mail" href="mailto:'+email+'"><i class="fa fa-envelope-o"></i></a></li>'
            elem += '</ul>'
            elem += '</div>'
            elem += '</div>'
            
            if (i == 3 || i == 7 || i == 11 || i == 14 || (i+1) == person.lenght ){
                console.log(i)
                elem += '</div>' 
            }

        }
        $('#person_array').append(elem);
    });
});


$(document).on("click", ".btn", function() {

    var name = $(this).data('service');        
    if (name) {
        window.location = `/pages/service.html?id=${name}`;
    }
})
