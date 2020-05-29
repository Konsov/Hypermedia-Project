$(window).on("load",function () {

    $.getJSON('/api/person', function (person) { 
        

        var elem= '';
        person.sort(function(a, b) {
            return a.id - b.id;
        });
        
        console.log(person);
        for (let i = 0; i < person.length; i++) {

            

            var id = person[i].id;
            var name = person[i].name;
            var role = person[i].role;
            var profession = person[i].profession;
            var image = person[i].image;
            var email = person[i].email;

            if (i % 4 == 0){
                elem += '<div class="row">'
                elem += '<div class="col-md-1"></div>'
            }       
            
            elem += '<div class="array_person" style="" align="center">'
            elem += '<div class="column" >'
            elem += '<a href="/pages/singlePerson.html?id='+id+'">'
            elem += '<img src="'+ image +'" "alt="personeImage">'
            elem += '</a>'
            elem += '<p id="name">'+ name +'</p>'
            elem += '<p>'+ role +'</p>'
            elem += '<p id="profession">'+ profession +'</p>'
            elem += '<ul class="social-icons" style="width: 17vw;">'
            elem += '<li><a class="mail" href="mailto:'+email+'"><i class="fa fa-envelope-o"></i></a></li>'
            elem += '</ul>'
            elem += '</div>'
            elem += '</div>'
            if (i % 3==0 && i !=0 ){
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
