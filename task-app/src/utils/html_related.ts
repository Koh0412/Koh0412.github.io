export const idAttr = {
  tasks: document.getElementById('tasks')!,
  setting: document.getElementById('setting')!,
  taskAdd: document.getElementById('task-add')!,
  form: document.getElementById('form')!,
  taskCount: document.getElementById('task-count')!,
  searchForm: document.getElementById('search-form')!,
  search: document.getElementById('search')!,
};

export const messages = {
  noTask: '<div class="alert alert-info">現在タスクはありません</div>',
  priority: {
    low: '<span>優先度: 低</span>',
    medium: '<span>優先度: 中</span>',
    high: '<span>優先度: 高</span>',
  }
}