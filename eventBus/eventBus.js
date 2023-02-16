
class StarEventBus {
    constructor() {
        // 事件名称 和 方法的映射关系
        this.eventMap = {};
    }
    /**
     *  监听
     *  因为可能有相同的名字监听，但是回调函数不一样
     *  所以使用数组存储
     */
    on(eventName, fn) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(fn);
    }
    /**
     * 发射事件
     * 一发射就自动调用方法
     */
    emit(eventName, ...args) {
        if (!this.eventMap[eventName]) return;
        this.eventMap[eventName].forEach((fn) => {
            fn(...args);
        });
    }
    /**
     * 删除事件
     * 删除事件名和其对应的函数
     */
    off(eventName, fn) {
        if (!this.eventMap[eventName]) return;

        // 可能拥有相同的事件名和相同的函数，所以循环删除
        this.eventMap[eventName].forEach((itemFn, index) => {
            if (itemFn === fn) {
                // 使其位置还在，不过是为空
                delete this.eventMap[eventName][index];
            }
        });
        // 过滤空的值
        this.eventMap[eventName] = this.eventMap[eventName].filter((item) => item);

        // 如果eventFns已经清空了
        if (this.eventMap[eventName].length === 0) {
            delete this.eventMap[eventName];
        }
    }
    /**
     * 清空事件名对应的事件函数数组
     */
    clear(eventName) {
        if (!this.eventMap[eventName]) return;
        delete this.eventMap[eventName];
    }
    /**
     * 清空所有事件
     */
    clearAll() {
        this.eventMap = {};
    }
}

Page({

    data: {
        eventBus: {},
    },

    onLoad(options) {
        // 1. 创建对象
        const eventBus = new StarEventBus();

        // 2. 监听方法
        eventBus.on('btnClick', () => {
            console.log('俺被惦记了');
        });

        const btnClick = () => {
            console.log('俺也被惦记了');
        };
        eventBus.on('btnClick', btnClick);

        setTimeout(() => {
            // 4. 删除方法
            eventBus.off('btnClick', btnClick);
        }, 3000);

        this.setData({
            eventBus: eventBus
        })
    },
    tapBtn() {
        const eventBus = this.data.eventBus;
        console.log('btn 点击');
        // 3. 发射方法
        eventBus.emit('btnClick');
    },
    onShow() {

    },
})