(function() {
    'use strict';

    var vm = new Vue({
        el: '#app',
        data: {
            newItem: '',
            todos: []
        },
        watch: {
            // 配列の中身までは監視しないので
            // todos: function() {
            //     localStorage.setItem('todos', JSON.stringify(this.todos));
            //     alert('Data saved!');
            // }
            todos: {
                handler: function() {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                    //alert('Data saved!');
                },
                deep: true
            }
        },
        methods: {
            addItem: function() {
                var item = {
                    title: this.newItem,
                    isDone: false
                };
                this.todos.push(item);
                this.newItem = '';
            },
            deleteItem: function(index) {
                if (confirm('are you sure?')) {
                    this.todos.splice(index, 1);
                }
            },
            purge: function(index) {
                if (!confirm('delete finished?')) {
                    return;
                }
                // 終わっていないタスクのみに絞る
                this.todos = this.remaining;
            }
        },
        computed: {
            remaining: function() {
                return this.todos.filter(function(todo) {
                    return !todo.isDone;
                });
            }
        }
    });
})();