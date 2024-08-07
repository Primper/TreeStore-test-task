interface Item {
    id: string | number; // Уникальный идентификатор элемента
    parent: string | number; // Идентификатор родительского элемента
    type?: string | null; // Произвольное поле, которое может содержать тип элемента
  }
  
  class TreeStore {
    private items: Map<string | number, Item>; // Хранилище элементов, доступных по их id
    private childrenMap: Map<string | number, Item[]>; // Хранилище дочерних элементов, сгруппированных по parent id
  
    constructor(items: Item[]) {
      this.items = new Map();
      this.childrenMap = new Map();
      this.initialize(items); // Инициализация данных
    }
  
    // Инициализирует внутренние структуры данных на основе входного массива элементов
    private initialize(items: Item[]) {
      items.forEach(item => {
        this.items.set(item.id, item); // Добавление элемента в Map с использованием его id
        if (!this.childrenMap.has(item.parent)) {
          this.childrenMap.set(item.parent, []); // Если у родителя еще нет потомков, создаем для него массив
        }
        this.childrenMap.get(item.parent)?.push(item); // Добавляем элемент в массив потомков его родителя
      });
    }
  
    // Возвращает все элементы в виде массива
    getAll(): Item[] {
      return Array.from(this.items.values());
    }
  
    // Возвращает элемент по его id, или undefined, если элемент не найден
    getItem(id: string | number): Item | undefined {
      return this.items.get(id);
    }
  
    // Возвращает массив дочерних элементов для заданного id родителя
    getChildren(id: string | number): Item[] {
      return this.childrenMap.get(id) || []; // Возвращаем пустой массив, если нет потомков
    }
  
    // Возвращает массив всех потомков для заданного id
    getAllChildren(id: string | number): Item[] {
      const result: Item[] = []; // Результирующий массив всех потомков
      const queue: Item[] = this.getChildren(id); // Инициализируем очередь с прямыми потомками
  
      while (queue.length > 0) {
        const current = queue.shift()!; // Извлекаем первый элемент из очереди
        result.push(current); // Добавляем его в результат
        queue.push(...this.getChildren(current.id)); // Добавляем в очередь всех его потомков
      }
      return result;
    }
  
    // Возвращает массив всех родителей для заданного id
    getAllParents(id: string | number): Item[] {
      const result: Item[] = []; // Результирующий массив родителей
      let currentItem = this.getItem(id); // Начинаем с текущего элемента
  
      while (currentItem && currentItem.parent !== 'root') {
        currentItem = this.getItem(currentItem.parent); // Переходим к родителю текущего элемента
        if (currentItem) {
          result.push(currentItem); // Добавляем родителя в результат
        }
      }
      return result;
    }
  }
  
  export default TreeStore;
  