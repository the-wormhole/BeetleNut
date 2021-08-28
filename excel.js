const xlsx = require('xlsx');
module.exports.store = async function(data){

    const wb = xlsx.utils.book_new();                   // New workbook
    const ws = xlsx.utils.json_to_sheet(data);   //New worksheet
    xlsx.utils.book_append_sheet(wb,ws)                 // appending workbook to worksheet
    xlsx.writeFile(wb,"Shipment_status.xlsx");
}