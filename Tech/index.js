/* 
//Find the sum of max three num
let arr = [1,3,5,3,0,2,4,-3]
function maxSum(arr){
   let first = 0
   let sec = 0
   let third = 0
   for(let i = 0; i < arr.length; i++) {
            if(first < arr[i]){ 
                  sec = first
                  first  = arr[i]
            }else if(arr[i]!==first && arr[i] > sec){
                  third = sec
                  sec = arr[i]
            }else if(arr[i]!==sec && arr[i] > third){
                  third = arr[i]
            }
      
   }
 console.log(first , sec , third)
  
}
maxSum(arr) */

//Find the sum of max sub array from array
/* const arr2 = [1,4,4,2-5,2-6,-1,2-5,3,-4,5]
let max = arr2[0]
let start = 0;
let end = 0
let sum = 0
for (let i = 0; i < arr2.length; i++) {
      let temp = 0
      for(let j = i; j < arr2.length; j++) {
             temp +=arr2[j]
             if(temp > max){
                  max = temp
                  start= i
                  end = j
             }
      }
} */
// console.log(arr2.slice(start,end+1),max)
/* const arr3 = [1,4,4,2-5,2-6,-1,2-5,3,-4,5]
let tem = ""
let val = ""
let sum = 0
let max = arr3[0]
for (let i = 0; i < arr3.length; i++) {
      sum +=arr3[i]
      if(sum < 0){
            sum = 0
            tem = ""
      }else{
            tem +=arr3[i]
      }
      if(sum > max){
            max = sum
            console.log(tem)
      }
      
}
console.log(max,val) */


//Create a array of sum of element of other index 

 