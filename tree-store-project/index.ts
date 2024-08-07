import TreeStore from './src/TreeStore'; // Убедитесь, что путь к вашему классу TreeStore верен

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

const store = new TreeStore(items);

console.log('Все элементы:', store.getAll()); // Получить все элементы
console.log('Элемент с id = 7:', store.getItem(7)); // Получить элемент с id = 7
console.log('Дети элемента с id = 4:', store.getChildren(4)); // Получить детей элемента с id = 4
console.log('Все потомки элемента с id = 2:', store.getAllChildren(2)); // Получить всех потомков элемента с id = 2
console.log('Все предки элемента с id = 7:', store.getAllParents(7)); // Получить всех предков элемента с id = 7
