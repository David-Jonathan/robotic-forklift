import mockStdin from 'mock-stdin'
import { forkLift } from '../src/index'

console.log = jest.fn()
console.error = jest.fn()
console.info = jest.fn()

describe('Test the robotic-forkLift commands', () => {
    let stdin: ReturnType<typeof mockStdin.stdin>
    let input:string = ''
    let expectedResult:string = ''

    const execute = (input: string): void => {
      forkLift()
      stdin.send(input)
      stdin.end()
    }
  
    beforeEach(() => {
      stdin = mockStdin.stdin()
    })

    describe('should accept input commands', () => {

        it('should accept the valid input to exit', () => {
            input = 'Q'
            expectedResult = 'Stopping the forklift...'
            execute(input)
            expect(console.info).toBeCalledWith(expectedResult)
        })

        it('should accept the invalid command and show message', () => {
            input = 'ABCDEFGH'
            expectedResult = 'Invalid command. Please use valid directions separated by SPACE (or) Q to stop: '
            execute(input)
            expect(console.error).toBeCalledWith(expectedResult)
        })

        it('should accept the valid input', () => {
            input = 'N E N E N E'
            expectedResult = '🚚 is at (6, 3) Enter next command to move the forklift (or) Q to stop: '
            execute(input)
            expect(console.info).toBeCalledWith(expectedResult)
        })

        it('should accept the valid input and come back to previous position', () => {
            input = 'N E S W'
            expectedResult = '🚚 is at (6, 3) Enter next command to move the forklift (or) Q to stop: '
            execute(input)
            expect(console.info).toBeCalledWith(expectedResult)
        })

        it('should accept input and show out of bounds message', () => {
            input = 'S S S S S'
            expectedResult = 'Given path is out of the warehouse boundary. Enter valid command (or) Q to stop: '
            execute(input)
            expect(console.error).toBeCalledWith(expectedResult)
        })         
    })
})
