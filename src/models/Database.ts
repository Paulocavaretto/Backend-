interface Task {
    id: number;
    title: string;
    description: string;
  }
  
  export class FakeDatabase {
    private tasks: Task[] = [];
    private lastTaskId: number = 0;
  
    createTask(title: string, description: string): Task {
      const newTask: Task = {
        id: ++this.lastTaskId,
        title,
        description
      };
      this.tasks.push(newTask);
      return newTask;
    }
  
    getAllTasks(): Task[] {
      return this.tasks;
    }
  
    getTaskById(id: number): Task | undefined {
      return this.tasks.find(task => task.id === id);
    }
  
    updateTask(id: number, title: string, description: string): Task | undefined {
      const taskIndex = this.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].title = title;
        this.tasks[taskIndex].description = description;
        return this.tasks[taskIndex];
      }
      return undefined;
    }
  
    deleteTask(id: number): boolean {
      const initialLength = this.tasks.length;
      this.tasks = this.tasks.filter(task => task.id !== id);
      return this.tasks.length !== initialLength;
    }
  }
  