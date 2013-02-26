function ArrayContains(array, object)
{
  if (array && object)
  {
    for(var i = 0; i < array.length; i++){
      if (array[i] == object){
        return true;
      } 
    }

    return false;
  }
}


function ObjectCount(object){
  var count = 0;
  for (var el in object){
    if (object.hasOwnProperty(el)){
      count++;
    }
  }

  return count;
}
