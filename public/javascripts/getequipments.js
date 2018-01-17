$("#getEquiments").click(()=>{
     $.validate({
        modules : 'date',
        onModulesLoaded : function() {
        },
        onSuccess : function(){
            let siteurl = window.location.origin + '/';
            let number = $('#equipment_number').val();
            $.ajax({
                url: siteurl + "equipment/search?limit="+number+"",
                type: "GET",
                async: false,
                success: function(data) {
                    console.log('number of equipments iis--- ' + JSON.stringify(data));
                    let equiJsonObj = JSON.parse(JSON.stringify(data));
                    let equipArray = equiJsonObj.rows.length;
                    $('#equipments_data_table').empty();
                    for(var i=0;i<equipArray;i++){
                        let j = i+1;
                        $('#equipments_data_table').append(`
                        <tr>
                            <td>`+j+`</td>
                            <td>`+equiJsonObj.rows[i].doc.equipment_no+`</td>
                            <td>`+equiJsonObj.rows[i].doc.address+`</td>
                            <td>`+equiJsonObj.rows[i].doc.contract_start_date+`</td>
                            <td>`+equiJsonObj.rows[i].doc.contract_end_date+`</td>
                            <td>`+equiJsonObj.rows[i].doc.status+`</td>
                        </tr>
                        `);
                    }
                },
                error: function(errorThrown) {
                    console.log('errorThrown in getting getEndLocation--' + errorThrown);
                }
                 });
        return false; 
        }
    });
})
   