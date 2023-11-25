import * as readline from 'readline'
import { stdin as input, stdout as output } from 'node:process'
import { table } from 'table'
import { Config, Directions, MoveLift } from './config';

const moveForkLift = (instructions:string[]) => {
    Config.warehouseFloor[Config.x][Config.y] = '  '
    instructions.forEach((move:string) => {
        switch(move) {
            case Directions.NORTH: {
                Config.x-=1;
                console.log('🚚 moved NORTH')
                break;  
            }
            case Directions.EAST: {
                Config.y+=1;
                console.log('🚚 moved EAST')
                break;
            }
            case Directions.SOUTH: {
                Config.x+=1;
                console.log('🚚 moved SOUTH')
                break;
            }
            case Directions.WEST: {
                Config.y-=1;
                console.log('🚚 moved WEST')
                break;
            }           
        }
    })
    Config.warehouseFloor[Config.x][Config.y] = '🚚'
}

const processForkLiftCommand : MoveLift = readlineInterface => command => {
    const validCommandTest = /^([NEWS]+\s)*[NEWS]+$/

    if (command === 'Q') {
        console.info('Stopping the forklift...')
        readlineInterface.close()
    } else {
        if(!validCommandTest.test(command)) {
            console.error('Invalid command. Please use valid directions separated by SPACE (or) Q to stop: ')
        } else {
            const commandArray = command.split(' ')
            const occurrences = commandArray.reduce((acc:any, curr:string) => {
                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
                }, {});
            let xAxisMoves = Config.x - parseInt(occurrences.N||0) + parseInt(occurrences.S||0)
            let yAxisMoves = Config.y + parseInt(occurrences.E||0) - parseInt(occurrences.W||0)
            if ((xAxisMoves > 9 || xAxisMoves < 0) || (yAxisMoves > 9 || yAxisMoves < 0)) {
                console.error('Given path is out of the warehouse boundary. Enter valid command (or) Q to stop: ')
            } else {
                moveForkLift(commandArray)
                console.log(table(Config.warehouseFloor));
                console.info(`🚚 is at (${Config.x}, ${Config.y}) Enter next command to move the forklift (or) Q to stop: `)
            }
        }
    }
}

export const forkLift = (): void => {
    const readlineInterface = readline.createInterface({ input, output })
    console.log("Please enter a valid command (eg. N E N E N E N E) to move the forklift: ")
    readlineInterface.on('line', processForkLiftCommand(readlineInterface))
}

forkLift()
