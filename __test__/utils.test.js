/*import {assert} from 'chai'*/
import {generateMines, generateCells, getNearbies} from '../app/utils'
import React from 'react'
import expect from 'expect'
import {shallow,render,mount} from 'enzyme'
import renderer from 'react-test-renderer'
import App from '../app/App'
import Grid from '../app/grid'

describe('generateMines',() =>{
	it('generateMines should return an array of 10 coords',() => {
		expect(generateMines(9,9,10)).toHaveLength(10)
	})
	it('coords should be in a correct format', () => {
		const coords = generateMines(9,9,10)
		coords.map( c => {
			expect(c).toMatch(/\d,\d/)
		})
	})
})


describe('generateCells',() => {
		const mines = generateMines(9,9,10) 
		const cells = generateCells(9,9,mines)

	it('should return 9 arrays as rows', () => {
		expect(cells).toHaveLength(9)
	})
	it('each array should have 9 objects/cells each',() => {
		cells.map(array => {
			expect(array).toHaveLength(9)
		})
	})
	it('all cells should have desired properties',() => {
		cells.map(a => a.map(cell => {
			expect(cell).toHaveProperty("key")
			expect(cell).toHaveProperty("x")
			expect(cell).toHaveProperty("y")
			expect(cell).toHaveProperty("nearby")
			expect(cell).toHaveProperty("isMine")
			expect(cell).toHaveProperty("status",'close')
		}))
	})
	it('all cell properties should have correct values and types',() => {
		cells.map(a => a.map(cell => {
			expect(cell.key).toMatch(/^\d,\d/)
			expect((cell.x)).toBeLessThanOrEqual(8)
			expect((cell.x)).toBeGreaterThanOrEqual(0)
			expect(typeof(cell.x)).toBe("number")
			expect((cell.y)).toBeLessThanOrEqual(8)
			expect((cell.y)).toBeGreaterThanOrEqual(0)
			expect(typeof(cell.y)).toBe("number")
			expect(typeof(cell.nearby)).toBe("number")
			expect(toString(cell.isMine)).toMatch(/true || false/)
		}))
	})
})

describe('getNearbies',() => {
		const mines = generateMines(9,9,10)
		const cells = generateCells(9,9,mines)
		const coords = getNearbies(4,4)

	it('should return 8 coordinates if curried param is undefined',()=>{
		expect(coords(undefined)).toHaveLength(8)
	})
	it('each coord should have correct format',() => {
		coords().map(c => {
			expect(c).toMatch(/^\d,\d$/)
		})
	})
	it('should return 8 objects if curried param is defined', ()=>{
		const withCells = getNearbies(4,4)(cells)
		expect(withCells).toHaveLength(8)
		withCells.map( c => {
			expect(typeof(c)).toBe('object')
		})
	})
})

/*describe('App (snapshot)', () => {
	it('renders App component',()=> {
		const component = renderer.create(<App />);
		const json = component.toJSON();
		expect(json).toMatchSnapshot();
	})
})*/

describe('App',() =>{
		const app = shallow(<App />)
	it('renders App component',() =>{
		shallow(<App />);
	})
	it('renders 1 App component',() =>{
		expect(app).toHaveLength(1)
	})
	it('renders "Minesweeper"',() => {
		expect(app.find('h1').text()).toEqual('Minesweeper')
	})
	it('renders 1 Grid component inside',() =>{
		expect(app.find(Grid)).toHaveLength(1)
	})
})



/*describe('utils', function(){
	it('generateMines should return an array',function(){
		let result = generateMines(9,9,10);
		assert.typeOf(result, 'array');
	});
	it('generateMines should return an array of 10 coordinates',function(){
		let result = generateMines(9,9,10);
		assert.lengthOf(result,10);
	});
});*/