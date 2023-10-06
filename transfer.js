function runFunction(func, ...args)//func函数 ...arg 参数们
{//用于触发所给的函数
    try{
      return func(...args);
    } catch (e){
      console.log('函数执行出错:', e.message);
    }
}