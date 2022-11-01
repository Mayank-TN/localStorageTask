// 1)
// function x() {
//   let a = 10;
//   function y() {
//     console.log(a);
//   }
//   y();
// }
// x();

// Output => 10


// 2)
// function x() {
//     let a = 10;
//     function y() {
//         console.log(a)
//     }
//     return y();
// }
// x();

// Output => 10 , as in the return statement y() function is executing

// 3)  
// function x() {
//     let a = 10;
//     function y() {
//         console.log(a);
//     }
//     return y;
// }
// console.log(x());
// OutPut => Function Y , as the x() function is returning the whole y() function

// 4)  
// function x() {
//     let a = 10;
//     function y() {
//         console.log(a);
//     }
//     return y;
// }
// const z = x()

// console.log();
// Output => 10  and undefined , as const z = y() and then it will execute first Z() function execute give output 10 and the console.log the z() function give undefined as output

// 5)
// function x() {
//     let a = 10;
//     function y() {
//         console.log(a);
//     }
//     a = 50;
//     return y;
// }
// const z = x()
// console.log(z());
// Output => 50 and undefined , 50 as z() function on execution y() will return the a variable reference, not the value , and undefined when we console.log(z())