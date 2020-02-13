import { useClassName } from './'
import { renderHook } from "@testing-library/react-hooks";

describe('useClassName', () => {
  it('keeps object keys with truthy values', () => {
    const { result } = renderHook(() => useClassName({
      a: true,
      b: false,
      c: 0,
      d: null,
      e: undefined,
      f: 1
    }));

    expect(result.current).toBe('a f');
  })

  it('joins arrays of class names and ignore falsy values', () => {
    const { result } = renderHook(() => useClassName('a', 0, null, undefined, true, 1, 'b'));

    expect(result.current).toBe('a 1 b');
  });
  
  it('supports heterogenous arguments', () => {
    const { result } = renderHook(() => useClassName(
      { a: true }, 'b', 0
    ));

    expect(result.current).toBe('a b');
  });

  it('should be trimmed', function () {
    const { result } = renderHook(() => useClassName([
      '', 'b', {}, ''
    ]));

    expect(result.current).toBe('b');
  });

  it('returns an empty string for an empty configuration', function () {
    const { result } = renderHook(() => useClassName({}));
    expect(result.current).toBe('');
  });

  it('supports an array of class names', function () {
    const { result } = renderHook(() => useClassName(['a', 'b']));
    expect(result.current).toBe('a b');
  });
  
  it('joins array arguments with string arguments', function () {
    const { result } = renderHook(() => useClassName(['a', 'b'], 'c'));
    expect(result.current).toBe('a b c');
    
    const { result: result2 } = renderHook(() => useClassName('c', ['a', 'b']));
    expect(result2.current).toBe('c a b');
  });
    
  it('handles arrays that include falsy and true values', function () {
    const { result } = renderHook(() => useClassName(['a', 0, null, undefined, false, true, 'b']));
    expect(result.current).toBe('a b');
  });
  
  it('handles arrays that include arrays', function () {
    const { result } = renderHook(() => useClassName(['a', ['b', 'c']]));
    expect(result.current).toBe('a b c');
  });
  
  it('handles arrays that include objects', function () {
    const { result } = renderHook(() => useClassName(['a', {b: true, c: false}]));
    expect(result.current).toBe('a b');
  });

  it('handles deep array recursion', function () {
    const { result } = renderHook(() => useClassName(['a', ['b', ['c', {d: true}]]]));
    expect(result.current).toBe('a b c d');
  });

  it('handles arrays that are empty', function () {
    const { result } = renderHook(() => useClassName('a', []));
    expect(result.current).toBe('a');
  });

  it('handles nested arrays that have empty nested arrays', function () {
    const { result } = renderHook(() => useClassName('a', [[]]));
    expect(result.current).toBe('a');
  });

  it('handles all types of truthy and falsy property values as expected', function () {
    const { result } = renderHook(() => useClassName({
      // falsy:
      null: null,
      emptyString: "",
      noNumber: NaN,
      zero: 0,
      negativeZero: -0,
      false: false,
      undefined: undefined,

      // truthy (literally anything else):
      nonEmptyString: "foobar",
      whitespace: ' ',
      function: Object.prototype.toString,
      emptyObject: {},
      nonEmptyObject: {a: 1, b: 2},
      emptyList: [],
      nonEmptyList: [1, 2, 3],
      greaterZero: 1
    }));

    expect(result.current).toBe('nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero');
  });
})
