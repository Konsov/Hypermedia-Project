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






$(window).on("load",function () {
    var m = getUrlParameter('month');
    var y = getUrlParameter('year');
    
    $.getJSON('/api/event/month?month='+ m + '&year='+y, function (event) { 

        title = '<strong class="slogan">Events of ' + m + '-'+ y +'<br></strong>'
        $(".first_text").append(title);

        

        console.log(event)

        for (let i = 0; i < event.length; i++) {

            elem = '';
            var id = event[i].id;
            var name = event[i].name;
            var tp = event[i].text_presentation;
            var image = event[i].image;
            var s_d = event[i].starting_date;
            var e_d = event[i].ending_date;

            var date = new Date(s_d);
            var day = date.getDate();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var dateStr1 = day+"/"+month+"/"+year;

            if (i % 2 == 0){
                elem += '<div class="row align-items-center">'
            }       
            
            elem += '<div class="array_person" align="center">'
            elem += '<div class="column" >'
            elem += '<a href="/pages/event.html?id='+id+'">'
            elem += '<img src="'+ image +'" "alt="eventImage">'
            elem += '</a>'
            elem += '<p id="name">'+ name +'</p>'
            elem += '<p id="profession">'+ dateStr1 +'</p>'
            elem += '</div>'
            elem += '</div>'
            
            if (i % 1==0 && i !=0 ){
                elem += '</div>' 
            }

            $('#event_month_array').append(elem)

        }

        
    });
    
});





