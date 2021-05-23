// We use interfaces to declare the user-defined types, 
export interface Duck {
  name: string,
  numLegs: number,
  // we must indicate the parameter type, and the return (we'll be using the console.log so we must return void)
  makeSound: (sound : string) => void
}

// because is an interface, we need to 
const duck1 : Duck = {
  name: "huey",
  numLegs: 2,
  makeSound: (sound : any) => console.log(sound)
}

const duck2 : Duck = {
  name: "dewey",
  numLegs: 2,
  makeSound: (sound: any) => console.log(sound)
}

export const ducks = [duck1 , duck2]