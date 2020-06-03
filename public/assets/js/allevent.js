




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

function setDate(m,y){
    console.log(m-1)
    $('#months_event').empty();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var img = new Array();
    
    img[0]= "../assets/img/eventopresentazione.jpg"
    img[1]= "../assets/img/pittura.jpg"
    img[2]= "../assets/img/recrutingday.jpg"
    img[3]= "../assets/img/ee.jpg"
    img[4]= "../assets/img/raccoltafondi.jpg"
    img[5]= "../assets/img/caricamento-temporaneo-per-contributo-eptqguy4cg-612427.jpg"
    
    elem='';
    var j=0;    
    for (let i = 0; i < 6; i++) {

        if((m+i)==12){
            m=0;
            j=0;
            y=y-0;
            y=y+1;
        }

        if (i % 3 == 0){
            elem += '<div class="row align-items-center">'
        }    
        
        elem += '<div class="array_person"  align="center">'
        elem += '<div class="column">'
        elem += '<a href="/pages/eventmonth.html?month='+(m+1+j)+'&year='+y+'">'
        elem += '<img src="'+ img[i] +'" "alt="personeImage" id="img_light">'        
        elem += '</a>'
        elem += '<a id="no_deco" href="/pages/eventmonth.html?month='+(m+1+j)+'&year='+y+'"><p id="month">'+ month[(m+j)] +'</p></a>'
        elem += '<a id="no_deco" href="/pages/eventmonth.html?month='+(m+1+j)+'&year='+y+'"><p id="year">'+ y +'</p></a>'
        elem += '</a>'        
        elem += '</div>'
        elem += '</div>'
        
        if ((i == 2 || i==5) && i !=0 ){
            elem += '</div>' 
        }
        j++;
    }
    $('#months_event').append(elem);
}





$(window).on("load",function () {
    var m = getUrlParameter('month');
    var y = getUrlParameter('year');

    var d = new Date();
    var m = d.getMonth();
    var y = d.getFullYear();
    setDate(m,y);
       
    
    $.getJSON('/api/event', function (events) {
        
        events.sort(function(a, b) {
            return a.starting_date - b.starting_date;
        });

        
        elem = '';
        
        for (let i = 0; i < 3; i++) {
            
            if(i == 0){
                elem +='<p class="project-title">UPCOMING EVENTS</p>'
                elem +='<div class="events">'
                elem +='<div id="carouselExampleCaptions2" class="carousel slide" data-ride="carousel" >'
                elem +='<ol class="carousel-indicators">'
                elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="0" class="active"></li>'
                elem +='<li data-target="#carouselExampleCaptions2" data-slide-to="1"></li>'
                elem += '<li data-target="#carouselExampleCaptions2" data-slide-to="2"></li>'
                elem +='</ol>'
                elem += '<div id="carousel-events" class="carousel-inner">'

                elem +='<div class="carousel-item active">';
                elem +='<img src=" ' + events[i].image + '" id="h400" class="d-block w-100" alt="...">'
                elem +='<div class="overlay">';
                elem +='<div id="cento">';
                elem +='<div class="centro">';
                elem +='<p id="texticon1">' + events[i].name +'</p>';
                elem += '<p id="textcaro">'
                elem += ''+ events[i].text_presentation +'</p>'
                elem +='<a href="event.html?id='+ events[i].id+'" type="button" class="btn btn-light">Read More</a>';
                elem +='</div>';
                elem +='</div>';
                elem +='</div>';
                elem +='</div>';        
                elem +='<a class="carousel-control-prev" href="#carouselExampleCaptions2" role="button" data-slide="prev">';
                elem +='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
                elem +='<span class="sr-only">Previous</span>';
                elem +='</a>';
                elem +='<a class="carousel-control-next" href="#carouselExampleCaptions2" role="button" data-slide="next">';
                elem +='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
                elem +='<span class="sr-only">Next</span>';
                elem +='</a>';
                elem +='</div>';
                elem +='</div>';

                $(".carousel-events").append(elem);
            }else{
                console.log(events[i])
                elem = '';
                elem+='<div class="carousel-item">';
                elem+='<img src=" ' + events[i].image + '" id="h400" class="d-block w-100" alt="...">';
                elem+='<div class="overlay">'
                elem+='<div id="cento">';
                elem+='<div class="centro">';
                elem+='<p id="texticon1">' +  events[i].name  +  '</p>';
                elem += '<p id="textcaro">'
                elem += ''+ events[i].text_presentation +'</p>'
                elem +='<a href="event.html?id='+ events[i].id+'" type="button" class="btn btn-light">Read More</a>';
                elem +='</div>';
                elem += '</div>';
                elem += '</div>';
                elem +='</div>';
                $("#carousel-events").append(elem);
            }
    }

        
    });
    
});

$(document).ready(function() {
    $(function() {
        $('.date-picker').datepicker(
            {
                dateFormat: "mm-yy",
                changeMonth: true,
                changeYear: true,
                showButtonPanel: true,
                onClose: function(dateText, inst) {


                    function isDonePressed(){
                        return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
                    }

                    if (isDonePressed()){
                        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                        $(this).datepicker('setDate', new Date(year, month, 1)).trigger('change');
                        
                        $('.date-picker').focusout()//Added to remove focus from datepicker input box on selecting date
                    }
                },
                beforeShow : function(input, inst) {

                    inst.dpDiv.addClass('month_year_datepicker')

                    if ((datestr = $(this).val()).length > 0) {
                        year = datestr.substring(datestr.length-4, datestr.length);
                        month = datestr.substring(0, 2);
                        $(this).datepicker('option', 'defaultDate', new Date(year, month-1, 1));
                        $(this).datepicker('setDate', new Date(year, month-1, 1));
                        $(".ui-datepicker-calendar").hide();
                    }
                }
            })
            .on("change", function() {
                var date = $("#startDate").val();
                var vals = date.split("-");
                if(vals[0].charAt(0)==0){
                    setDate((vals[0].charAt(1)-1),vals[1])
                } else {
                    setDate((vals[0]-1),vals[1])
                }
                
            });
   });
})



