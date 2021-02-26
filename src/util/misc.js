const meters_to_miles = (distance_in_meters) => {
    var miles = ( distance_in_meters /  1609 );
    return miles.toFixed(2);
  }


const format_date = (date) => {
  var d = new Date(date);
  var month = d.toLocaleString('default', { month: 'long' });
  return month.substring(0,3) + '. ' + d.getDate();
}  

export {meters_to_miles, format_date}