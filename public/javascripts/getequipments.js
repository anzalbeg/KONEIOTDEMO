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
                    let equipArray = equiJsonObj.docs.length;
                    $('#equipments_data_table').empty();
                    for(var i=0;i<equipArray;i++){
                        let j = i+1;
                        $('#equipments_data_table').append(`
                        <tr>
                            <td>`+j+`</td>
                            <td>`+equiJsonObj.docs[i].equipment_no+`</td>
                            <td>`+equiJsonObj.docs[i].address+`</td>
                            <td>`+equiJsonObj.docs[i].contract_start_date+`</td>
                            <td>`+equiJsonObj.docs[i].contract_end_date+`</td>
                            <td>`+equiJsonObj.docs[i].status+`</td>
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
   