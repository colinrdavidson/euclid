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
