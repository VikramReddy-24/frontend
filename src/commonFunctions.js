const domain =`http://13.232.72.75:80/`
const dropdown_endPoint=`api/dropDown`
const derivative_endpoint='api/derivatives'


function areObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  
    return true;
  }

export {domain,dropdown_endPoint,derivative_endpoint,areObjectsEqual}