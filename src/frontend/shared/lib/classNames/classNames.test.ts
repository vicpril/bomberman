import { classNames } from './classNames'

describe('className', () => {
  test('only base Class', () => {
    expect(classNames('baseClass')).toBe('baseClass')
  })
  test('with additional classes', () => {
    const expectedValue = 'baseClass class1 class2'
    expect(classNames('baseClass', {}, ['class1', 'class2'])).toBe(expectedValue)
  })
  test('with conditional classes', () => {
    const expectedValue = 'baseClass class1 class2 hovered'
    expect(classNames(
      'baseClass',
      { hovered: true, active: false },
      ['class1', 'class2'],
    )).toBe(expectedValue)
  })
})
