export const sortObjOfObj = (object, mode) => {
  switch (mode) {
    case "asc":
      return Object.keys(object)
        .sort()
        .reduce((obj, key) => {
          obj[key] = object[key];
          return obj;
        }, {});
    case "desc":
      return Object.keys(object)
        .sort()
        .reverse()
        .reduce((obj, key) => {
          obj[key] = object[key];
          return obj;
        }, {});
    default:
      return object;
  }
};
