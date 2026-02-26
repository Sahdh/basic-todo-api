const API_URL = "http://localhost:8000";

export interface Category {
    id: number;
    name: string;
}

export interface Todo {
    id: number;
    title: string;
    is_completed: boolean;
    category_id?: number | null;
    category?: Category;
}

export const api = {
    getTodos: async (): Promise<Todo[]> => {
        const res = await fetch(`${API_URL}/todos/`);
        if (!res.ok) throw new Error("Failed to fetch todos");
        return res.json();
    },
    createTodo: async (title: string, category_id?: number | null): Promise<Todo> => {
        const res = await fetch(`${API_URL}/todos/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, category_id }),
        });
        if (!res.ok) throw new Error("Failed to create todo");
        return res.json();
    },
    updateTodo: async (id: number, is_completed: boolean, title?: string, category_id?: number | null): Promise<Todo> => {
        // Send only necessary fields
        const payload: any = { is_completed };
        if (title) payload.title = title;
        if (category_id) payload.category_id = category_id;

        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update todo");
        return res.json();
    },
    deleteTodo: async (id: number): Promise<void> => {
        const res = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete todo");
    },

    getCategories: async (): Promise<Category[]> => {
        const res = await fetch(`${API_URL}/categories/`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
    },
    createCategory: async (name: string): Promise<Category> => {
        const res = await fetch(`${API_URL}/categories/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        if (!res.ok) throw new Error("Failed to create category");
        return res.json();
    },
};
