export class Person{
    public name: string;
    protected age : number;
    readonly institute : string;
    private id : number;
    static counter : number =0;

    constructor(name:string,age:number,institute:string){
        this.name=name;
        this.age=age;
        this.institute=institute;
        this.id=++Person.counter;
    }
    public greet():string{
        return `hello, my name is ${this.name},I am ${this.age} yers old and I study at ${this.institute}`;
    }
}