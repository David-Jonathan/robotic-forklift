import * as readline from 'readline';

export const Config = {
    x: 9,
    y: 0,
    warehouseFloor: Array(10).fill('  ').map(() => Array(10).fill('  '))
};

export type RL = readline.Interface
export type MoveLift = (readlineInterface: RL) => (command: string) => void

export enum Directions {
    NORTH = 'N',
    SOUTH = 'S',
    EAST = 'E',
    WEST = 'W'
}