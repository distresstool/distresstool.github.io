document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
});

$(document).ready(function() {
    function loadFunction(){
        window.loading_screen.finish();
    }
    window.loading_screen = window.pleaseWait({
        logo: "images/loading.gif",
        backgroundColor: '#0085c3',
    });
    setTimeout(loadFunction, 3000);

    google.setOnLoadCallback(function(){
        drawVisualization(state_2018, 2018);
    });

    $('select').formSelect();

    $("#year-selected").change(function(){  
        var year = $("#year-selected").val();
        console.log(year);
        if(year === "2016"){
            window.loading_screen = window.pleaseWait({
                logo: "images/loading.gif",
                backgroundColor: '#0085c3',
            });
            setTimeout(loadFunction, 1500);
            drawVisualization(state_2016, year);
        }
        else if(year === "2017"){
            window.loading_screen = window.pleaseWait({
                logo: "images/loading.gif",
                backgroundColor: '#0085c3',
            });
            setTimeout(loadFunction, 1500);
            drawVisualization(state_2017, year);
        }
        else if(year==="2018"){
            window.loading_screen = window.pleaseWait({
                logo: "images/loading.gif",
                backgroundColor: '#0085c3',
            });
            setTimeout(loadFunction, 1500);
            drawVisualization(state_2018, year);
        }
    });
    
    function findStateDetails(rowID, year){
        $('#visualization').animate({left: '-200px'}, {duration: 2500});
        rowID += 1;
        var state_object = null;
        var state_year_list = state_dis_object[year];
        
        var state_year_object = null;
        
        for(var i=0; i<state_year_list.length; i++){
            if(state_year_list[i].id == rowID){
                state_year_object = state_year_list[i];
            }
        }

        for(var i = 0; i < state_list.length; i++){
            if(state_list[i].id === rowID){
                state_object = state_list[i];
            }
        }
        if (state_object != null){
            window.loading_screen = window.pleaseWait({
                logo: "images/loading.gif",
                backgroundColor: '#0085c3',
            });
            setTimeout(loadFunction, 2000);
            var image_string = "images/" + year + "/" + state_object.id + ".png"; 
            var image_tag = '<img src="' + image_string + '" class="responsive-img">';
            $("#visualization").html(image_tag);
            var sec_column_html = '<ul class="collapsible expandable" style="margin-top:100px text-align:left"><li class="active" style="text-align:left"> <div class="collapsible-header"><i class="material-icons"> place</i>' +  state_object.state_name + '</div><div class="collapsible-body"><span style="text-align:left;"><B>Population: </B><br>' + state_object.population + '<br><br><B>Literacy Rate: </B><br>' + state_object.literacy_rate +  '<br><br><B>State GDP: </B><br>' + state_object.state_gdp + '<br><br><B>Household Work Demanded: </B><br>' + state_year_object.state_household_work_demanded +  '<br><br><B>Person Demanded Work: </B><br>' + state_year_object.state_person_demanded_work + '</span></div></li><li style="text-align:left"><div class="collapsible-header"><i class="material-icons">arrow_drop_down</i>More</div><div class="collapsible-body"><span style="text-align:left;"> <B>State Distress Value</B><br>' + state_year_object.state_dis + '<br><br><B>Sex Ratio: </B><br>' + state_object.sex_ration +  '<br><br><B>Capital: </B><br>' + state_object.capital + '</span></div></li></ul>'
            $("#sec-column").html(sec_column_html);
            $('.collapsible').collapsible();
        }
    }

    function drawVisualization(rows, year) {
        
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'State Code');
        dataTable.addColumn('string', 'State');
        dataTable.addColumn('number', 'Distress');
        dataTable.addColumn({type: 'string', role: 'tooltip'});

        dataTable.addRows(rows);

        var opts = {
            region: 'IN',
            domain:'IN',
            displayMode: 'regions',
            colorAxis: {
                values:[0, 1.2, 1.21, 2.5, 2.5, 3.5],
                colors:['#29a04d', '29a04d', '#ffb453', '#ffb453', '#cc3232', '#cc3232']
            },
            resolution: 'provinces',
            defaultColor: '#979797',
            width: 640,
            height: 480
        };

        var geochart = new google.visualization.GeoChart(
            document.getElementById('visualization')
        );

        function myClickHandler(){
            var selection = geochart.getSelection();
            var message = '';
            for (var i = 0; i < selection.length; i++) {
                var item = selection[i];
                if (item.row != null && item.column != null) {
                    message += '{row:' + item.row + ',column:' + item.column + '}';
                } else if (item.row != null) {
                    row = item.row;
                } else if (item.column != null) {
                    message += '{column:' + item.column + '}';
                }
            }
            findStateDetails(row, year);
        }

        google.visualization.events.addListener(geochart, 'select', myClickHandler);

        geochart.draw(dataTable, opts);
    };
});