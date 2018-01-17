$("#createEquipment").click(()=>{
$.validate({
        modules : 'location, security, date',
        onModulesLoaded : function() {
        $('#country').suggestCountry();
        },
        onSuccess : function(){
            //alert('create success');
            let siteurl = window.location.origin + '/';
            let number = $('#number').val();
            let status = $('#status').val();
            let address = $('#address').val();
            let c_s_d = $('#c_s_d').val();
            let c_e_d = $('#c_e_d').val();
            let ts = Math.round(new Date().getTime()/1000);
            $.ajax({
                url: siteurl + "equipment",
                type: "POST",
                data: {"equipment_no":number,"address":address,"contract_start_date":c_s_d,"contract_end_date":c_e_d,"status":status,"ts":ts},
                async: false,
                success: function(data) {
                    console.log('number of equipments iis--- ' + JSON.stringify(data));
                    if(data == 'equipmentexist'){
                       $('#myModal').modal('show');
                    }if(data == 'ok'){
                        $('#myModal2').modal('show');
                    }
                },
                error: function(errorThrown) {
                    console.log('errorThrown in getting getEndLocation--' + errorThrown);
                }
        });
        return false; 
        }
    });    
});