import TreeStore from './TreeStore';

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

describe('TreeStore', () => {
  let store: TreeStore;

  beforeEach(() => {
    store = new TreeStore(items);
  });

  test('getAll() returns all items', () => {
    expect(store.getAll()).toEqual(items);
  });

  test('getItem(id) returns correct item', () => {
    expect(store.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
  });

  test('getChildren(id) returns correct children', () => {
    expect(store.getChildren(2)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
    ]);
  });

  test('getAllChildren(id) returns all descendants', () => {
    expect(store.getAllChildren(2)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ]);
  });

  test('getAllParents(id) returns correct path to root', () => {
    expect(store.getAllParents(7)).toEqual([
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' },
    ]);
  });
});
