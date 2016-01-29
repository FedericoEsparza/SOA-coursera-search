//Makes DAY, MONTH, YEAR buttons active when clicked
$("btn-group > .btn").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});

// retrieve today's date and set as input
var today = new Date();
var month = today.getMonth()+1;
var year = today.getFullYear();
$("#Month").val(month.toString());
$("#yyyy").val(year.toString());

// retrieves coursera api with start dates and certificate info.
function apiJSON() {
    $.ajax({
        type: 'GET',
        url: "https://api.coursera.org/api/catalog.v1/sessions?fields=startYear,startMonth,startDay,eligibleForCertificates,shortName,shortDescription",
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $('#results-list').remove();
            $('#results').append($('<div id="results-list"></div>'));
            $.each(data.elements, function (index, element) {
            
                //Retrieve course shortname to display in results
                var url = document.createElement('a');
                url.href = element.homeLink;
                var courseraPath = url.pathname.split('-');
                var shortName = courseraPath[0];
                
                //Runs if search by DAY is clicked and Day, Month, Year filled in
                if ($("#DAY").parent().hasClass("active")) {
                    if ((element.startDay == parseInt($('#Day').val())) &&
                        (element.startMonth == parseInt($('#Month').val())) &&
                        (element.startYear == parseInt($('#yyyy').val())) &&
                        (element.eligibleForCertificates == true)) {
                        $('#results-list').append($('<div><a href="' + element.homeLink + '">' + element.startMonth + '/' +
                            element.startDay + '/' + element.startYear + ' ' + shortName +'</a></div>')
                        ); //end append
                    } //end if
                }; //end if
                
                //Runs if search by Month is clicked and Month, Year filled in
                if ($("#MONTH").parent().hasClass("active")) {
                    if ((element.startMonth == parseInt($('#Month').val())) &&
                        (element.startYear == parseInt($('#yyyy').val())) &&
                        (element.eligibleForCertificates == true)) {
                        $('#results-list').append($('<div><a href="' + element.homeLink + '">' + element.startMonth + '/' +
                            element.startDay + '/' + element.startYear + ' ' + shortName + '</a></div>')
                        ); //end append
                    } //end if
                }; //end if
                
                //Runs if search by YEAR is clicked and Year filled in 
                if ($("#YEAR").parent().hasClass("active")) {
                    if ((element.startYear == parseInt($('#yyyy').val())) &&
                        (element.eligibleForCertificates == true)) {
                        $('#results-list').append($('<div><a href="' + element.homeLink + '">' + element.startMonth + '/' +
                            element.startDay + '/' + element.startYear + ' ' + shortName + '</a></div>')
                        ); //end append
                    } //end if
                }; //end if
            }); //end each loop

            // Display message for no results
            if ($.trim($('#results-list').html()) == '') {
                $('#results-list').remove();
                $('#results').append($('<div id="results-list"></div>'));
                $('#results-list').append($('<div>0 results found</a></div>'));
            } //end if
            
        } //end success
    }); //end ajax
}; //end function

//Default search, on page load
apiJSON();

//Search on SUBMIT click
$(".btn-success").click(function () {
    apiJSON();
  }//end function
); //end click
