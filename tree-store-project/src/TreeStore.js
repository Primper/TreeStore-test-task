"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.items = new Map();
        this.childrenMap = new Map();
        this.initialize(items); // Инициализация данных
    }
    // Инициализирует внутренние структуры данных на основе входного массива элементов
    TreeStore.prototype.initialize = function (items) {
        var _this = this;
        items.forEach(function (item) {
            var _a;
            _this.items.set(item.id, item); // Добавление элемента в Map с использованием его id
            if (!_this.childrenMap.has(item.parent)) {
                _this.childrenMap.set(item.parent, []); // Если у родителя еще нет потомков, создаем для него массив
            }
            (_a = _this.childrenMap.get(item.parent)) === null || _a === void 0 ? void 0 : _a.push(item); // Добавляем элемент в массив потомков его родителя
        });
    };
    // Возвращает все элементы в виде массива
    TreeStore.prototype.getAll = function () {
        return Array.from(this.items.values());
    };
    // Возвращает элемент по его id, или undefined, если элемент не найден
    TreeStore.prototype.getItem = function (id) {
        return this.items.get(id);
    };
    // Возвращает массив дочерних элементов для заданного id родителя
    TreeStore.prototype.getChildren = function (id) {
        return this.childrenMap.get(id) || []; // Возвращаем пустой массив, если нет потомков
    };
    // Возвращает массив всех потомков для заданного id
    TreeStore.prototype.getAllChildren = function (id) {
        var result = []; // Результирующий массив всех потомков
        var queue = this.getChildren(id); // Инициализируем очередь с прямыми потомками
        while (queue.length > 0) {
            var current = queue.shift(); // Извлекаем первый элемент из очереди
            result.push(current); // Добавляем его в результат
            queue.push.apply(// Добавляем его в результат
            queue, this.getChildren(current.id)); // Добавляем в очередь всех его потомков
        }
        return result;
    };
    // Возвращает массив всех родителей для заданного id
    TreeStore.prototype.getAllParents = function (id) {
        var result = []; // Результирующий массив родителей
        var currentItem = this.getItem(id); // Начинаем с текущего элемента
        while (currentItem && currentItem.parent !== 'root') {
            currentItem = this.getItem(currentItem.parent); // Переходим к родителю текущего элемента
            if (currentItem) {
                result.push(currentItem); // Добавляем родителя в результат
            }
        }
        return result;
    };
    return TreeStore;
}());
exports.default = TreeStore;
