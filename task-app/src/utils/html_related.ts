export const idAttr = {
  tasks: document.getElementById('tasks')!,
  taskCount: document.getElementById('task-count')!,
};

export const messages = {
  noTask: '<div class="alert alert-info">現在タスクはありません</div>',
  priority: {
    low: '<span>優先度: 低</span>',
    medium: '<span>優先度: 中</span>',
    high: '<span>優先度: 高</span>',
  }
}