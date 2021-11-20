
export class generateOTP{
    getRandomInt(min:number, max:number) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        //console.log(Math.floor(Math.random() * (max - min + 1)) + min)
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    }