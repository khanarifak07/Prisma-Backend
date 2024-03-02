//higher order function
//A function takes another function as argument and returns a function is called higher order function
// const func = ()=>{} -- normal function
// const func = ()=>{()=>{}} -- higher order function with curly braces
// const func = ()=>()=>{} -- higher order function witout curly braces

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };
