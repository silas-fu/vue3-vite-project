<template>
  <div class="todo-container">
    <h1>待辦清單</h1>
    
    <div class="input-section">
      <input 
        type="text" 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="輸入新任務..."
      >
      <button class="btn btn-add" @click="addTodo">新增</button>
    </div>

    <div class="filters">
      <button 
        class="btn filter-btn" 
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        全部
      </button>
      <button 
        class="btn filter-btn" 
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        進行中
      </button>
      <button 
        class="btn filter-btn" 
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        已完成
      </button>
    </div>

    <ul class="todo-list" v-if="filteredTodos.length > 0">
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
        >
        <span class="todo-text">{{ todo.text }}</span>
        <button class="btn btn-delete" @click="deleteTodo(todo.id)">刪除</button>
      </li>
    </ul>

    <div v-else class="empty-state">
      {{ emptyMessage }}
    </div>

    <div class="stats">
      <p>總共 {{ todos.length }} 個任務 | 已完成 {{ completedCount }} 個 | 剩餘 {{ activeCount }} 個</p>
    </div>
  </div>
</template>

<script setup>
// 從 Vue 引入需要的函數
import { ref, computed } from 'vue'

const newTodo = ref('')  // 新任務的輸入內容
const todos = ref([])    // 所有任務的陣列
const filter = ref('all') // 當前的篩選狀態: 'all' | 'active' | 'completed'

// 根據篩選條件過濾任務
const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(todo => !todo.completed)  // 只顯示未完成
  } else if (filter.value === 'completed') {
    return todos.value.filter(todo => todo.completed)   // 只顯示已完成
  }
  return todos.value  // 顯示全部
})

// 計算已完成的任務數量
const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})

// 計算未完成的任務數量
const activeCount = computed(() => {
  return todos.value.filter(todo => !todo.completed).length
})

// 根據篩選狀態顯示不同的空狀態訊息
const emptyMessage = computed(() => {
  if (filter.value === 'completed') return '還沒有已完成的任務'
  if (filter.value === 'active') return '沒有進行中的任務'
  return '還沒有任務,開始新增吧!'
})

// 新增任務
const addTodo = () => {
  // 檢查輸入是否為空（trim 會移除前後空白）
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),                // 使用時間戳作為唯一 ID
      text: newTodo.value.trim(),    // 任務內容
      completed: false               // 預設為未完成
    })
    newTodo.value = ''  // 清空輸入框
  }
}

// 刪除任務
const deleteTodo = (id) => {
  // 過濾掉指定 ID 的任務
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>